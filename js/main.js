/* ==========================================================================
   AMOORA — main.js
   Language system (sv/en), navigation, animations, counters, header effects
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. TRANSLATIONS  (sv = default, en = optional)
   -------------------------------------------------------------------------- */
const I18N = {
  sv: {
    /* Header / nav */
    "nav.home": "Hem",
    "nav.how": "Så fungerar det",
    "nav.raknare": "Räknare",
    "nav.pricing": "Priser",
    "nav.blog": "Blogg",
    "nav.contact": "Kontakt",
    "cta.bookDemo": "Boka demo",
    "nav.menuLabel": "Meny",

    /* Hero */
    "hero.eyebrow": "Beställningssystem för restauranger",
    "hero.h1": "Noll provision.<br><span class=\"hl\">Äg ditt eget</span> system.",
    "hero.sub": "En pizzeria som säljer för 100 000 kr/mån via Foodora betalar 360 000 kr om året i provision. Med Amoora äger du systemet och behåller varje krona på dina direktbeställningar.",
    "hero.ctaPrimary": "Boka gratis demo",
    "hero.ctaSecondary": "Se Capri Blue live",
    "hero.trust1": "Engångskostnad",
    "hero.trust2": "Noll provision",
    "hero.trust3": "Klart på 7 dagar",
    "hero.mockTitle": "Beställningar idag",
    "hero.mockOrder": "Ny order",
    "hero.mockItem": "Pizza Margherita",

    /* Problem / Solution */
    "ps.eyebrow": "Jämförelse",
    "ps.h2": "Foodora tar 30%. Amoora tar 0%.",
    "ps.sub": "Se skillnaden mellan att hyra en plattform och att äga ditt eget system.",
    "ps.foodoraTitle": "Med Foodora",
    "ps.amooraTitle": "Med Amoora",
    "ps.f1": "30% provision på varje order",
    "ps.f2": "Beroende av plattformen",
    "ps.f3": "Ingen tillgång till kunddata",
    "ps.f4": "Löpande månadskostnader",
    "ps.a1": "0% provision — för alltid",
    "ps.a2": "Ditt eget system",
    "ps.a3": "Äg all din kunddata",
    "ps.a4": "En engångskostnad",
    "ps.stat": "Spara upp till 30% på varje order",

    /* Calculator */
    "calculator.label": "LIVE-RÄKNARE",
    "calculator.title": "Räkna live på 30 sekunder.",
    "calculator.sub": "Två frågor. Sju svar. Se exakt hur mycket din restaurang förlorar varje månad — och när du blir fri.",
    "calculator.scenario.small": "Liten pizzeria",
    "calculator.scenario.smallMeta": "50 ordrar/v · 130 kr",
    "calculator.scenario.medium": "Medel pizzeria",
    "calculator.scenario.mediumMeta": "150 ordrar/v · 150 kr",
    "calculator.scenario.large": "Stor pizzeria",
    "calculator.scenario.largeMeta": "350 ordrar/v · 170 kr",
    "calculator.input.orders.title": "Beställningar per vecka via plattformar",
    "calculator.input.orders.note": "Foodora, Wolt, eller liknande",
    "calculator.input.avg.title": "Snittordervärde (kr)",
    "calculator.input.avg.note": "Typiskt 130-170 kr för pizza i Sverige",
    "calculator.advanced.toggle": "Avancerat: justera provision %",
    "calculator.advanced.title": "Plattformens provision %",
    "calculator.results.lostLabel": "DU FÖRLORAR JUST NU",
    "calculator.results.lostSub": "kronor per år till Foodora",
    "calculator.tickerText": "Sedan du öppnade den här sidan har du förlorat {amount} kr till Foodora...",
    "calculator.breakpoint.label": "BRYTPUNKT",
    "calculator.breakpoint.note": "dagar tills Amoora betalat tillbaka sig",
    "calculator.freedom.label": "DITT FRIHETSDATUM",
    "calculator.freedom.note": "Från detta datum är du 100% provisionsfri",
    "calculator.equivalent.label": "DET ÄR LIKA MED",
    "calculator.equivalent.oven": "pizzaugnar",
    "calculator.equivalent.employee": "heltidsanställda",
    "calculator.equivalent.vacation": "familjesemestrar",
    "calculator.equivalent.note": "Allt detta — borta. Varje år. Till Foodora.",
    "calculator.chart.title": "Årlig kostnad: tre alternativ",
    "calculator.chart.foodora": "Foodora ({pct}% provision)",
    "calculator.chart.wolt": "Wolt ({pct}% provision)",
    "calculator.chart.amoora": "Amoora (engångskostnad)",
    "calculator.share.title": "Skicka resultatet till dig själv",
    "calculator.share.placeholder": "Din e-postadress",
    "calculator.share.button": "Skicka resultat",
    "calculator.share.ctaHeading": "Sluta blöda. Boka demo nu →",
    "calculator.share.success": "Vi skickar en sammanfattning till din e-post — snart är du redo att boka demo.",
    "calculator.share.error": "Ange en giltig e-postadress för att skicka resultatet.",
    "calculator.hero.eyebrow": "RÄKNARE",
    "calculator.hero.h1": "Hur mycket förlorar din restaurang just nu?",
    "calculator.hero.sub": "Två frågor. Sju svar. Räkna live på 30 sekunder och se exakt vad du betalar i provision — och när Amoora betalar tillbaka sig.",
    "calculator.commissions.title": "Justera provisioner",
    "calculator.inputs.foodora": "Foodora-provision %",
    "calculator.inputs.foodora.note": "Justera om du har förhandlat ett annat avtal",
    "calculator.inputs.wolt": "Wolt-provision %",
    "calculator.inputs.wolt.note": "Justera om du har förhandlat ett annat avtal",
    "calculator.trust.1": "Räknaren bygger på riktiga Foodora-siffror (25-35%)",
    "calculator.trust.2": "Resultaten är genomsnitt — din situation kan variera",
    "calculator.trust.3": "Boka en demo så gör vi en exakt beräkning för din restaurang",
    "calculator.cta.bottom.h2": "Övertygad? Nästa steg är 20 minuter.",
    "calculator.cta.bottom.p": "Boka demo så går vi igenom resultatet tillsammans och visar systemet live.",
    "calculator.cta.bottom.btn": "Boka demo →",
    "calculator.share.summary": "Provisioner: Foodora {foodora}% · Wolt {wolt}%",

    /* Features */
    "feat.eyebrow": "Funktioner",
    "feat.h2": "Allt din restaurang behöver",
    "feat.sub": "Ett komplett system byggt för restauranger och pizzerior — från beställning till leverans.",
    "feat.1.t": "Egen beställningssida",
    "feat.1.d": "Dina kunder beställer direkt från dig — utan mellanhänder och utan provision.",
    "feat.1.note": "Inkl. kökssystem med automatisk kvittoutskrift (Sunmi-terminal).",
    "feat.2.t": "QR-meny",
    "feat.2.d": "Skanna och beställ direkt vid bordet.",
    "feat.3.t": "Leveranshantering",
    "feat.3.d": "Hantera egna bud och leveranser i realtid.",
    "feat.4.t": "Betalningar",
    "feat.4.d": "Kort, Apple Pay och Google Pay via Stripe — pengarna går direkt till dig.",
    "feat.5.t": "Kundregister",
    "feat.5.d": "Äg din kunddata och bygg lojalitet över tid.",
    "feat.6.t": "Statistik & rapporter",
    "feat.6.d": "Full koll på försäljningen.",
    "feat.7.t": "Egen app",
    "feat.7.d": "Din restaurang i kundens ficka — alltid ett knapptryck bort.",

    /* How it works */
    "how.eyebrow": "Så fungerar det",
    "how.h2": "Igång på fyra steg",
    "how.sub": "Vi sköter allt det tekniska. Du fokuserar på maten.",
    "how.1.t": "Vi sätter upp ditt system",
    "how.1.d": "Vi installerar och konfigurerar hela systemet åt dig.",
    "how.2.t": "Vi designar din beställningssida",
    "how.2.d": "En snygg sida i din restaurangs profil.",
    "how.3.t": "Du börjar ta emot beställningar",
    "how.3.d": "Klart att användas på bara 7 dagar.",
    "how.4.t": "Du behåller 100% av intäkterna",
    "how.4.d": "Ingen provision. Inga månadsavgifter.",
    "how.cta": "Se hur det fungerar i detalj",

    /* Viral engine */
    "viral.eyebrow": "Tillväxtmotorn",
    "viral.h2": "Varje order är en säljare",
    "viral.body": "Varje orderbekräftelse och varje beställningssida bär texten ”Drivs av Amoora”. Restaurangägare beställer mat hela tiden — och varje gång de ser en proffsig Amoora-upplevelse tänker de: ”det där vill jag också ha.” Din kundanskaffning växer av sig själv, helt gratis.",
    "viral.p1": "”Drivs av Amoora” på varje kvitto",
    "viral.p2": "”Drivs av Amoora” i varje sidfot",
    "viral.p3": "Gratis spridning, restaurang till restaurang",
    "viral.receiptTitle": "Orderbekräftelse",
    "viral.receiptOrder": "Order #1042",
    "viral.receiptItem1": "2× Pizza Margherita",
    "viral.receiptItem2": "1× Vitlöksbröd",
    "viral.receiptTotal": "Totalt",
    "viral.poweredBy": "Drivs av Amoora",

    /* Urgency band */
    "urgency.label": "Tidsbegränsat läge",
    "urgency.text": "Matmomsen är sänkt till 6 % på avhämtning och leverans till och med 2027.",
    "urgency.sub": "Direktförsäljning är mer lönsam än någonsin. Ju tidigare du äger ditt system, desto mer tjänar du.",

    /* Pricing */
    "price.eyebrow": "Priser",
    "price.h2": "Välj din plan",
    "price.sub": "Engångskostnad för uppsättning + låg fast månadsavgift. Betala gärna via Klarna.",
    "price.monthly": "+ från 495 kr/mån",
    "price.vat": "+ moms",
    "price.popular": "Mest populär",
    "price.system.name": "Amoora System",
    "price.system.1": "Komplett beställningssystem",
    "price.system.2": "Egen beställningssida",
    "price.system.3": "Betalningsintegration",
    "price.system.4": "Support",
    "price.plus.name": "Amoora Plus",
    "price.plus.1": "Allt i System",
    "price.plus.2": "Allt marknadsföringsmaterial",
    "price.plus.3": "Grafisk profil",
    "price.plus.4": "Sociala medier-paket",
    "price.pro.name": "Amoora Pro",
    "price.pro.1": "Allt i Plus",
    "price.pro.2": "TikTok-videos",
    "price.pro.3": "Videomarknadsföring",
    "price.pro.4": "Premiumsupport",
    "price.choose": "Boka demo",
    "price.cta": "Se fullständiga priser",

    "blogg.hero.label": "BLOGG",
    "blogg.hero.h1": "Insikter för restauranger som vill äga sin tillväxt",
    "blogg.hero.sub": "Praktiska guider, ekonomiska analyser och verkliga case från svenska restauranger som tagit kontrollen tillbaka.",
    "blogg.filter.all": "Alla",
    "blogg.filter.awareness": "Awareness",
    "blogg.filter.compare": "Jämförelse",
    "blogg.filter.guide": "Guide",
    "blogg.filter.economy": "Ekonomi",
    "blogg.filter.case": "Case study",
    "blogg.newsletter.h2": "Få nya insikter i inkorgen",
    "blogg.newsletter.sub": "En artikel i månaden om hur svenska restauranger äger sin tillväxt. Inga säljmejl. Bara värde.",
    "blogg.newsletter.placeholder": "Din e-postadress",
    "blogg.newsletter.button": "Prenumerera",
    "blogg.newsletter.trust": "Inga skräppost. Avsluta när du vill.",
    "blogg.follow.label": "Följ Amoora:",
    "blogg.article.share": "Dela artikel",
    "blogg.article.copy": "Kopiera länk",
    "blogg.article.copied": "Länk kopierad!",
    "blogg.article.related": "Relaterade inlägg",
    "blogg.article.translationNote": "Visa engelskt innehåll när engelska är aktiverat.",

    /* Kontakt */
    "contact.hero.h1": "Boka en gratis demo.<br><span class=\"hl\">Se ditt eget system.</span>",
    "contact.hero.sub": "20 minuter. Ingen säljpitch. Vi visar hur Amoora skulle fungera för just din restaurang — och du frågar allt du undrar.",
    "contact.info.title": "Snabbkontakt",
    "contact.info.urgency": "Behöver du prata med oss idag? Ring oss direkt eller maila — vi hoppas höra av dig.",
    "contact.form.title": "Boka din demo",
    "contact.form.subtitle": "Fyll i formuläret så återkommer vi inom 24 timmar med tre föreslagna tider.",
    "contact.form.name": "Namn",
    "contact.form.namePlaceholder": "Ditt namn",
    "contact.form.restaurant": "Restaurangnamn",
    "contact.form.restaurantPlaceholder": "Din restaurang",
    "contact.form.email": "E-postadress",
    "contact.form.emailPlaceholder": "din@email.se",
    "contact.form.phone": "Telefon",
    "contact.form.phonePlaceholder": "+46 (0)8 000 00 00",
    "contact.form.city": "Stad",
    "contact.form.cityPlaceholder": "Stockholm",
    "contact.form.revenue": "Månadsomsättning via Foodora",
    "contact.form.revenuePlaceholder": "Välj intervall",
    "contact.form.revenue.help": "Hjälper oss förbereda en relevant ROI-beräkning till samtalet.",
    "contact.form.plan": "Vilken plan är du intresserad av?",
    "contact.form.plan.system": "Amoora System",
    "contact.form.plan.plus": "Amoora Plus (mest populär)",
    "contact.form.plan.pro": "Amoora Pro",
    "contact.form.plan.unsure": "Inte säker än",
    "contact.form.message": "Meddelande",
    "contact.form.messagePlaceholder": "Berätta gärna lite om din restaurang eller vad du är nyfiken på.",
    "contact.form.privacy": "Jag godkänner att Amoora kontaktar mig och behandlar mina uppgifter enligt integritetspolicyn.",
    "contact.form.submit": "Boka demo →",
    "contact.form.successTitle": "Tack! Vi hör av oss inom 24 timmar.",
    "contact.form.successBody": "Vi skickar tre föreslagna tider och en kort bekräftelse till den e-postadress du angav.",
    "contact.form.successButton": "Tillbaka till hem",
    "contact.faq.title": "VANLIGA FRÅGOR INFÖR DEMOT",
    "contact.faq.sub": "Vad vi ofta får höra",
    "contact.faq.q1": "Är demot verkligen gratis?",
    "contact.faq.a1": "Ja, helt gratis och utan förpliktelser. Vi tar 20 minuter av din tid och visar systemet — du bestämmer själv om det är intressant. Cirka 30% av de vi pratar med blir kunder; 70% säger nej och vi har inga hårda känslor.",
    "contact.faq.q2": "Måste jag förbereda något inför samtalet?",
    "contact.faq.a2": "Nej. Det enda som hjälper är att du har din nuvarande Foodora-omsättning grovt i huvudet — så att vi kan göra en exakt ROI-beräkning för just din restaurang. Det räcker att veta ungefär.",
    "contact.faq.q3": "Vad om jag inte är pizzeria?",
    "contact.faq.a3": "Vi har börjat med pizzerior men systemet fungerar för alla typer av restauranger — sushi, kebab, asiatiskt, fine dining. Boka demo så går vi igenom om Amoora passar dig.",
    "contact.faq.link": "Se alla vanliga frågor →",
    "contact.ready.title": "Eller ring oss direkt",
    "contact.ready.sub": "Om du föredrar ett spontant samtal — ring eller mejla, vi svarar i samma stund.",
    "contact.ready.call": "Ring +46 10 185 00 01",
    "contact.ready.email": "Mejla info@amoora.se",
    "contact.hero.label": "KONTAKT",
    "contact.hero.trust.1": "Inga förpliktelser",
    "contact.hero.trust.2": "Svar inom 24 timmar",
    "contact.hero.trust.3": "Inga säljkonsulter",
    "contact.info.label": "FÖREDRAR DU ATT RING ELLER MEJLA?",
    "contact.card.phone.title": "Telefon",
    "contact.card.phone.detail": "+46 10 185 00 01",
    "contact.card.phone.hours": "Mån–Fre 09–17",
    "contact.card.email.title": "E-post",
    "contact.card.email.detail": "info@amoora.se",
    "contact.card.email.response": "Svar inom 24 timmar",
    "contact.card.social.title": "Sociala medier",
    "contact.what.title": "Vad händer efter du bokat?",
    "contact.what.1": "Du får en bekräftelse via e-post med tre föreslagna tider.",
    "contact.what.2": "Vi har ett 20-minuters videosamtal — du visar din nuvarande situation.",
    "contact.what.3": "Vi visar Capri Blue live och hur ditt system skulle se ut.",
    "contact.what.4": "Du får en konkret offert och ROI-beräkning. Inga förpliktelser.",
    "contact.trust.title": "Du är i gott sällskap",
    "contact.trust.1.name": "Capri Blue",
    "contact.trust.1.detail": "Första kunden, live nu",
    "contact.trust.2.name": "Lynkrr AB",
    "contact.trust.2.detail": "Etablerat svenskt bolag",
    "contact.trust.3.name": "Klarna-fakturering",
    "contact.trust.3.detail": "Tillgängligt på alla planer",

    /* Så fungerar det */
    "sa_fungerar.hero.eyebrow": "SÅ FUNGERAR DET",
    "sa_fungerar.hero.h1": "Från Foodora-beroende<br><span class=\"hl\">till eget system</span> — på dagar.",
    "sa_fungerar.hero.sub": "Vi sköter all teknik. Du fokuserar på maten. Här är exakt hur vi tar din restaurang från första samtalet till live på nätet — utan att du behöver lyfta ett finger.",
    "sa_fungerar.hero.sub": "Vi sköter all teknik. Du fokuserar på maten. Här är exakt hur vi tar din restaurang från första samtalet till live på nätet — utan att du behöver lyfta ett finger.",
    "sa_fungerar.hero.ctaSecondary": "Se priser",

    "sa_fungerar.promise.1.value": "5",
    "sa_fungerar.promise.1.title": "Dagar",
    "sa_fungerar.promise.1.text": "till din restaurang är live",
    "sa_fungerar.promise.2.value": "0",
    "sa_fungerar.promise.2.title": "Mellanhänder",
    "sa_fungerar.promise.2.text": "mellan dig och kunden",
    "sa_fungerar.promise.3.value": "100%",
    "sa_fungerar.promise.3.title": "Av intäkterna",
    "sa_fungerar.promise.3.text": "är dina att behålla",

    "sa_fungerar.onboarding.eyebrow": "ONBOARDING",
    "sa_fungerar.onboarding.h2": "Från första samtal till live — i 5 steg",
    "sa_fungerar.onboarding.sub": "En genomgång av exakt vad som händer mellan att du skriver på och att din första order trillar in.",
    "sa_fungerar.onboarding.step1.badge": "Detta gör vi",
    "sa_fungerar.onboarding.step1.title": "Vi klonar din mall",
    "sa_fungerar.onboarding.step1.body": "Vi tar vår beprövade Amoora-mall och klonar den för din restaurang. Vi lägger in ditt namn, din adress, dina färger och din logotyp. En timme — och din unika instans existerar.",
    "sa_fungerar.onboarding.step2.badge": "Detta gör vi",
    "sa_fungerar.onboarding.step2.title": "Vi sätter upp din databas",
    "sa_fungerar.onboarding.step2.body": "Vi skapar ett dedikerat Supabase-projekt för just din restaurang. All din kunddata, dina menyer och dina ordrar bor i ett system du själv äger. Inga delade databaser. Inga mellanhänder.",
    "sa_fungerar.onboarding.step3.badge": "Detta gör vi",
    "sa_fungerar.onboarding.step3.title": "Vi designar din beställningssida",
    "sa_fungerar.onboarding.step3.body": "Vi laddar in hela din meny, kategoriserar rätterna, sätter priser, lägger in bilder och beskrivningar. Resultat: en proffsig beställningssida som speglar din restaurang — inte en generisk plattformsmall.",
    "sa_fungerar.onboarding.step4.badge": "Detta gör du",
    "sa_fungerar.onboarding.step4.title": "Du köper en Sunmi-terminal",
    "sa_fungerar.onboarding.step4.body": "Du köper en Sunmi-terminal (V2s eller V3H, cirka 3 200 kr) med inbyggd kvittoskrivare. Vi guidar dig genom uppsättningen på distans. När den är ansluten skrivs varje ny order ut automatiskt i ditt kök — precis som med Foodora.",
    "sa_fungerar.onboarding.step5.badge": "Tillsammans",
    "sa_fungerar.onboarding.step5.title": "Test, lansering och överlämning",
    "sa_fungerar.onboarding.step5.body": "Vi gör en testbeställning från start till kvittoutskrift tillsammans. När allt rullar smidigt — du är live. Vi finns kvar för support, men systemet är ditt att driva.",
    "sa_fungerar.onboarding.cta.label": "Vill du se en restaurang som redan kört igenom processen?",
    "sa_fungerar.onboarding.cta.link": "Se Capri Blue live",

    "sa_fungerar.features.eyebrow": "VAD DU FÅR",
    "sa_fungerar.features.h2": "Allt som ingår i ditt Amoora-system",
    "sa_fungerar.features.1.title": "Branded beställningssida",
    "sa_fungerar.features.1.body": "Din egen beställningssida med din logotyp, dina färger, din meny och din ton. Inga Foodora-banderoller, inga konkurrenter på samma sida. Bara du och din kund.",
    "sa_fungerar.features.2.title": "Onlinebetalning via Stripe",
    "sa_fungerar.features.2.body": "Kort, Apple Pay, Google Pay — direkt till ditt bankkonto, samma dag. Inga mellanhänder som håller pengarna i 30 dagar. Ingen procentavgift per order utöver Stripes vanliga transaktionsavgift.",
    "sa_fungerar.features.3.title": "Kökssystem med kvittoutskrift",
    "sa_fungerar.features.3.body": "Varje ny order skrivs automatiskt ut på din Sunmi-terminal i köket. Personalen ser ordern, läser av, lagar maten. Precis samma flöde som Foodora — men utan provisionen.",
    "sa_fungerar.features.4.title": "Leverans, avhämtning & dine-in",
    "sa_fungerar.features.4.body": "Avståndsbaserad leveransavgift, avhämtning från restaurangen, eller äta-här via QR-kod vid bordet. Alla tre flödena ingår — du bestämmer vilka du erbjuder.",
    "sa_fungerar.features.5.title": "Adminpanel",
    "sa_fungerar.features.5.body": "Hantera din meny, ändra priser, sätt öppettider, pausa rätter — allt från en panel. Se all försäljning i realtid. Exportera rapporter för bokföring och momsdeklaration.",
    "sa_fungerar.features.6.title": "Compliance & kvitton",
    "sa_fungerar.features.6.body": "Automatiska orderbekräftelser till kund och kök. Korrekt momshantering med den sänkta matmomsen på 6 % på avhämtning/leverans. Kvitton som ditt bokföringsprogram älskar.",

    "sa_fungerar.customer.h2": "Så enkelt blir det för dina kunder",
    "sa_fungerar.customer.sub": "Lika smidigt som Foodora — men det är din restaurang de möter, inte en plattform.",
    "sa_fungerar.customer.step1": "Kunden hittar din sida (Google, sociala medier, QR-kod)",
    "sa_fungerar.customer.step2": "Väljer rätter från din meny",
    "sa_fungerar.customer.step3": "Betalar med kort, Apple Pay eller Google Pay",
    "sa_fungerar.customer.step4": "Får orderbekräftelse — du får kvittot i köket",
    "sa_fungerar.customer.mockTitle": "Orderbekräftelse",
    "sa_fungerar.customer.mockOrder": "Ny order",
    "sa_fungerar.customer.mockItem": "2× Pizza Margherita",

    "sa_fungerar.viral.h2": "Och varje order blir en säljare",
    "sa_fungerar.viral.body": "Varje orderbekräftelse och varje sidfot bär 'Drivs av Amoora'. Restaurangägare beställer mat hela tiden — och varje gång de ser en proffsig Amoora-upplevelse vill de också ha det. Din kundanskaffning växer av sig själv.",
    "sa_fungerar.viral.link": "Läs mer om tillväxtmotorn →",

    "sa_fungerar.hardware.h3": "Hårdvaran du behöver",
    "sa_fungerar.hardware.body": "En Sunmi-terminal (V2s eller V3H) med inbyggd kvittoskrivare räcker. Kostar runt 3 200 kr engångskostnad och köps direkt från Logiscenter — vi har förhandlat fram volympriser så att du får ett bra pris. Vi guidar uppsättningen på distans via video.",
    "sa_fungerar.hardware.bullet1": "Allt-i-ett terminal med skrivare",
    "sa_fungerar.hardware.bullet2": "WiFi och 4G — fungerar var som helst",
    "sa_fungerar.hardware.bullet3": "Vi guidar installationen på distans",

    "sa_fungerar.support.h3": "Vi finns kvar efter lanseringen",
    "sa_fungerar.support.body": "E-postsupport ingår alltid. Telefon- och videosupport ingår i Amoora Plus och Pro. Vi tränar din personal, hjälper dig att uppdatera menyer och finns där när du behöver oss.",
    "sa_fungerar.support.cta": "Se planer & support →",

    "sa_fungerar.faq.eyebrow": "VANLIGA FRÅGOR",
    "sa_fungerar.faq.h2": "Snabba svar",
    "sa_fungerar.faq.q1": "Hur lång tid tar det att komma igång?",
    "sa_fungerar.faq.a1": "Från påskrift till live är det vanligtvis 3–7 dagar, beroende på menyns omfattning och hur snabbt Sunmi-terminalen levereras. Vi gör hela installationen — du fokuserar på maten.",
    "sa_fungerar.faq.q2": "Måste jag lämna Foodora?",
    "sa_fungerar.faq.a2": "Nej. Amoora ersätter inte Foodora — det kompletterar. Du behåller Foodora för synlighet om du vill, men du driver din egen kanal parallellt och slipper provision på alla direktbeställningar. De flesta av våra kunder ser sina direktbeställningar växa snabbt.",
    "sa_fungerar.faq.q3": "Vad händer om något krånglar?",
    "sa_fungerar.faq.a3": "Vi har distanssupport via video och telefon. Eftersom systemet är byggt på beprövad teknik (Vercel, Supabase, Stripe) är driftstörningar sällsynta — och när de händer fixar vi dem snabbt.",
    "sa_fungerar.faq.cta.label": "Vill du ha fler svar innan du bokar?",
    "sa_fungerar.faq.cta.link": "Se alla vanliga frågor på priser-sidan →",

    "sa_fungerar.final.h2": "Redo att se hur ditt system skulle se ut?",
    "sa_fungerar.final.sub": "Boka en gratis 20-minuters demo så går vi igenom hur Amoora skulle fungera för just din restaurang.",
    "sa_fungerar.final.placeholder": "Din e-postadress",
    "sa_fungerar.final.btn": "Boka demo",
    "sa_fungerar.final.phone": "Eller ring oss direkt:",

    "priser.hero.eyebrow": "PRISER",
    "priser.hero.h1": "Tre planer.<br><span class=\"hl\">Noll provision</span>.<br>Hela skillnaden i din ficka.",
    "priser.hero.sub": "Engångskostnad för uppsättning + låg fast månadsavgift. Det är hela kostnaden. Inga dolda avgifter. Ingen procent per order. Betala gärna via Klarna och börja idag.",
    "priser.hero.cta": "Boka demo för att komma igång",
    "priser.hero.klarna": "Tillgängligt med Klarna-fakturering",
    "priser.plans.eyebrow": "VÄLJ DIN PLAN",
    "priser.plans.h2": "Tre tydliga val.",
    "priser.plans.sub": "Inga dolda avgifter. Inga provisioner. Klarna-fakturering tillgänglig på alla planer.",

    "priser.pricing.eyebrow": "Klarna",
    "priser.pricing.h2": "Börja idag, betala över tid med Klarna",
    "priser.pricing.body": "Med Klarna-fakturering kan du dela upp engångskostnaden på 12 eller 24 månader och vara live nästa vecka. Du börjar tjäna in din investering innan du har slutat betala.",
    "priser.pricing.link": "Läs mer om Klarna-fakturering →",

    "priser.cards.system.tag": "Allt du behöver för att komma igång",
    "priser.cards.system.klarna": "Eller fr. 2 084 kr/mån via Klarna 12 mån",
    "priser.cards.system.include.1": "Branded beställningssida",
    "priser.cards.system.include.2": "Onlinebetalning via Stripe",
    "priser.cards.system.include.3": "Kökssystem (Sunmi-terminal anges separat)",
    "priser.cards.system.include.4": "Leverans, avhämtning & dine-in",
    "priser.cards.system.include.5": "Adminpanel & rapporter",
    "priser.cards.system.include.6": "E-postsupport",
    "priser.cards.system.include.7": "Onboarding & utbildning",
    "priser.cards.system.exclude.1": "Marknadsföringsmaterial",
    "priser.cards.system.exclude.2": "Sociala medier-paket",
    "priser.cards.system.exclude.3": "TikTok-videos",
    "priser.cards.system.button": "Välj System",

    "priser.cards.plus.tag": "Komplett paket med marknadsföring",
    "priser.cards.plus.klarna": "Eller fr. 2 917 kr/mån via Klarna 12 mån",
    "priser.cards.plus.include.1": "Allt i System",
    "priser.cards.plus.include.2": "Komplett marknadsföringsmaterial",
    "priser.cards.plus.include.3": "Grafisk profil (logotyp, färger, typografi)",
    "priser.cards.plus.include.4": "Sociala medier-paket (Instagram, Facebook)",
    "priser.cards.plus.include.5": "Telefon- och videosupport",
    "priser.cards.plus.include.6": "Premium onboarding",
    "priser.cards.plus.exclude.1": "TikTok-videos",
    "priser.cards.plus.exclude.2": "Videomarknadsföring",
    "priser.cards.plus.button": "Välj Plus",

    "priser.cards.pro.tag": "För dig som vill växa snabbt",
    "priser.cards.pro.klarna": "Eller fr. 3 750 kr/mån via Klarna 12 mån",
    "priser.cards.pro.include.1": "Allt i Plus",
    "priser.cards.pro.include.2": "TikTok-videos (skräddarsydda för din restaurang)",
    "priser.cards.pro.include.3": "Videomarknadsföring & redigering",
    "priser.cards.pro.include.4": "Premium support 7 dagar i veckan",
    "priser.cards.pro.include.5": "Strategirådgivning för digital tillväxt",
    "priser.cards.pro.button": "Välj Pro",

    "priser.cards.note": "Alla planer är engångskostnader för uppsättning. Månadsavgiften täcker drift, support och uppdateringar. Inga dolda avgifter. Inga provisioner. Klarna-fakturering tillgängligt.",
    "priser.final.h2": "Vilken plan passar din restaurang?",
    "priser.final.sub": "Boka en gratis demo så går vi igenom dina förutsättningar och rekommenderar rätt plan — utan press.",
    "priser.final.call": "Ring oss direkt",

    "priser.klarna.h3": "Börja idag, betala över tid med Klarna",
    "priser.klarna.body": "Med Klarna-fakturering kan du dela upp engångskostnaden på 12 eller 24 månader och vara live nästa vecka. Du börjar tjäna in din investering direkt — innan du har slutat betala.",
    "priser.klarna.link": "Läs mer om Klarna-fakturering →",

    "priser.calc.eyebrow": "RÄKNA UT DIN BESPARING",
    "priser.calc.h2": "Hur mycket betalar du till Foodora?",
    "priser.calc.sub": "Ange din månadsomsättning via Foodora — så visar vi exakt hur mycket du sparar med Amoora första året.",
    "priser.calc.inputLabel": "Månadsomsättning via Foodora (kr)",
    "priser.calc.foodora.label": "Du betalar Foodora idag",
    "priser.calc.foodora.monthly": "Per månad",
    "priser.calc.foodora.yearly": "Per år",
    "priser.calc.amoora.label": "Med Amoora första året",
    "priser.calc.amoora.setup": "Engångskostnad (Plus)",
    "priser.calc.amoora.months": "Månadsavgift",
    "priser.calc.amoora.total": "Totalt år 1",
    "priser.calc.savings.prefix": "Du sparar",
    "priser.calc.savings.suffix": "första året med Amoora",
    "priser.calc.savings.nextYear": "Och varje år därefter sparar du {amount}.",
    "priser.calc.cta": "Boka demo och börja spara →",

    "priser.compare.eyebrow": "JÄMFÖR PLANER",
    "priser.compare.h2": "Vad ingår i varje plan",
    "priser.compare.row.1": "Branded beställningssida",
    "priser.compare.row.2": "Onlinebetalning (Stripe)",
    "priser.compare.row.3": "Kökssystem (Sunmi-stöd)",
    "priser.compare.row.4": "Leverans, avhämtning, dine-in",
    "priser.compare.row.5": "Adminpanel & rapporter",
    "priser.compare.row.6": "E-postsupport",
    "priser.compare.row.7": "Telefonsupport",
    "priser.compare.row.8": "Videosupport",
    "priser.compare.row.9": "Grafisk profil",
    "priser.compare.row.10": "Sociala medier-paket",
    "priser.compare.row.11": "TikTok-videos",
    "priser.compare.row.12": "Videomarknadsföring",
    "priser.compare.row.13": "Strategirådgivning",
    "priser.compare.row.14": "Premium support 7 dagar/v",
    "priser.compare.summary.system": "Allt du behöver för att komma igång med eget beställningssystem och support.",
    "priser.compare.summary.plus": "Komplett paket med marknadsföring, premium onboarding och support.",
    "priser.compare.summary.pro": "För restauranger som vill växa snabbt med TikTok, video och strategirådgivning.",
    "priser.compare.summary.item1": "Branded beställningssida",
    "priser.compare.summary.item2": "Onlinebetalning",
    "priser.compare.summary.item3": "Kökssystem",
    "priser.compare.summary.item4": "Telefon & video support",
    "priser.compare.summary.item5": "Grafisk profil",
    "priser.compare.summary.item6": "Sociala medier",
    "priser.compare.summary.item7": "TikTok-videos",
    "priser.compare.summary.item8": "Videomarknadsföring",
    "priser.compare.summary.item9": "Premium support 7 dagar/v",

    "priser.notIncluded.h3": "Det här tillkommer (en gång)",
    "priser.notIncluded.1.title": "Sunmi-terminal",
    "priser.notIncluded.1.body": "Hårdvara för kökssystem. Cirka 3 200 kr engångskostnad. Köps direkt från Logiscenter — vi har förhandlat fram volympriser.",
    "priser.notIncluded.2.title": "Stripes transaktionsavgifter",
    "priser.notIncluded.2.body": "Stripes vanliga avgifter per kortbetalning (cirka 1,5 % + 1,80 kr). Detta är Stripes avgift, inte Amooras — och det är ändå mycket mindre än Foodoras 30 %.",

    "priser.faq.h2": "Allt du vill veta innan du bestämmer dig",
    "priser.faq.q1": "Hur skiljer sig Amoora från Foodora?",
    "priser.faq.a1": "Foodora är en plattform där du listar din restaurang bland tusentals andra och betalar 25–35 % provision per order. Amoora är ditt eget system — din egen sida, dina egna kunder, ditt eget varumärke — och du betalar noll provision. Du kan köra båda parallellt, men varje order via Amoora är 100 % din intäkt.",
    "priser.faq.q2": "Vad betyder 'engångskostnad'?",
    "priser.faq.a2": "Du betalar uppsättningskostnaden en gång när vi installerar och designar ditt system. Sedan betalar du bara en låg fast månadsavgift för drift och support. Inga dolda kostnader. Ingen procent per order. Klarna-fakturering tillgänglig om du vill dela upp engångskostnaden.",
    "priser.faq.q3": "Vad ingår i månadsavgiften?",
    "priser.faq.a3": "Hosting (vi kör ditt system på Vercel och Supabase — proffsig molninfrastruktur), löpande uppdateringar, säkerhetsuppdateringar, e-postsupport och tillgång till adminpanelen. Du äger systemet — vi sköter underhållet.",
    "priser.faq.q4": "Kan jag använda Klarna för engångskostnaden?",
    "priser.faq.a4": "Ja. Klarna-fakturering är tillgängligt på alla planer — du kan dela upp engångskostnaden på 12 eller 24 månadsbetalningar. Du börjar tjäna in din investering direkt — innan du har slutat betala.",
    "priser.faq.q5": "Vilken plan ska jag välja?",
    "priser.faq.a5": "System passar dig som redan har marknadsföring på plats och bara behöver tekniken. Plus passar de flesta — du får marknadsföringsmaterial och en proffsig grafisk profil utöver tekniken. Pro passar dig som vill växa aggressivt och utnyttja TikTok och video — vi producerar innehåll specifikt för din restaurang.",
    "priser.faq.q6": "Hur lång tid tar installationen?",
    "priser.faq.a6": "Från påskrift till live: vanligtvis 3–7 dagar. Det beror mest på hur snabbt Sunmi-terminalen levereras och hur omfattande din meny är. Vi gör all teknisk uppsättning — du levererar meny, bilder och logotyp.",
    "priser.faq.q7": "Vad händer om jag vill säga upp?",
    "priser.faq.a7": "Du kan säga upp månadsavgiften med 30 dagars varsel. Din beställningssida stängs ner när uppsägningen träder i kraft. Engångskostnaden är icke-återbetalbar eftersom uppsättningsarbetet redan är utfört.",
    "priser.faq.q8": "Äger jag verkligen mitt system?",
    "priser.faq.a8": "Ja. Din data tillhör dig — kundregister, ordrar, försäljningsstatistik, allt. Vi exporterar din data om du säger upp. Vi använder inte din data för andra ändamål. Du är inte låst till oss på det sätt restauranger är låsta till Foodora.",
    "priser.faq.q9": "Funkar det för icke-pizzerior också?",
    "priser.faq.a9": "Absolut. Amoora är byggt för alla typer av restauranger — pizzerior, sushi, kebab, asiatiskt, fine dining. Vi anpassar menyn och flödet efter din verksamhet. Pizzerior är bara där vi har mest erfarenhet.",
    "priser.faq.q10": "Vad är Sunmi-terminalen och varför behöver jag den?",
    "priser.faq.a10": "Sunmi är en allt-i-ett-terminal med inbyggd kvittoskrivare som tar emot ordrar från ditt Amoora-system och skriver ut dem automatiskt i köket. Modell V2s eller V3H räcker. Cirka 3 200 kr engångskostnad — köps direkt från Logiscenter med våra förhandlade volympriser.",
    "priser.faq.q11": "Vad händer om något krånglar tekniskt?",
    "priser.faq.a11": "Vi har distanssupport via e-post (System), telefon och video (Plus och Pro). Systemet bygger på beprövad teknik (Vercel, Supabase, Stripe) som har 99,9 % drifttid. Allvarliga driftstörningar är sällsynta — och när de händer prioriterar vi dem direkt.",
    "priser.faq.q12": "Kan jag uppgradera eller nedgradera senare?",
    "priser.faq.a12": "Ja. Du kan när som helst uppgradera till en högre plan — du betalar mellanskillnaden i engångskostnad. Att nedgradera är också möjligt vid månadsskifte. Vi vill att du har rätt plan för ditt skede.",    "ref.label": "Referenscase",
    "ref.title": "Capri Blue Pizzeria är live på Amoora",
    "ref.body": "Vår första kund är redan igång med sitt egna provisionsfria system — komplett med beställningssida, onlinebetalning och automatisk kvittoutskrift i köket. Se det live.",
    "ref.btn": "Se Capri Blue live",

    /* Social proof */
    "proof.eyebrow": "Kunder",
    "proof.h2": "Restauranger som litar på Amoora",
    "proof.sub": "Restauranger och pizzerior över hela Sverige äger nu sina egna system.",
    "proof.sample": "Exempel",
    "proof.t1": "Vi sparar tusentals kronor varje månad sedan vi bytte till Amoora.",
    "proof.t1.name": "Marco B.",
    "proof.t1.role": "Pizzeria-ägare, Stockholm",
    "proof.t2": "Äntligen äger vi vår kunddata och vårt eget system.",
    "proof.t2.name": "Sara L.",
    "proof.t2.role": "Restaurangägare, Göteborg",
    "proof.t3": "Installationen tog en vecka. Nu behåller vi 100% av intäkterna.",
    "proof.t3.name": "Ahmed K.",
    "proof.t3.role": "Pizzeria-ägare, Malmö",

    /* Stats */
    "stats.1.label": "provision",
    "stats.2.label": "sparas per år (typisk pizzeria)",
    "stats.3.label": "av dina direktintäkter",
    "stats.4.label": "dagar till lansering",

    /* Final CTA */
    "final.h2": "Redo att äga ditt eget system?",
    "final.sub": "Boka en gratis demo så visar vi hur Amoora fungerar för just din restaurang.",
    "final.placeholder": "Din e-postadress",
    "final.btn": "Boka demo",
    "final.phone": "Eller ring oss direkt:",

    /* Footer */
    "footer.tagline": "Äg ditt eget beställningssystem. Noll provision.",
    "footer.lynkrr": "En produkt av Lynkrr AB",
    "footer.product": "Produkt",
    "footer.resources": "Resurser",
    "footer.contactTitle": "Kontakt",
    "footer.how": "Så fungerar det",
    "footer.pricing": "Priser",
    "footer.demo": "Boka demo",
    "footer.blog": "Blogg",
    "footer.faq": "Vanliga frågor",
    "footer.contact": "Kontakt",
    "footer.rights": "© 2026 Amoora. Alla rättigheter förbehållna.",
    "footer.privacy": "Integritetspolicy",
    "footer.terms": "Villkor"
  },

  en: {
    /* Header / nav */
    "nav.home": "Home",
    "nav.how": "How it works",
    "nav.raknare": "Calculator",
    "nav.pricing": "Pricing",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "cta.bookDemo": "Book demo",
    "nav.menuLabel": "Menu",

    /* Hero */
    "hero.eyebrow": "Ordering system for restaurants",
    "hero.h1": "Zero commission.<br><span class=\"hl\">Own your own</span> system.",
    "hero.sub": "A pizzeria selling for 100,000 kr/month via Foodora pays 360,000 kr a year in commission. With Amoora you own the system and keep every krona on your direct orders.",
    "hero.ctaPrimary": "Book a free demo",
    "hero.ctaSecondary": "See Capri Blue live",
    "hero.trust1": "One-time cost",
    "hero.trust2": "Zero commission",
    "hero.trust3": "Ready in 7 days",
    "hero.mockTitle": "Orders today",
    "hero.mockOrder": "New order",
    "hero.mockItem": "Pizza Margherita",

    /* Problem / Solution */
    "ps.eyebrow": "Comparison",
    "ps.h2": "Foodora takes 30%. Amoora takes 0%.",
    "ps.sub": "See the difference between renting a platform and owning your own system.",
    "ps.foodoraTitle": "With Foodora",
    "ps.amooraTitle": "With Amoora",
    "ps.f1": "30% commission on every order",
    "ps.f2": "Dependent on the platform",
    "ps.f3": "No access to customer data",
    "ps.f4": "Ongoing monthly fees",
    "ps.a1": "0% commission — forever",
    "ps.a2": "Your own system",
    "ps.a3": "Own all your customer data",
    "ps.a4": "One single one-time cost",
    "ps.stat": "Save up to 30% on every order",

    /* Calculator */
    "calculator.label": "LIVE CALCULATOR",
    "calculator.title": "Calculate live in 30 seconds.",
    "calculator.sub": "Two questions. Seven answers. See exactly how much your restaurant loses every month — and when you break free.",
    "calculator.scenario.small": "Small pizzeria",
    "calculator.scenario.smallMeta": "50 orders/wk · 130 kr",
    "calculator.scenario.medium": "Medium pizzeria",
    "calculator.scenario.mediumMeta": "150 orders/wk · 150 kr",
    "calculator.scenario.large": "Large pizzeria",
    "calculator.scenario.largeMeta": "350 orders/wk · 170 kr",
    "calculator.input.orders.title": "Orders per week via platforms",
    "calculator.input.orders.note": "Foodora, Wolt, or similar",
    "calculator.input.avg.title": "Average order value (SEK)",
    "calculator.input.avg.note": "Typically 130-170 SEK for pizza in Sweden",
    "calculator.advanced.toggle": "Advanced: adjust commission %",
    "calculator.advanced.title": "Platform commission %",
    "calculator.results.lostLabel": "YOU'RE LOSING RIGHT NOW",
    "calculator.results.lostSub": "SEK per year to Foodora",
    "calculator.tickerText": "Since you opened this page, you've lost {amount} to Foodora...",
    "calculator.breakpoint.label": "PAYBACK",
    "calculator.breakpoint.note": "days until Amoora has paid for itself",
    "calculator.freedom.label": "YOUR FREEDOM DATE",
    "calculator.freedom.note": "From this date you are 100% commission-free",
    "calculator.equivalent.label": "THAT'S EQUAL TO",
    "calculator.equivalent.oven": "pizza ovens",
    "calculator.equivalent.employee": "full-time employees",
    "calculator.equivalent.vacation": "family vacations",
    "calculator.equivalent.note": "All of this — gone. Every year. To Foodora.",
    "calculator.chart.title": "Annual cost: three options",
    "calculator.chart.foodora": "Foodora ({pct}% commission)",
    "calculator.chart.wolt": "Wolt ({pct}% commission)",
    "calculator.chart.amoora": "Amoora (one-time)",
    "calculator.share.title": "Send the result to yourself",
    "calculator.share.placeholder": "Your email address",
    "calculator.share.button": "Send result",
    "calculator.share.ctaHeading": "Stop bleeding. Book demo now →",
    "calculator.share.success": "We'll send a summary to your email — soon you'll be ready to book a demo.",
    "calculator.share.error": "Enter a valid email address to send the result.",
    "calculator.hero.eyebrow": "CALCULATOR",
    "calculator.hero.h1": "How much is your restaurant losing right now?",
    "calculator.hero.sub": "Two questions. Seven answers. Calculate live in 30 seconds and see exactly what you pay in commission — and when Amoora pays back.",
    "calculator.commissions.title": "Adjust commissions",
    "calculator.inputs.foodora": "Foodora commission %",
    "calculator.inputs.foodora.note": "Adjust if you have negotiated a different deal",
    "calculator.inputs.wolt": "Wolt commission %",
    "calculator.inputs.wolt.note": "Adjust if you have negotiated a different deal",
    "calculator.trust.1": "Calculator based on real Foodora numbers (25-35%)",
    "calculator.trust.2": "Results are averages — your situation may vary",
    "calculator.trust.3": "Book a demo and we'll do an exact calculation for your restaurant",
    "calculator.cta.bottom.h2": "Convinced? Next step is 20 minutes.",
    "calculator.cta.bottom.p": "Book a demo and we'll go through the result together and show the system live.",
    "calculator.cta.bottom.btn": "Book demo →",
    "calculator.share.summary": "Commissions: Foodora {foodora}% · Wolt {wolt}%",

    /* Features */
    "feat.eyebrow": "Features",
    "feat.h2": "Everything your restaurant needs",
    "feat.sub": "A complete system built for restaurants and pizzerias — from order to delivery.",
    "feat.1.t": "Your own ordering page",
    "feat.1.d": "Your customers order directly from you — no middlemen, no commission.",
    "feat.1.note": "Incl. kitchen system with automatic receipt printing (Sunmi terminal).",
    "feat.2.t": "QR menu",
    "feat.2.d": "Scan and order right at the table.",
    "feat.3.t": "Delivery management",
    "feat.3.d": "Manage your own couriers and deliveries in real time.",
    "feat.4.t": "Payments",
    "feat.4.d": "Card, Apple Pay and Google Pay via Stripe — money goes straight to you.",
    "feat.5.t": "Customer records",
    "feat.5.d": "Own your customer data and build loyalty over time.",
    "feat.6.t": "Stats & reports",
    "feat.6.d": "Full control of your sales.",
    "feat.7.t": "Your own app",
    "feat.7.d": "Your restaurant in your customer's pocket — always one tap away.",

    /* How it works */
    "how.eyebrow": "How it works",
    "how.h2": "Up and running in four steps",
    "how.sub": "We handle all the technical work. You focus on the food.",
    "how.1.t": "We set up your system",
    "how.1.d": "We install and configure the entire system for you.",
    "how.2.t": "We design your ordering page",
    "how.2.d": "A polished page in your restaurant's brand.",
    "how.3.t": "You start taking orders",
    "how.3.d": "Ready to use in just 7 days.",
    "how.4.t": "You keep 100% of the revenue",
    "how.4.d": "No commission. No monthly fees.",
    "how.cta": "See how it works in detail",

    /* Viral engine */
    "viral.eyebrow": "The growth engine",
    "viral.h2": "Every order is a salesperson",
    "viral.body": "Every order confirmation and every ordering page carries the line “Powered by Amoora”. Restaurant owners order food all the time — and every time they see a polished Amoora experience they think: “I want that too.” Your customer acquisition grows on its own, completely free.",
    "viral.p1": "“Powered by Amoora” on every receipt",
    "viral.p2": "“Powered by Amoora” in every footer",
    "viral.p3": "Free word-of-mouth, restaurant to restaurant",
    "viral.receiptTitle": "Order confirmation",
    "viral.receiptOrder": "Order #1042",
    "viral.receiptItem1": "2× Pizza Margherita",
    "viral.receiptItem2": "1× Garlic bread",
    "viral.receiptTotal": "Total",
    "viral.poweredBy": "Powered by Amoora",

    /* Urgency band */
    "urgency.label": "Limited-time window",
    "urgency.text": "Food VAT is cut to 6% on takeaway and delivery through 2027.",
    "urgency.sub": "Direct sales are more profitable than ever. The sooner you own your system, the more you earn.",

    /* Pricing */
    "price.eyebrow": "Pricing",
    "price.h2": "Choose your plan",
    "price.sub": "One-time setup cost + a low fixed monthly fee. Pay with Klarna if you like.",
    "price.monthly": "+ from 495 kr/month",
    "price.vat": "+ VAT",
    "price.popular": "Most popular",
    "price.system.name": "Amoora System",
    "price.system.1": "Complete ordering system",
    "price.system.2": "Your own ordering page",
    "price.system.3": "Payment integration",
    "price.system.4": "Support",
    "price.plus.name": "Amoora Plus",
    "price.plus.1": "Everything in System",
    "price.plus.2": "All marketing material",
    "price.plus.3": "Graphic profile",
    "price.plus.4": "Social media package",
    "price.pro.name": "Amoora Pro",
    "price.pro.1": "Everything in Plus",
    "price.pro.2": "TikTok videos",
    "price.pro.3": "Video marketing",
    "price.pro.4": "Premium support",
    "price.choose": "Book demo",
    "price.cta": "See full pricing",

    "blogg.hero.label": "BLOG",
    "blogg.hero.h1": "Insights for restaurants that want to own their growth",
    "blogg.hero.sub": "Practical guides, financial analysis and real Swedish restaurant case studies that took control back.",
    "blogg.filter.all": "All",
    "blogg.filter.awareness": "Awareness",
    "blogg.filter.compare": "Comparison",
    "blogg.filter.guide": "Guide",
    "blogg.filter.economy": "Economy",
    "blogg.filter.case": "Case study",
    "blogg.newsletter.h2": "Get new insights in your inbox",
    "blogg.newsletter.sub": "One article a month about how Swedish restaurants own their growth. No spam. Just value.",
    "blogg.newsletter.placeholder": "Your email address",
    "blogg.newsletter.button": "Subscribe",
    "blogg.newsletter.trust": "No spam. Unsubscribe anytime.",
    "blogg.follow.label": "Follow Amoora:",
    "blogg.article.share": "Share article",
    "blogg.article.copy": "Copy link",
    "blogg.article.copied": "Link copied!",
    "blogg.article.related": "Related posts",
    "blogg.article.translationNote": "Show English placeholder text when English is active.",

    /* Contact */
    "contact.hero.h1": "Book a free demo.<br><span class=\"hl\">See your own system.</span>",
    "contact.hero.sub": "20 minutes. No sales pitch. We show how Amoora would work for your restaurant — and you ask everything you want.",
    "contact.info.title": "Quick contact",
    "contact.info.urgency": "Need to talk today? Call us directly or email — we'd love to hear from you.",
    "contact.form.title": "Send a message",
    "contact.form.subtitle": "Fill in the form and we’ll reply within 24 hours with three suggested times.",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.email": "Email address",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.phone": "Phone (optional)",
    "contact.form.phonePlaceholder": "+46 (0)8 000 00 00",
    "contact.form.restaurant": "Restaurant name",
    "contact.form.restaurantPlaceholder": "Your restaurant",
    "contact.form.city": "City",
    "contact.form.cityPlaceholder": "Stockholm",
    "contact.form.revenue": "Monthly revenue via Foodora",
    "contact.form.revenuePlaceholder": "Select range",
    "contact.form.revenue.help": "Helps us prepare a relevant ROI calculation for the call.",
    "contact.form.plan": "Which plan are you interested in?",
    "contact.form.plan.system": "Amoora System",
    "contact.form.plan.plus": "Amoora Plus (most popular)",
    "contact.form.plan.pro": "Amoora Pro",
    "contact.form.plan.unsure": "Not sure yet",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell us what you'd like to know...",
    "contact.form.privacy": "I agree that Amoora can save my information to respond to my request.",
    "contact.form.submit": "Send message",
    "contact.faq.title": "Frequently asked questions",
    "contact.faq.sub": "The answers you're looking for are often already here.",
    "contact.faq.q1": "Is the demo really free?",
    "contact.faq.a1": "Yes, completely free and with no obligations. We take 20 minutes of your time and show the system — you decide for yourself whether it's interesting. About 30% of the people we talk to become customers; 70% say no and there are no hard feelings.",
    "contact.faq.q2": "Do I need to prepare anything for the call?",
    "contact.faq.a2": "No. The only thing that helps is having your current Foodora revenue roughly in mind — so we can make an exact ROI calculation for your restaurant. Knowing approximately is enough.",
    "contact.faq.q3": "What if I'm not a pizzeria?",
    "contact.faq.a3": "We started with pizzerias but the system works for all kinds of restaurants — sushi, kebab, Asian, fine dining. Book a demo and we'll go through whether Amoora suits you.",
    "contact.faq.link": "See all frequently asked questions →",
    "contact.ready.title": "Or call us directly",
    "contact.ready.sub": "If you prefer a spontaneous call — ring or email, we answer right away.",
    "contact.ready.call": "Call +46 10 185 00 01",
    "contact.ready.email": "Email info@amoora.se",
    "contact.form.successTitle": "Thank you! We'll get back to you within 24 hours.",
    "contact.form.successBody": "We will send three suggested times and a short confirmation to the email address you provided.",
    "contact.form.successButton": "Back to home",
    "contact.hero.label": "CONTACT",
    "contact.hero.trust.1": "No obligations",
    "contact.hero.trust.2": "Reply within 24 hours",
    "contact.hero.trust.3": "No sales consultants",
    "contact.info.label": "PREFER TO CALL OR EMAIL?",
    "contact.card.phone.title": "Phone",
    "contact.card.phone.detail": "+46 10 185 00 01",
    "contact.card.phone.hours": "Mon–Fri 09–17",
    "contact.card.email.title": "Email",
    "contact.card.email.detail": "info@amoora.se",
    "contact.card.email.response": "Reply within 24 hours",
    "contact.card.social.title": "Social media",
    "contact.what.title": "What happens after you book?",
    "contact.what.1": "You receive confirmation by email with three suggested times.",
    "contact.what.2": "We have a 20-minute video call — you show your current setup.",
    "contact.what.3": "We show Capri Blue live and how your system would look.",
    "contact.what.4": "You receive a concrete offer and ROI calculation. No obligations.",
    "contact.trust.title": "You're in good company",
    "contact.trust.1.name": "Capri Blue",
    "contact.trust.1.detail": "First customer, live now",
    "contact.trust.2.name": "Lynkrr AB",
    "contact.trust.2.detail": "Established Swedish company",
    "contact.trust.3.name": "Klarna invoicing",
    "contact.trust.3.detail": "Available on all plans",

    /* How it works */
    "sa_fungerar.hero.eyebrow": "HOW IT WORKS",
    "sa_fungerar.hero.h1": "From Foodora dependency to your own system — in days.",
    "sa_fungerar.hero.sub": "We handle all the technology. You focus on the food. Here is exactly how we take your restaurant from first call to live online — without you lifting a finger.",
    "sa_fungerar.hero.ctaSecondary": "See pricing",

    "sa_fungerar.promise.1.value": "5",
    "sa_fungerar.promise.1.title": "Days",
    "sa_fungerar.promise.1.text": "until your restaurant is live",
    "sa_fungerar.promise.2.value": "0",
    "sa_fungerar.promise.2.title": "Middlemen",
    "sa_fungerar.promise.2.text": "between you and the customer",
    "sa_fungerar.promise.3.value": "100%",
    "sa_fungerar.promise.3.title": "Of revenue",
    "sa_fungerar.promise.3.text": "is yours to keep",

    "sa_fungerar.onboarding.eyebrow": "ONBOARDING",
    "sa_fungerar.onboarding.h2": "From first call to live — in 5 steps",
    "sa_fungerar.onboarding.sub": "A walkthrough of exactly what happens between signing and your first order.",
    "sa_fungerar.onboarding.step1.badge": "What we do",
    "sa_fungerar.onboarding.step1.title": "We clone your template",
    "sa_fungerar.onboarding.step1.body": "We take our proven Amoora template and clone it for your restaurant. We add your name, address, colors and logo. One hour later — your unique instance exists.",
    "sa_fungerar.onboarding.step2.badge": "What we do",
    "sa_fungerar.onboarding.step2.title": "We set up your database",
    "sa_fungerar.onboarding.step2.body": "We create a dedicated Supabase project for your restaurant. All customer data, menus and orders live in a system you own. No shared databases. No middlemen.",
    "sa_fungerar.onboarding.step3.badge": "What we do",
    "sa_fungerar.onboarding.step3.title": "We design your ordering page",
    "sa_fungerar.onboarding.step3.body": "We load your full menu, categorize dishes, set prices, add images and descriptions. The result: a polished ordering page that reflects your restaurant — not a generic platform template.",
    "sa_fungerar.onboarding.step4.badge": "What you do",
    "sa_fungerar.onboarding.step4.title": "You buy a Sunmi terminal",
    "sa_fungerar.onboarding.step4.body": "You buy a Sunmi terminal (V2s or V3H, roughly 3 200 kr) with built-in receipt printing. We guide setup remotely. When connected, every new order prints automatically in your kitchen — just like Foodora.",
    "sa_fungerar.onboarding.step5.badge": "Together",
    "sa_fungerar.onboarding.step5.title": "Testing, launch and handover",
    "sa_fungerar.onboarding.step5.body": "We do a test order from start to print together. When everything runs smoothly — you are live. We remain available for support, but the system is yours.",
    "sa_fungerar.onboarding.cta.label": "Want to see a restaurant that has already completed the process?",
    "sa_fungerar.onboarding.cta.link": "See Capri Blue live",

    "sa_fungerar.features.eyebrow": "WHAT YOU GET",
    "sa_fungerar.features.h2": "Everything included in your Amoora system",
    "sa_fungerar.features.1.title": "Branded ordering page",
    "sa_fungerar.features.1.body": "Your own ordering page with your logo, colors, menu and tone. No Foodora banners, no competitors on the same page. Just you and your customer.",
    "sa_fungerar.features.2.title": "Online payments via Stripe",
    "sa_fungerar.features.2.body": "Card, Apple Pay, Google Pay — straight into your account, same day. No middlemen holding the money for 30 days. No percentage fee per order beyond Stripe's standard transaction cost.",
    "sa_fungerar.features.3.title": "Kitchen system with receipt printing",
    "sa_fungerar.features.3.body": "Every new order prints automatically on your Sunmi terminal in the kitchen. Staff see the order, read it, cook it. The exact same flow as Foodora — but without the commission.",
    "sa_fungerar.features.4.title": "Delivery, pickup & dine-in",
    "sa_fungerar.features.4.body": "Distance-based delivery fees, pickup from the restaurant, or dine-in with QR ordering at the table. All three flows are included — you choose what you offer.",
    "sa_fungerar.features.5.title": "Admin panel",
    "sa_fungerar.features.5.body": "Manage your menu, edit prices, set opening hours, pause dishes — all from one panel. See sales in real time. Export reports for accounting and VAT.",
    "sa_fungerar.features.6.title": "Compliance & receipts",
    "sa_fungerar.features.6.body": "Automatic order confirmations to customer and kitchen. Correct VAT handling with the lowered 6% food VAT for pickup/delivery. Receipts your accounting software loves.",

    "sa_fungerar.customer.h2": "How easy it becomes for your customers",
    "sa_fungerar.customer.sub": "As smooth as Foodora — but your restaurant is what they meet, not a platform.",
    "sa_fungerar.customer.step1": "Customer finds your page (Google, social, QR code)",
    "sa_fungerar.customer.step2": "Chooses dishes from your menu",
    "sa_fungerar.customer.step3": "Pays with card, Apple Pay or Google Pay",
    "sa_fungerar.customer.step4": "Gets confirmation — you get the receipt in the kitchen",
    "sa_fungerar.customer.mockTitle": "Order confirmation",
    "sa_fungerar.customer.mockOrder": "New order",
    "sa_fungerar.customer.mockItem": "2× Pizza Margherita",

    "sa_fungerar.viral.h2": "And every order becomes a salesperson",
    "sa_fungerar.viral.body": "Every order confirmation and every footer carries 'Powered by Amoora'. Restaurant owners order food all the time — and each time they see a polished Amoora experience, they want the same. Your customer acquisition grows on its own.",
    "sa_fungerar.viral.link": "Learn more about the growth engine →",

    "sa_fungerar.hardware.h3": "The hardware you need",
    "sa_fungerar.hardware.body": "A Sunmi terminal (V2s or V3H) with built-in receipt printing is enough. Costs about 3 200 kr one-time and is purchased directly from Logiscenter — we negotiated volume pricing so you get a good deal. We guide setup remotely by video.",
    "sa_fungerar.hardware.bullet1": "All-in-one terminal with printer",
    "sa_fungerar.hardware.bullet2": "WiFi and 4G — works anywhere",
    "sa_fungerar.hardware.bullet3": "We guide installation remotely",

    "sa_fungerar.support.h3": "We stay after launch",
    "sa_fungerar.support.body": "Email support is always included. Phone and video support are included in Amoora Plus and Pro. We train your staff, help you update menus and are there when you need us.",
    "sa_fungerar.support.cta": "See plans & support →",

    "sa_fungerar.faq.eyebrow": "FREQUENT QUESTIONS",
    "sa_fungerar.faq.h2": "Quick answers",
    "sa_fungerar.faq.q1": "How long does it take to get started?",
    "sa_fungerar.faq.a1": "From signing to live is usually 3–7 days, depending on menu size and how quickly the Sunmi terminal arrives. We do all the technical setup — you focus on the food.",
    "sa_fungerar.faq.q2": "Do I have to leave Foodora?",
    "sa_fungerar.faq.a2": "No. Amoora does not replace Foodora — it complements it. You keep Foodora for visibility if you want, but you run your own channel in parallel and avoid commission on all direct orders. Most customers see their direct orders grow quickly.",
    "sa_fungerar.faq.q3": "What if something breaks?",
    "sa_fungerar.faq.a3": "We have remote support via video and phone. Because the system is built on proven technology (Vercel, Supabase, Stripe), outages are rare — and when they happen, we fix them fast.",
    "sa_fungerar.faq.cta.label": "Want more answers before you book?",
    "sa_fungerar.faq.cta.link": "See all frequent questions on the pricing page →",

    "sa_fungerar.final.h2": "Ready to see what your system could look like?",
    "sa_fungerar.final.sub": "Book a free 20-minute demo and we will walk you through how Amoora would work for your restaurant.",
    "sa_fungerar.final.placeholder": "Your email address",
    "sa_fungerar.final.btn": "Book demo",
    "sa_fungerar.final.phone": "Or call us directly:",

    "priser.hero.eyebrow": "PRICES",
    "priser.hero.h1": "Three plans.<br><span class=\"hl\">Zero commission</span>.<br>The whole difference in your pocket.",
    "priser.hero.sub": "One-off setup cost + low fixed monthly fee. That is the total price. No hidden fees. No percentage per order. Prefer Klarna? Start today.",
    "priser.hero.cta": "Book a demo to get started",
    "priser.hero.klarna": "Available with Klarna invoicing",
    "priser.plans.eyebrow": "CHOOSE YOUR PLAN",
    "priser.plans.h2": "Three clear choices.",
    "priser.plans.sub": "No hidden fees. No commissions. Klarna invoicing available on all plans.",

    "priser.pricing.eyebrow": "Klarna",
    "priser.pricing.h2": "Start today, pay overtime with Klarna",
    "priser.pricing.body": "With Klarna invoicing you can spread the one-time cost over 12 or 24 months and be live next week. You start earning back your investment before you’re finished paying.",
    "priser.pricing.link": "Learn more about Klarna billing →",

    "priser.cards.system.tag": "Everything you need to get started",
    "priser.cards.system.klarna": "Or from 2 084 kr/month with Klarna 12 months",
    "priser.cards.system.include.1": "Branded ordering page",
    "priser.cards.system.include.2": "Online payments via Stripe",
    "priser.cards.system.include.3": "Kitchen system (Sunmi terminal sold separately)",
    "priser.cards.system.include.4": "Delivery, pickup & dine-in",
    "priser.cards.system.include.5": "Admin panel & reports",
    "priser.cards.system.include.6": "Email support",
    "priser.cards.system.include.7": "Onboarding & training",
    "priser.cards.system.exclude.1": "Marketing materials",
    "priser.cards.system.exclude.2": "Social media package",
    "priser.cards.system.exclude.3": "TikTok videos",
    "priser.cards.system.button": "Choose System",

    "priser.cards.plus.tag": "Complete package with marketing",
    "priser.cards.plus.klarna": "Or from 2 917 kr/month with Klarna 12 months",
    "priser.cards.plus.include.1": "Everything in System",
    "priser.cards.plus.include.2": "Complete marketing materials",
    "priser.cards.plus.include.3": "Graphic profile (logo, colors, typography)",
    "priser.cards.plus.include.4": "Social media package (Instagram, Facebook)",
    "priser.cards.plus.include.5": "Phone & video support",
    "priser.cards.plus.include.6": "Premium onboarding",
    "priser.cards.plus.exclude.1": "TikTok videos",
    "priser.cards.plus.exclude.2": "Video marketing",
    "priser.cards.plus.button": "Choose Plus",

    "priser.cards.pro.tag": "For restaurants that want to grow fast",
    "priser.cards.pro.klarna": "Or from 3 750 kr/month with Klarna 12 months",
    "priser.cards.pro.include.1": "Everything in Plus",
    "priser.cards.pro.include.2": "TikTok videos tailored to your restaurant",
    "priser.cards.pro.include.3": "Video marketing & editing",
    "priser.cards.pro.include.4": "Premium support 7 days a week",
    "priser.cards.pro.include.5": "Growth strategy advice",
    "priser.cards.pro.button": "Choose Pro",

    "priser.cards.note": "All plans are one-time setup costs. Monthly fees cover hosting, support and updates. No hidden fees. No commissions. Klarna invoicing available.",
    "priser.final.h2": "Which plan suits your restaurant?",
    "priser.final.sub": "Book a free demo and we'll go through your situation and recommend the right plan — no pressure.",
    "priser.final.call": "Call us directly",

    "priser.klarna.h3": "Start today, pay overtime with Klarna",
    "priser.klarna.body": "With Klarna invoicing you can spread the one-time cost over 12 or 24 months and be live next week. You start earning back your investment before you’re finished paying.",
    "priser.klarna.link": "Learn more about Klarna billing →",

    "priser.calc.eyebrow": "CALCULATE YOUR SAVING",
    "priser.calc.h2": "How much are you paying Foodora?",
    "priser.calc.sub": "Enter your monthly Foodora revenue — and we’ll show you exactly how much you save with Amoora in the first year.",
    "priser.calc.inputLabel": "Monthly Foodora revenue (kr)",
    "priser.calc.foodora.label": "You pay Foodora today",
    "priser.calc.foodora.monthly": "Per month",
    "priser.calc.foodora.yearly": "Per year",
    "priser.calc.amoora.label": "With Amoora in year one",
    "priser.calc.amoora.setup": "One-time cost (Plus)",
    "priser.calc.amoora.months": "Monthly fee",
    "priser.calc.amoora.total": "Total year 1",
    "priser.calc.savings.prefix": "You save",
    "priser.calc.savings.suffix": "in the first year with Amoora",
    "priser.calc.savings.nextYear": "And each year after that you save {amount}.",
    "priser.calc.cta": "Book a demo and start saving →",

    "priser.compare.eyebrow": "COMPARE PLANS",
    "priser.compare.h2": "What is included in each plan",
    "priser.compare.row.1": "Branded ordering page",
    "priser.compare.row.2": "Online payments (Stripe)",
    "priser.compare.row.3": "Kitchen system (Sunmi support)",
    "priser.compare.row.4": "Delivery, pickup, dine-in",
    "priser.compare.row.5": "Admin panel & reports",
    "priser.compare.row.6": "Email support",
    "priser.compare.row.7": "Phone support",
    "priser.compare.row.8": "Video support",
    "priser.compare.row.9": "Graphic profile",
    "priser.compare.row.10": "Social media package",
    "priser.compare.row.11": "TikTok videos",
    "priser.compare.row.12": "Video marketing",
    "priser.compare.row.13": "Strategy advice",
    "priser.compare.row.14": "Premium support 7 days/wk",
    "priser.compare.summary.system": "Everything you need to get started with your own ordering system and support.",
    "priser.compare.summary.plus": "Complete package with marketing, premium onboarding and support.",
    "priser.compare.summary.pro": "For restaurants that want to grow fast with TikTok, video and strategy.",
    "priser.compare.summary.item1": "Branded ordering page",
    "priser.compare.summary.item2": "Online payments",
    "priser.compare.summary.item3": "Kitchen system",
    "priser.compare.summary.item4": "Phone & video support",
    "priser.compare.summary.item5": "Graphic profile",
    "priser.compare.summary.item6": "Social media",
    "priser.compare.summary.item7": "TikTok videos",
    "priser.compare.summary.item8": "Video marketing",
    "priser.compare.summary.item9": "Premium support 7 days/wk",

    "priser.notIncluded.h3": "These costs are added once",
    "priser.notIncluded.1.title": "Sunmi terminal",
    "priser.notIncluded.1.body": "Hardware for the kitchen system. About 3 200 kr one-time. Purchased directly from Logiscenter — we negotiate volume pricing.",
    "priser.notIncluded.2.title": "Stripe transaction fees",
    "priser.notIncluded.2.body": "Stripe's standard fees per card payment (about 1.5% + 1.80 kr). This is Stripe's fee, not Amoora's — and it is still much lower than Foodora's 30%.",

    "priser.faq.h2": "Everything you want to know before deciding",
    "priser.faq.q1": "How is Amoora different from Foodora?",
    "priser.faq.a1": "Foodora is a platform where you list your restaurant among thousands of others and pay 25–35% commission per order. Amoora is your own system — your own page, your own customers, your own brand — and you pay zero commission. You can run both in parallel, but every order via Amoora is 100% yours.",
    "priser.faq.q2": "What does 'one-time cost' mean?",
    "priser.faq.a2": "You pay the setup cost once when we install and design your system. After that, you only pay a low fixed monthly fee for hosting and support. No hidden costs. No percentage per order. Klarna invoicing is available if you want to split the one-time cost.",
    "priser.faq.q3": "What is included in the monthly fee?",
    "priser.faq.a3": "Hosting (we run your system on Vercel and Supabase — professional cloud infrastructure), ongoing updates, security maintenance, email support and access to the admin panel. You own the system — we take care of maintenance.",
    "priser.faq.q4": "Can I use Klarna for the one-time cost?",
    "priser.faq.a4": "Yes. Klarna invoicing is available on all plans — you can split the setup cost over 12 or 24 monthly payments. You start earning back your investment right away — before you finish paying.",
    "priser.faq.q5": "Which plan should I choose?",
    "priser.faq.a5": "System is for restaurants that already have marketing in place and just need the technology. Plus fits most — you get marketing materials and a polished graphic profile in addition to the technology. Pro is for those who want to grow aggressively and use TikTok and video — we produce content specifically for your restaurant.",
    "priser.faq.q6": "How long does installation take?",
    "priser.faq.a6": "From signing to live: usually 3–7 days. It depends mostly on how quickly the Sunmi terminal is delivered and how extensive your menu is. We do all technical setup — you provide the menu, images and logo.",
    "priser.faq.q7": "What happens if I want to cancel?",
    "priser.faq.a7": "You can cancel the monthly fee with 30 days notice. Your ordering page is turned off when cancellation takes effect. The one-time cost is non-refundable because the setup work has already been done.",
    "priser.faq.q8": "Do I really own my system?",
    "priser.faq.a8": "Yes. Your data belongs to you — customer records, orders, sales statistics, everything. We export your data if you cancel. We do not use your data for other purposes. You are not locked in the way restaurants are locked into Foodora.",
    "priser.faq.q9": "Does it work for non-pizzerias too?",
    "priser.faq.a9": "Absolutely. Amoora is built for all types of restaurants — pizzerias, sushi, kebab, Asian, fine dining. We adapt the menu and flow to your business. Pizzerias are just where we have the most experience.",
    "priser.faq.q10": "What is the Sunmi terminal and why do I need it?",
    "priser.faq.a10": "Sunmi is an all-in-one terminal with a built-in printer that receives orders from your Amoora system and prints them automatically in the kitchen. Model V2s or V3H is enough. About 3 200 kr one-time — purchased directly from Logiscenter with our negotiated volume pricing.",
    "priser.faq.q11": "What happens if something breaks technically?",
    "priser.faq.a11": "We have remote support via email (System), phone and video (Plus and Pro). The system is built on proven technology (Vercel, Supabase, Stripe) with 99.9% uptime. Serious outages are rare — and when they happen, we prioritize them immediately.",
    "priser.faq.q12": "Can I upgrade or downgrade later?",
    "priser.faq.a12": "Yes. You can upgrade to a higher plan at any time — you pay the difference in the setup cost. Downgrading is also possible at month-end. We want you to have the right plan for your stage.",

    /* Reference case */
    "ref.label": "Reference case",
    "ref.title": "Capri Blue Pizzeria is live on Amoora",
    "ref.body": "Our first customer is already up and running with their own commission-free system — complete with an ordering page, online payments and automatic kitchen receipt printing. See it live.",
    "ref.btn": "See Capri Blue live",

    /* Social proof */
    "proof.eyebrow": "Customers",
    "proof.h2": "Restaurants that trust Amoora",
    "proof.sub": "Restaurants and pizzerias across Sweden now own their own systems.",
    "proof.sample": "Sample",
    "proof.t1": "We save thousands of kronor every month since we switched to Amoora.",
    "proof.t1.name": "Marco B.",
    "proof.t1.role": "Pizzeria owner, Stockholm",
    "proof.t2": "We finally own our customer data and our own system.",
    "proof.t2.name": "Sara L.",
    "proof.t2.role": "Restaurant owner, Gothenburg",
    "proof.t3": "Setup took a week. Now we keep 100% of the revenue.",
    "proof.t3.name": "Ahmed K.",
    "proof.t3.role": "Pizzeria owner, Malmö",

    /* Stats */
    "stats.1.label": "commission",
    "stats.2.label": "saved per year (typical pizzeria)",
    "stats.3.label": "of your direct revenue",
    "stats.4.label": "days to launch",

    /* Final CTA */
    "final.h2": "Ready to own your own system?",
    "final.sub": "Book a free demo and we'll show you how Amoora works for your restaurant.",
    "final.placeholder": "Your email address",
    "final.btn": "Book demo",
    "final.phone": "Or call us directly:",

    /* Footer */
    "footer.tagline": "Own your ordering system. Zero commission.",
    "footer.lynkrr": "A product of Lynkrr AB",
    "footer.product": "Product",
    "footer.resources": "Resources",
    "footer.contactTitle": "Contact",
    "footer.how": "How it works",
    "footer.pricing": "Pricing",
    "footer.demo": "Book demo",
    "footer.blog": "Blog",
    "footer.faq": "FAQ",
    "footer.contact": "Contact",
    "footer.rights": "© 2026 Amoora. All rights reserved.",
    "footer.privacy": "Privacy policy",
    "footer.terms": "Terms"
  }
};

