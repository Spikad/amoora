const fs = require('fs');
const vm = require('vm');
const path = require('path');

// --- Load I18N from main.js in a stubbed sandbox ---
const code = fs.readFileSync('js/main.js', 'utf8');
const sandbox = {
  document: { addEventListener(){}, documentElement:{setAttribute(){}},
    querySelectorAll(){return [];}, getElementById(){return null;}, querySelector(){return null;} },
  window: { matchMedia(){return {matches:false};}, addEventListener(){}, location:{href:''} },
  performance: { now: () => 0 },
  navigator: {},
  setInterval(){}, requestAnimationFrame(){}, Intl, console,
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(code + '\nglobalThis.__SV = Object.keys(I18N.sv); globalThis.__EN = Object.keys(I18N.en);', sandbox);
const sv = new Set(sandbox.__SV);
const en = new Set(sandbox.__EN);

console.log(`SV keys: ${sv.size}, EN keys: ${en.size}`);

// --- SV keys missing from EN ---
const svNotEn = [...sv].filter(k => !en.has(k));
console.log(`\n=== SV keys MISSING from EN (${svNotEn.length}) ===`);
console.log(svNotEn.join('\n'));

// --- Scan HTML files for data-i18n* keys ---
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const attrRe = /data-i18n(?:-html|-placeholder|-aria)?="([^"]+)"/g;
console.log(`\n=== Per-page keys used in HTML but MISSING from EN ===`);
for (const f of htmlFiles.sort()) {
  const html = fs.readFileSync(f, 'utf8');
  const used = new Set();
  let m;
  while ((m = attrRe.exec(html)) !== null) used.add(m[1]);
  const missEn = [...used].filter(k => !en.has(k));
  const missSv = [...used].filter(k => !sv.has(k));
  if (missEn.length || missSv.length) {
    console.log(`\n-- ${f} --`);
    if (missEn.length) console.log(`  missing EN: ${missEn.join(', ')}`);
    if (missSv.length) console.log(`  missing SV (!): ${missSv.join(', ')}`);
  }
}
console.log('\nDONE');
