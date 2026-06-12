// Branded contract PDF generator — consumes the SAME buildSections() output as
// the signing page, so the executed PDF and the on-screen contract are identical.
import { PDFDocument, rgb, StandardFonts } from "https://esm.sh/pdf-lib@1.17.1";
import fontkit from "https://esm.sh/@pdf-lib/fontkit@1.1.1";
import { buildSections, contractSender, type ContractInput, SELLER } from "./contract.ts";

const CORAL = rgb(0.918, 0.439, 0.337); // #EA7056
const INK = rgb(0.110, 0.106, 0.102); // #1C1B1A
const GRAY = rgb(0.42, 0.404, 0.392); // #6B6764
const LINE = rgb(0.937, 0.914, 0.898); // #EFE9E5

// Decode the small amount of trusted HTML used in section text → plain text.
function plain(s: string): string {
  return String(s)
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ").trim();
}

export interface SignData {
  signerName: string;
  signerPersonnummer: string;
  signedAt: string; // ISO
}

export async function generateContractPdf(c: ContractInput, sign: SignData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // Script font for signatures — fetch a static TTF; fall back to oblique.
  let script = await pdf.embedFont(StandardFonts.HelveticaOblique);
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/google/fonts/main/ofl/dancingscript/static/DancingScript-Regular.ttf",
    );
    if (res.ok) script = await pdf.embedFont(await res.arrayBuffer());
  } catch (_) { /* keep oblique fallback */ }

  const A4 = { w: 595.28, h: 841.89 };
  const M = 52; // margin
  const maxW = A4.w - M * 2;
  let page = pdf.addPage([A4.w, A4.h]);
  let y = A4.h - M;

  const newPage = () => { page = pdf.addPage([A4.w, A4.h]); y = A4.h - M; };
  const need = (h: number) => { if (y - h < M + 30) newPage(); };

  const wrap = (text: string, f: typeof font, size: number, width = maxW): string[] => {
    const out: string[] = [];
    for (const para of text.split("\n")) {
      const words = para.split(/\s+/).filter(Boolean);
      let line = "";
      for (const w of words) {
        const test = line ? line + " " + w : w;
        if (f.widthOfTextAtSize(test, size) > width && line) { out.push(line); line = w; }
        else line = test;
      }
      out.push(line);
    }
    return out;
  };
  const draw = (text: string, x: number, size: number, f: typeof font, color = INK) => {
    page.drawText(text, { x, y, size, font: f, color });
  };
  const para = (text: string, opts: { size?: number; f?: typeof font; color?: typeof INK; gap?: number; indent?: number } = {}) => {
    const size = opts.size ?? 10.5, f = opts.f ?? font, color = opts.color ?? GRAY, indent = opts.indent ?? 0;
    for (const line of wrap(text, f, size, maxW - indent)) {
      need(size + 4);
      draw(line, M + indent, size, f, color);
      y -= size + 4;
    }
    y -= opts.gap ?? 5;
  };

  // ── Header ────────────────────────────────────────────────────────────────
  draw("amoora", M, 26, bold, CORAL); y -= 30;
  draw("Tjänsteavtal", M, 15, bold, INK); y -= 20;
  page.drawLine({ start: { x: M, y }, end: { x: A4.w - M, y }, thickness: 2, color: CORAL });
  y -= 22;

  // ── Sections ────────────────────────────────────────────────────────────────
  const sections = buildSections(c);
  const sender = contractSender(c);
  for (const s of sections) {
    need(40);
    draw(s.title, M, 12.5, bold, INK); y -= 18;
    for (const b of s.blocks) {
      if (b.type === "p") {
        para(plain(b.text));
      } else if (b.type === "list") {
        for (const item of b.items) {
          const lines = wrap(plain(item), font, 10.5, maxW - 16);
          need(lines.length * 14.5);
          draw("•", M + 4, 10.5, font, CORAL);
          lines.forEach((ln, i) => { draw(ln, M + 16, 10.5, font, GRAY); if (i < lines.length - 1) y -= 14.5; });
          y -= 14.5;
        }
        y -= 5;
      } else { // kv — two-column table; BOTH columns wrap within their own
        // width so label and value can never overlap. Hairline row separators.
        const colGap = 18;
        const keyW = maxW * 0.46;
        const valX = M + keyW + colGap;
        const valW = maxW - keyW - colGap;
        const lh = 13.5, padV = 5;
        for (const [k, v] of b.rows) {
          const kLines = wrap(plain(k), font, 9.5, keyW);
          const vLines = wrap(plain(v), font, 10.5, valW);
          const rowLines = Math.max(kLines.length, vLines.length);
          const rowH = rowLines * lh + padV * 2;
          need(rowH);
          const base = y - padV - 9;
          kLines.forEach((ln, i) => page.drawText(ln, { x: M, y: base - i * lh, size: 9.5, font, color: GRAY }));
          vLines.forEach((ln, i) => page.drawText(ln, { x: valX, y: base - i * lh, size: 10.5, font, color: INK }));
          y -= rowH;
          page.drawLine({ start: { x: M, y: y + 3 }, end: { x: M + maxW, y: y + 3 }, thickness: 0.5, color: LINE });
        }
        y -= 10;
      }
    }
    y -= 6;
  }

  // ── Signatures ──────────────────────────────────────────────────────────────
  need(140);
  y -= 8;
  page.drawLine({ start: { x: M, y }, end: { x: A4.w - M, y }, thickness: 1, color: LINE });
  y -= 22;
  draw(`${sections.length + 1}. Underskrifter`, M, 12.5, bold, INK); y -= 30;

  const colW = (maxW - 24) / 2;
  const leftX = M, rightX = M + colW + 24;
  const sigY = y;
  // Lynkrr (signed by the sender)
  page.drawText(sender.name, { x: leftX, y: sigY, size: 22, font: script, color: INK });
  // Client (executed signature)
  page.drawText(sign.signerName, { x: rightX, y: sigY, size: 22, font: script, color: INK });
  y = sigY - 8;
  page.drawLine({ start: { x: leftX, y }, end: { x: leftX + colW, y }, thickness: 1, color: INK });
  page.drawLine({ start: { x: rightX, y }, end: { x: rightX + colW, y }, thickness: 1, color: INK });
  y -= 14;
  page.drawText(`${SELLER.name}`, { x: leftX, y, size: 9.5, font: bold, color: INK });
  page.drawText(`Kund`, { x: rightX, y, size: 9.5, font: bold, color: INK });
  y -= 13;
  page.drawText(`${sender.name}, ${sender.title}`, { x: leftX, y, size: 9, font, color: GRAY });
  page.drawText(plain(sign.signerName), { x: rightX, y, size: 9, font, color: GRAY });
  y -= 12;
  page.drawText(`Org.nr ${SELLER.orgNr}`, { x: leftX, y, size: 9, font, color: GRAY });
  page.drawText(`Pers.nr ${plain(sign.signerPersonnummer)}`, { x: rightX, y, size: 9, font, color: GRAY });
  y -= 12;
  page.drawText(`Signerat elektroniskt ${sign.signedAt.slice(0, 16).replace("T", " ")}`, { x: rightX, y, size: 9, font, color: GRAY });

  // ── Verification footer on every page ───────────────────────────────────────
  const pages = pdf.getPages();
  const verify = `Avtals-ID: ${c.id ?? "—"}  ·  Elektroniskt signerat via amoora.se  ·  ${SELLER.name} org.nr ${SELLER.orgNr}`;
  pages.forEach((p, i) => {
    p.drawText(verify, { x: M, y: 26, size: 7.5, font, color: GRAY });
    p.drawText(`${i + 1} / ${pages.length}`, { x: A4.w - M - 26, y: 26, size: 7.5, font, color: GRAY });
  });

  return await pdf.save();
}