/* In-memory language choice (NOT persisted) */
let currentLang = "sv";

/* --------------------------------------------------------------------------
   2. APPLY TRANSLATIONS
   -------------------------------------------------------------------------- */
function applyTranslations(lang) {
  const dict = I18N[lang] || I18N.sv;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = dict[el.getAttribute("data-i18n")];
    if (val != null) el.textContent = val;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const val = dict[el.getAttribute("data-i18n-html")];
    if (val != null) el.innerHTML = val;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const val = dict[el.getAttribute("data-i18n-placeholder")];
    if (val != null) el.setAttribute("placeholder", val);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const val = dict[el.getAttribute("data-i18n-aria")];
    if (val != null) el.setAttribute("aria-label", val);
  });

  document.documentElement.setAttribute("lang", lang);
}

function setLang(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  applyTranslations(lang);

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const isActive = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  /* Re-render calculators so their dynamic (templated) text follows the language */
  if (typeof window.updateCalculatorMetrics === "function") window.updateCalculatorMetrics();
  if (typeof window.updateSavingsCalculator === "function") window.updateSavingsCalculator();
}

/* --------------------------------------------------------------------------
   3. NAVIGATION — mobile drawer, header scroll, smooth anchors
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const hamburger = document.querySelector(".hamburger");
  const drawer = document.querySelector(".mobile-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  const closeBtn = document.querySelector(".drawer-close");

  const openDrawer = () => {
    drawer && drawer.classList.add("is-open");
    backdrop && backdrop.classList.add("is-open");
    hamburger && hamburger.classList.add("is-open");
    hamburger && hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const closeDrawer = () => {
    drawer && drawer.classList.remove("is-open");
    backdrop && backdrop.classList.remove("is-open");
    hamburger && hamburger.classList.remove("is-open");
    hamburger && hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      drawer && drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
    });
  }
  closeBtn && closeBtn.addEventListener("click", closeDrawer);
  backdrop && backdrop.addEventListener("click", closeDrawer);
  drawer && drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  /* Sticky header shadow / blur on scroll */
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Smooth scroll for same-page anchors */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  });
}

/* --------------------------------------------------------------------------
   4. SCROLL-TRIGGERED FADE-UP
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".fade-up");
  if (!items.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   5. COUNTER ANIMATIONS
   -------------------------------------------------------------------------- */
function formatNumber(n, useSpace) {
  const rounded = Math.round(n);
  return useSpace ? rounded.toLocaleString("sv-SE").replace(/ /g, " ") : String(rounded);
}

function animateCounter(el) {
  const target = parseFloat(el.getAttribute("data-count")) || 0;
  const prefix = el.getAttribute("data-prefix") || "";
  const suffix = el.getAttribute("data-suffix") || "";
  const useSpace = el.getAttribute("data-format") === "space";
  const duration = 1500;
  const start = performance.now();

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    el.textContent = prefix + formatNumber(target * eased, useSpace) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + formatNumber(target, useSpace) + suffix;
  };
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    counters.forEach((el) => {
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      const useSpace = el.getAttribute("data-format") === "space";
      el.textContent = prefix + formatNumber(parseFloat(el.getAttribute("data-count")) || 0, useSpace) + suffix;
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => io.observe(el));
}

function initCopyLinkButtons() {
  document.querySelectorAll(".copy-link-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!navigator.clipboard) return;
      const originalText = I18N[currentLang][btn.getAttribute("data-i18n")] || btn.textContent;
      try {
        await navigator.clipboard.writeText(window.location.href);
        btn.textContent = I18N[currentLang][btn.getAttribute("data-i18n-copied")] || "Kopierat!";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1200);
      } catch (error) {
        console.warn("Copy failed", error);
      }
    });
  });
}

function initCalculator() {
  const ordersInput = document.getElementById("calcOrders");
  const avgInput = document.getElementById("calcAvg");
  const commissionInput = document.getElementById("calcCommission");
  const ordersValue = document.getElementById("calcOrdersValue");
  const avgValue = document.getElementById("calcAvgValue");
  const commissionValue = document.getElementById("calcCommissionValue");
  const yearlyValue = document.getElementById("calcYearlyValue");
  const perLine = document.getElementById("calcPerLine");
  const ticker = document.getElementById("calcTicker");
  const paybackDays = document.getElementById("calcPaybackDays");
  const freedomDate = document.getElementById("calcFreedomDate");
  const ovens = document.getElementById("calcOvens");
  const employees = document.getElementById("calcEmployees");
  const vacations = document.getElementById("calcVacations");
  const barFoodora = document.getElementById("barFoodora");
  const barWolt = document.getElementById("barWolt");
  const barAmoora = document.getElementById("barAmoora");
  const chartFoodoraValue = document.getElementById("chartFoodoraValue");
  const chartWoltValue = document.getElementById("chartWoltValue");
  const chartAmooraValue = document.getElementById("chartAmooraValue");
  const presetButtons = document.querySelectorAll(".calculator-scenario");
  const advancedToggle = document.getElementById("calcAdvancedToggle");
  const advancedPanel = document.getElementById("calcAdvancedPanel");
  const shareForm = document.getElementById("calcShareForm");
  const emailInput = shareForm ? shareForm.querySelector("input[type='email']") : null;
  const toast = document.getElementById("calcToast");
  const amooraFirstYear = 40940;
  const amooraAnnual = 5940;
  let tickerStart = performance.now();
  let tickerInterval = null;

  if (!ordersInput || !avgInput || !commissionInput || !ordersValue || !avgValue || !commissionValue) return;

  const formatCurrency = (value, digits = 0) => {
    const formatted = new Intl.NumberFormat("sv-SE", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })
      .format(value)
      .replace(/\u00A0/g, " ");
    return `${formatted} kr`;
  };

  const getTickerText = (amount) => {
    if (!ticker) return "";
    const key = ticker.getAttribute("data-i18n");
    const template = key ? I18N[currentLang]?.[key] || ticker.textContent : ticker.textContent;
    return template.replace("{amount}", formatCurrency(amount, 0));
  };

  const updateMetrics = () => {
    const orders = parseInt(ordersInput.value, 10) || 0;
    const avg = parseInt(avgInput.value, 10) || 0;
    const commission = parseInt(commissionInput.value, 10) || 0;
    const annualRevenue = orders * avg * 52;
    const foodoraAnnual = Math.round(annualRevenue * (commission / 100));
    const woltAnnual = Math.round(annualRevenue * 0.25);
    const monthly = Math.round(foodoraAnnual / 12);
    const daily = Math.round(foodoraAnnual / 365);
    const minute = Math.max(foodoraAnnual / 525600, 0);
    const payback = daily > 0 ? Math.round(amooraFirstYear / daily) : 0;
    const breakEvenDate = payback > 0 ? new Date(Date.now() + payback * 24 * 60 * 60 * 1000) : null;
    const ovensCount = Math.max(0, Math.round(foodoraAnnual / 28000));
    const employeeCount = Math.max(0, Math.round(foodoraAnnual / 390000));
    const vacationCount = Math.max(0, Math.round(foodoraAnnual / 54000));
    const maxValue = Math.max(foodoraAnnual, woltAnnual, amooraFirstYear);
    const foodoraWidth = maxValue ? Math.round((foodoraAnnual / maxValue) * 100) : 0;
    const woltWidth = maxValue ? Math.round((woltAnnual / maxValue) * 100) : 0;
    const amooraWidth = maxValue ? Math.round((amooraFirstYear / maxValue) * 100) : 0;

    ordersValue.textContent = formatNumber(orders, true);
    avgValue.textContent = `${formatNumber(avg, true)} kr`;
    commissionValue.textContent = String(commission);
    yearlyValue.textContent = formatCurrency(foodoraAnnual, 0);
    perLine.textContent = `Per månad: ${formatCurrency(monthly)} · Per dag: ${formatCurrency(daily)} · Per minut: ${formatCurrency(minute, 1)}`;
    paybackDays.textContent = payback > 0 ? String(payback) : "—";
    freedomDate.textContent = breakEvenDate ? new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" }).format(breakEvenDate) : "—";
    ovens.textContent = String(ovensCount);
    employees.textContent = String(employeeCount);
    vacations.textContent = String(vacationCount);
    chartFoodoraValue.textContent = formatCurrency(foodoraAnnual, 0);
    chartWoltValue.textContent = formatCurrency(woltAnnual, 0);
    chartAmooraValue.textContent = `${formatCurrency(amooraFirstYear, 0)} (år 1) · ${formatCurrency(amooraAnnual, 0)}/år`;

    if (barFoodora) barFoodora.style.width = `${foodoraWidth}%`;
    if (barWolt) barWolt.style.width = `${woltWidth}%`;
    if (barAmoora) barAmoora.style.width = `${amooraWidth}%`;

    if (ticker) ticker.textContent = getTickerText((performance.now() - tickerStart) / 1000 * (foodoraAnnual / 31536000));
  };

  const updateTicker = () => {
    if (!ticker) return;
    const orders = parseInt(ordersInput.value, 10) || 0;
    const avg = parseInt(avgInput.value, 10) || 0;
    const commission = parseInt(commissionInput.value, 10) || 0;
    const annualRevenue = orders * avg * 52;
    const foodoraAnnual = Math.round(annualRevenue * (commission / 100));
    const secondsPerYear = 31536000;
    const elapsedSeconds = (performance.now() - tickerStart) / 1000;
    const liveAmount = Math.round((foodoraAnnual / secondsPerYear) * elapsedSeconds);
    ticker.textContent = getTickerText(liveAmount);
  };

  const setPreset = (preset) => {
    const presets = {
      small: { orders: 50, avg: 130, commission: 30 },
      medium: { orders: 150, avg: 150, commission: 30 },
      large: { orders: 350, avg: 170, commission: 30 },
    };
    if (!presets[preset]) return;
    const values = presets[preset];
    ordersInput.value = values.orders;
    avgInput.value = values.avg;
    commissionInput.value = values.commission;
    presetButtons.forEach((button) => {
      const isSelected = button.getAttribute("data-preset") === preset;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
    updateMetrics();
  };

  presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const preset = button.getAttribute("data-preset");
      if (preset) setPreset(preset);
    });
  });

  [ordersInput, avgInput, commissionInput].forEach((input) => {
    input.addEventListener("input", () => {
      updateMetrics();
    });
  });

  if (advancedToggle && advancedPanel) {
    advancedToggle.addEventListener("click", () => {
      const isOpen = advancedPanel.classList.toggle("is-open");
      advancedToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (shareForm && emailInput && toast) {
    shareForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = emailInput.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.textContent = I18N[currentLang]["calculator.share.error"];
        return;
      }
      toast.textContent = I18N[currentLang]["calculator.share.success"];
      emailInput.value = "";
    });
  }

  window.updateCalculatorMetrics = updateMetrics;
  updateMetrics();
  tickerInterval = setInterval(updateTicker, 1000);
}

/* --------------------------------------------------------------------------
   5b. SAVINGS CALCULATOR (priser.html — single revenue input)
   -------------------------------------------------------------------------- */
function initSavingsCalculator() {
  const range = document.getElementById("foodoraRevenueRange");
  const number = document.getElementById("foodoraRevenueInput");
  const display = document.getElementById("foodoraRevenueDisplay");
  const monthlyEl = document.getElementById("foodoraMonthly");
  const annualEl = document.getElementById("foodoraAnnual");
  const savingsEl = document.getElementById("foodoraSavingsAmount");
  const nextYearEl = document.getElementById("foodoraSavingsNextYear");
  if (!range || !number || !monthlyEl || !annualEl || !savingsEl) return;

  const AMOORA_FIRST_YEAR = 40940;
  const AMOORA_ANNUAL = 5940;
  const COMMISSION = 0.30;
  const min = parseInt(range.min, 10) || 0;
  const max = parseInt(range.max, 10) || 500000;

  const fmt = (value) =>
    new Intl.NumberFormat("sv-SE").format(Math.round(value)).replace(/ /g, " ") + " kr";
  const clamp = (v) => Math.min(Math.max(v, min), max);

  const render = (revenue) => {
    const foodoraMonthly = revenue * COMMISSION;
    const foodoraAnnual = foodoraMonthly * 12;
    const savings = Math.max(0, foodoraAnnual - AMOORA_FIRST_YEAR);
    const nextYearSavings = Math.max(0, foodoraAnnual - AMOORA_ANNUAL);

    if (display) display.textContent = fmt(revenue);
    monthlyEl.textContent = fmt(foodoraMonthly);
    annualEl.textContent = fmt(foodoraAnnual);
    savingsEl.textContent = fmt(savings);
    if (nextYearEl) {
      const template =
        (I18N[currentLang] && I18N[currentLang]["priser.calc.savings.nextYear"]) ||
        nextYearEl.textContent;
      nextYearEl.textContent = template.replace("{amount}", fmt(nextYearSavings));
    }
  };

  range.addEventListener("input", () => {
    const v = clamp(parseInt(range.value, 10) || 0);
    number.value = v;
    render(v);
  });
  number.addEventListener("input", () => {
    const v = clamp(parseInt(number.value, 10) || 0);
    range.value = v;
    render(v);
  });

  window.updateSavingsCalculator = () => render(clamp(parseInt(range.value, 10) || 0));
  render(clamp(parseInt(range.value, 10) || 0));
}

/* --------------------------------------------------------------------------
   6. FINAL CTA FORM (no backend in Part 1)
   -------------------------------------------------------------------------- */
function initCtaForm() {
  const form = document.querySelector(".cta-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("input[type='email']");
    if (email && email.value) {
      window.location.href =
        "kontakt.html?email=" + encodeURIComponent(email.value);
    } else {
      window.location.href = "kontakt.html";
    }
  });
}

function initContactForm() {
  const form = document.querySelector(".contact-booking-form");
  const successPanel = document.getElementById("contactSuccess");
  if (!form) return;

  const submitButton = form.querySelector("button[type='submit']");
  const nameField = form.querySelector("#contactName");
  const restaurantField = form.querySelector("#contactRestaurant");
  const emailField = form.querySelector("#contactEmail");
  const phoneField = form.querySelector("#contactPhone");
  const cityField = form.querySelector("#contactCity");
  const revenueField = form.querySelector("#contactRevenue");
  const planError = form.querySelector("#contactPlanError");
  const privacyField = form.querySelector("#contactPrivacy");

  const requiredFields = [nameField, restaurantField, emailField, cityField, revenueField, privacyField];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(element, message) {
    if (!element) return;
    const errorEl = document.getElementById(element.getAttribute("aria-describedby"));
    if (errorEl) {
      errorEl.textContent = message;
      element.setAttribute("aria-invalid", "true");
      element.classList.add("field-error-state");
    }
  }

  function clearFieldError(element) {
    if (!element) return;
    const errorEl = document.getElementById(element.getAttribute("aria-describedby"));
    if (errorEl) {
      errorEl.textContent = "";
      element.removeAttribute("aria-invalid");
      element.classList.remove("field-error-state");
    }
  }

  function validateField(element) {
    if (!element) return true;
    clearFieldError(element);
    const value = element.value.trim();
    if (!value) {
      setFieldError(element, "Fältet är obligatoriskt.");
      return false;
    }
    if (element === emailField && !emailPattern.test(value)) {
      setFieldError(element, "Ange en giltig e-postadress.");
      return false;
    }
    return true;
  }

  function getSelectedPlan() {
    const selected = form.querySelector("input[name='plan']:checked");
    return selected ? selected.value : "";
  }

  function setPlanError(message) {
    if (!planError) return;
    planError.textContent = message;
  }

  function clearPlanError() {
    if (!planError) return;
    planError.textContent = "";
  }

  function updateSubmitState() {
    const hasAll = requiredFields.every((field) => {
      if (field === privacyField) return privacyField.checked;
      return field.value.trim().length > 0;
    });
    const planSelected = getSelectedPlan().length > 0;
    submitButton.disabled = !(hasAll && planSelected);
  }

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      clearFieldError(field);
      updateSubmitState();
    });
  });

  form.querySelectorAll("input[name='plan']").forEach((radio) => {
    radio.addEventListener("change", () => {
      clearPlanError();
      updateSubmitState();
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    requiredFields.forEach((field) => {
      if (field === privacyField) {
        clearFieldError(field);
        if (!privacyField.checked) {
          setFieldError(field, "Du måste godkänna integritetspolicyn.");
          isValid = false;
        }
        return;
      }
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!getSelectedPlan()) {
      setPlanError("Välj en plan som du är intresserad av.");
      isValid = false;
    }

    if (!isValid) {
      const firstError = form.querySelector(".field-error-state, #contactPlanError:not(:empty)");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const formData = {
      name: nameField.value.trim(),
      restaurant: restaurantField.value.trim(),
      email: emailField.value.trim(),
      phone: phoneField.value.trim(),
      city: cityField.value.trim(),
      revenue: revenueField.value,
      plan: getSelectedPlan(),
      message: form.querySelector("#contactMessage").value.trim(),
      consent: privacyField.checked,
    };

    console.log("Contact form submitted:", formData);
    form.classList.add("is-hidden");
    if (successPanel) {
      successPanel.removeAttribute("hidden");
      successPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  updateSubmitState();
}

/* --------------------------------------------------------------------------
   7. LANGUAGE TOGGLE WIRING
   -------------------------------------------------------------------------- */
function initLangToggle() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });
}

/* --------------------------------------------------------------------------
   8. BOOT
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  setLang(currentLang);
  initLangToggle();
  initNavigation();
  initScrollReveal();
  initCounters();
  initCtaForm();
  initContactForm();
  initCopyLinkButtons();
  initCalculator();
  initSavingsCalculator();
});
