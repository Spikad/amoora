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
    "hero.sub": "Foodora tar provision på varje order — från 15 % och uppåt. Med Amoora äger du systemet och behåller varje krona på dina direktbeställningar.",
    "hero.ctaPrimary": "Boka gratis demo",
    "hero.ctaDemo": "Se live-demo",
    "hero.ctaSecondary": "Se Capri Blue live",
    "hero.trust1": "Engångskostnad",
    "hero.trust2": "Noll provision",
    "hero.trust3": "Klart på 7 dagar",
    "hero.mockTitle": "Beställningar idag",
    "hero.mockOrder": "Ny order",
    "hero.mockItem": "Pizza Margherita",

    /* Problem / Solution */
    "ps.eyebrow": "Jämförelse",
    "ps.h2": "Foodora tar minst 15 %. Amoora tar 0 %.",
    "ps.sub": "Se skillnaden mellan att hyra en plattform och att äga ditt eget system.",
    "ps.foodoraTitle": "Med Foodora",
    "ps.amooraTitle": "Med Amoora",
    "ps.f1": "Från 15 % provision på varje order",
    "ps.f2": "Beroende av plattformen",
    "ps.f3": "Ingen tillgång till kunddata",
    "ps.f4": "Löpande månadskostnader",
    "ps.a1": "0% provision — för alltid",
    "ps.a2": "Ditt eget system",
    "ps.a3": "Äg all din kunddata",
    "ps.a4": "En engångskostnad",
    "ps.stat": "Spara från 15 % på varje order",

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
    "calculator.controls.heading": "Din situation",
    "calculator.controls.hint": "Välj en startpunkt eller dra i reglagen.",
    "calculator.commission.note": "Foodora tar från 15 % och uppåt. Dra reglaget till din nivå.",
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
    "calculator.trust.1": "Räknaren bygger på riktiga marknadssiffror — justerbar provision 13–35 %",
    "calculator.trust.2": "Resultaten är genomsnitt — din situation kan variera",
    "calculator.trust.3": "Boka en demo så gör vi en exakt beräkning för din restaurang",
    "calculator.cta.bottom.h2": "Övertygad? Nästa steg är 20 minuter.",
    "calculator.cta.bottom.p": "Boka demo så går vi igenom resultatet tillsammans och visar systemet live.",
    "calculator.cta.bottom.btn": "Boka demo →",
    "calculator.share.summary": "Provisioner: Foodora {foodora}% · Wolt {wolt}%",

    /* Features — three product surfaces (video cards) */
    "feat.eyebrow": "Funktioner",
    "feat.h2": "Allt din restaurang behöver",
    "feat.sub": "Tre delar, ett system — kundens beställning, din admin-panel och köks-appen på terminalen.",
    "feat.soon": "Video kommer snart",
    "feat.card1.t": "Kundupplevelse & beställning",
    "feat.card1.d": "Kunderna bläddrar i menyn, använder rabattkoder och väljer leverans, ta med eller äta här — och betalar med Klarna, Swish och kort via Stripe.",
    "feat.card2.t": "Admin-panel",
    "feat.card2.d": "Se försäljningsstatistik, ordrar och kunder. Hantera meny, erbjudanden (6 färdiga typer, helt anpassningsbara), omdömen, leveranskostnad och radie, öppettider och kontaktuppgifter.",
    "feat.card3.t": "Köks-app på terminalen",
    "feat.card3.d": "Hantera och acceptera ordrar, markera kökstryck och förseningar och sätt rätter som slut med ett klick. Vid leverans skrivs ett kvitto med QR-kod som föraren skannar för vägbeskrivning i Google Maps.",
    "feat.1.t": "Egen beställningssida",
    "feat.1.d": "Dina kunder beställer direkt från dig — utan mellanhänder och utan provision.",
    "feat.1.note": "Inkl. kökssystem med automatisk kvittoutskrift (SUNMI V3H-terminal).",
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

    /* Live-demo band */
    "demo.eyebrow": "Live-demo",
    "demo.h2": "Se Amoora i verkligheten",
    "demo.sub": "Utforska ett riktigt Amoora-system — meny, beställning och kassa, precis som dina kunder skulle uppleva det.",
    "demo.cta": "Öppna live-demo",

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

    /* Pricing teaser (index) */
    "price.eyebrow": "Priser",
    "price.h2": "Välj din Amoora",
    "price.sub": "Tre planer. Ett system. Noll provision.",
    "price.monthly": "+ 549 kr/mån",
    "price.vat": "exkl. moms",
    "price.popular": "Mest populär",
    "price.basic.name": "Amoora Basic",
    "price.basic.tagline": "Allt du behöver för att lämna Foodora",
    "price.basic.1": "Komplett branded ordersystem",
    "price.basic.2": "SUNMI V3H-terminal ingår",
    "price.basic.3": "Egen domän, hosting & support",
    "price.growth.name": "Amoora Growth",
    "price.growth.tagline": "System + marknadsföring för att växa",
    "price.growth.1": "Allt i Basic",
    "price.growth.2": "Broschyr, QR-skyltar & lanseringskampanj",
    "price.growth.3": "Google-annonser & prioriterad support",
    "price.premium.name": "Amoora Premium",
    "price.premium.tagline": "Hela paketet med innehåll och film",
    "price.premium.1": "Allt i Growth",
    "price.premium.2": "Filmdag + 10 branded reels",
    "price.premium.3": "Content-support & telefonsupport",
    "price.choose": "Boka demo",
    "price.cta": "Se fullständiga priser",
    "price.deposit": "Alla priser exkl. moms. Betalning via Klarna eller Swish. 50% deposition vid signering.",

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
    "contact.form.subtitle": "Fyll i formuläret så hör vi av oss inom 1 arbetsdag med tre föreslagna tider.",
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
    "contact.form.plan.system": "Amoora Basic",
    "contact.form.plan.plus": "Amoora Growth",
    "contact.form.plan.pro": "Amoora Premium",
    "contact.form.plan.unsure": "Vet ej ännu",
    "contact.form.message": "Meddelande",
    "contact.form.messagePlaceholder": "Berätta gärna lite om din restaurang eller vad du är nyfiken på.",
    "contact.form.privacy": "Jag godkänner att Amoora kontaktar mig och behandlar mina uppgifter enligt integritetspolicyn.",
    "contact.form.submit": "Boka demo →",
    "contact.form.successTitle": "Tack! Vi hör av oss inom 1 arbetsdag.",
    "contact.form.successBody": "Vi skickar tre föreslagna tider och en kort bekräftelse till den e-postadress du angav.",
    "contact.form.successButton": "Tillbaka till hem",
    "contact.faq.title": "Vanliga frågor",
    "contact.faq.sub": "Svaren du letar efter finns ofta redan här.",
    "contact.faq.q1": "Är demot verkligen gratis?",
    "contact.faq.a1": "Ja, helt gratis och utan förpliktelser. Vi tar 20 minuter av din tid och visar systemet — du bestämmer själv om det är intressant. Cirka 30% av de vi pratar med blir kunder; 70% säger nej och vi har inga hårda känslor.",
    "contact.faq.q2": "Måste jag förbereda något inför samtalet?",
    "contact.faq.a2": "Nej. Det enda som hjälper är att du har din nuvarande Foodora-omsättning grovt i huvudet — så att vi kan göra en exakt ROI-beräkning för just din restaurang. Det räcker att veta ungefär.",
    "contact.faq.q3": "Vad om jag inte är pizzeria?",
    "contact.faq.a3": "Vi har börjat med pizzerior men systemet fungerar för alla typer av restauranger — sushi, kebab, asiatiskt, fine dining. Boka demo så går vi igenom om Amoora passar dig.",
    "contact.faq.link": "Se alla vanliga frågor →",
    "contact.ready.title": "Eller ring oss direkt",
    "contact.ready.sub": "Föredrar du ett spontant samtal? Slå oss en signal så svarar vi direkt.",
    "contact.ready.call": "Ring +46 10 185 00 01",
    "contact.ready.email": "Mejla info@lynkrr.se",
    "contact.hero.label": "KONTAKT",
    "contact.hero.trust.1": "Inga förpliktelser",
    "contact.hero.trust.2": "Svar inom 1 arbetsdag",
    "contact.hero.trust.3": "Inga säljkonsulter",
    "contact.info.label": "FÖREDRAR DU ATT RING ELLER MEJLA?",
    "contact.card.phone.title": "Telefon",
    "contact.card.phone.detail": "+46 10 185 00 01",
    "contact.card.phone.hours": "Mån–Fre 09–17",
    "contact.card.email.title": "E-post",
    "contact.card.email.detail": "info@lynkrr.se",
    "contact.card.email.response": "Svar inom 1 arbetsdag",
    "contact.card.social.title": "Sociala medier",
    "contact.what.title": "Vad händer efter du bokat?",
    "contact.what.1": "Du får en bekräftelse via e-post med tre föreslagna tider.",
    "contact.what.2": "Vi har ett 20-minuters videosamtal — du visar din nuvarande situation.",
    "contact.what.3": "Vi visar Capri Blue live och hur ditt system skulle se ut.",
    "contact.what.4": "Du får en konkret offert och ROI-beräkning. Inga förpliktelser.",
    "contact.trust.title": "Du är i gott sällskap",
    "contact.trust.company.name": "Lynkrr AB",
    "contact.trust.company.org": "Org.nr 559270-8639",
    "contact.trust.company.tax": "Godkänd för F-skatt och moms",

    /* Så fungerar det */
    "sa_fungerar.hero.eyebrow": "SÅ FUNGERAR DET",
    "sa_fungerar.hero.h1": "Från Foodora-beroende<br><span class=\"hl\">till eget system</span> — på dagar.",
    "sa_fungerar.hero.sub": "Vi sköter all teknik. Du fokuserar på maten. Här är exakt hur vi tar din restaurang från första samtalet till live på nätet — utan att du behöver lyfta ett finger.",
    "sa_fungerar.hero.sub": "Vi sköter all teknik. Du fokuserar på maten. Här är exakt hur vi tar din restaurang från första samtalet till live på nätet — utan att du behöver lyfta ett finger.",
    "sa_fungerar.hero.ctaSecondary": "Se priser",

    "sa_fungerar.promise.1.value": "7",
    "sa_fungerar.promise.1.title": "Dagar",
    "sa_fungerar.promise.1.text": "till din restaurang är live",
    "sa_fungerar.promise.2.value": "0",
    "sa_fungerar.promise.2.title": "Mellanhänder",
    "sa_fungerar.promise.2.text": "mellan dig och kunden",
    "sa_fungerar.promise.3.value": "100%",
    "sa_fungerar.promise.3.title": "Av intäkterna",
    "sa_fungerar.promise.3.text": "är dina att behålla",

    "sa_fungerar.onboarding.eyebrow": "ONBOARDING",
    "sa_fungerar.onboarding.h2": "Från första samtal till live — i 3 steg",
    "sa_fungerar.onboarding.sub": "En genomgång av exakt vad som händer mellan att du skriver på och att din första order trillar in.",
    "sa_fungerar.onboarding.step1.badge": "Du",
    "sa_fungerar.onboarding.step1.title": "Du delar din identitet",
    "sa_fungerar.onboarding.step1.body": "Du ger oss din varumärkesidentitet, din meny och dina önskemål.",
    "sa_fungerar.onboarding.step2.badge": "Vi",
    "sa_fungerar.onboarding.step2.title": "Vi bygger ditt system",
    "sa_fungerar.onboarding.step2.body": "Vi sätter upp ditt system med din meny, dina erbjudanden och dina krav.",
    "sa_fungerar.onboarding.step3.badge": "Vi",
    "sa_fungerar.onboarding.step3.title": "Vi levererar",
    "sa_fungerar.onboarding.step3.body": "Du får terminalen och systemet färdigt och redo för din personal och dina kunder.",
    "sa_fungerar.onboarding.cta.label": "Vill du se en restaurang som redan kört igenom processen?",
    "sa_fungerar.onboarding.cta.link": "Se Capri Blue live",

    "sa_fungerar.features.eyebrow": "VAD DU FÅR",
    "sa_fungerar.features.h2": "Allt som ingår i ditt Amoora-system",
    "sa_fungerar.features.1.title": "Branded beställningssida",
    "sa_fungerar.features.1.body": "Din egen beställningssida med din logotyp, dina färger, din meny och din ton. Inga Foodora-banderoller, inga konkurrenter på samma sida. Bara du och din kund.",
    "sa_fungerar.features.2.title": "Onlinebetalning via Stripe",
    "sa_fungerar.features.2.body": "Kort, Apple Pay, Google Pay — direkt till ditt bankkonto, samma dag. Inga mellanhänder som håller pengarna i 30 dagar. Ingen procentavgift per order utöver Stripes vanliga transaktionsavgift.",
    "sa_fungerar.features.3.title": "Kökssystem med kvittoutskrift",
    "sa_fungerar.features.3.body": "Varje ny order skrivs automatiskt ut på din SUNMI V3H-terminal i köket. Personalen ser ordern, läser av, lagar maten. Precis samma flöde som Foodora — men utan provisionen.",
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
    "sa_fungerar.customer.step3": "Betalar enkelt med Klarna, Swish och kort (även Apple Pay & Google Pay)",
    "sa_fungerar.customer.step4": "Får orderbekräftelse — du får kvittot i köket",
    "sa_fungerar.customer.mockTitle": "Orderbekräftelse",
    "sa_fungerar.customer.mockOrder": "Ny order",
    "sa_fungerar.customer.mockItem": "2× Pizza Margherita",

    "sa_fungerar.viral.h2": "Och varje order blir en säljare",
    "sa_fungerar.viral.body": "Varje orderbekräftelse och varje sidfot bär 'Drivs av Amoora'. Restaurangägare beställer mat hela tiden — och varje gång de ser en proffsig Amoora-upplevelse vill de också ha det. Din kundanskaffning växer av sig själv.",
    "sa_fungerar.viral.link": "Läs mer om tillväxtmotorn →",

    "sa_fungerar.hardware.h3": "Hårdvaran som ingår",
    "sa_fungerar.hardware.body": "SUNMI V3H — en professionell handhållen Android-terminal byggd för restaurang och delivery. 6,75-tums HD+-pekskärm (420 nits) och en kraftfull Qualcomm octa-core-processor med 4 GB RAM och 64 GB lagring. Inbyggd höghastighets-termoskrivare (58 mm) för kvitton, NFC och SoftPOS för kontaktlösa betalningar, QR-betalningar, Wi-Fi, 4G, Bluetooth 5.0, fingeravtrycksläsare och GPS. Bland det senaste inom mobil POS-teknik.",
    "sa_fungerar.hardware.bullet1": "6,75-tums HD+-pekskärm & inbyggd termoskrivare (58 mm)",
    "sa_fungerar.hardware.bullet2": "NFC, SoftPOS & QR-betalningar — kontaktlöst",
    "sa_fungerar.hardware.bullet3": "Wi-Fi, 4G, Bluetooth 5.0, fingeravtrycksläsare & GPS",
    "sa_fungerar.hardware.credit": "Bild från SUNMIs officiella webbplats.",

    "sa_fungerar.support.h3": "Vi finns kvar efter lanseringen",
    "sa_fungerar.support.body": "E-postsupport ingår alltid. Prioriterad support ingår i Growth, och telefonsupport med samma-dag-callback i Premium. Vi tränar din personal, hjälper dig att uppdatera menyer och finns där när du behöver oss.",
    "sa_fungerar.video.soon": "Video kommer snart",
    "sa_fungerar.support.cta": "Se planer & support →",

    "sa_fungerar.faq.eyebrow": "VANLIGA FRÅGOR",
    "sa_fungerar.faq.h2": "Snabba svar",
    "sa_fungerar.faq.q1": "Hur lång tid tar det att komma igång?",
    "sa_fungerar.faq.a1": "Från påskrift till live är det vanligtvis 3–7 dagar, beroende på menyns omfattning och hur snabbt SUNMI V3H-terminalen levereras. Vi gör hela installationen — du fokuserar på maten.",
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
    "priser.hero.klarna": "Dela upp betalningen med Klarna",
    "priser.hero.klarnaNote": "Betala hela beloppet på en gång — eller dela upp det med Klarna. Du väljer. Klarna finns på alla planer.",
    "priser.plans.eyebrow": "VÄLJ DIN PLAN",
    "priser.plans.h2": "Tre tydliga val.",
    "priser.plans.sub": "Inga dolda avgifter. Inga provisioner. Klarna-fakturering tillgänglig på alla planer.",

    "priser.pricing.eyebrow": "Klarna",
    "priser.pricing.h2": "Börja idag, betala över tid med Klarna",
    "priser.pricing.body": "Med Klarna-fakturering kan du dela upp engångskostnaden på 12 eller 24 månader och vara live nästa vecka. Du börjar tjäna in din investering innan du har slutat betala.",
    "priser.pricing.link": "Läs mer om Klarna-fakturering →",

    "priser.cards.monthly": "+ 549 kr/mån",
    "priser.cards.vat": "exkl. moms",
    "priser.cards.basic.tag": "Allt du behöver för att lämna Foodora",
    "priser.cards.basic.price": "24 999 kr",
    "priser.cards.basic.klarna": "Eller fr. 2 083 kr/mån via Klarna 12 mån",
    "priser.cards.basic.include.1": "Komplett branded ordersystem",
    "priser.cards.basic.include.2": "SUNMI V3H-terminal (1 st, färdigkonfigurerad)",
    "priser.cards.basic.include.3": "Egen domän eller subdomän",
    "priser.cards.basic.include.4": "Menyuppläggning",
    "priser.cards.basic.include.5": "E-postbekräftelser till dina kunder",
    "priser.cards.basic.include.6": "Hosting, databas & underhåll",
    "priser.cards.basic.include.7": "E-postsupport inom 24h",
    "priser.cards.basic.include.8": "Korrekt momshantering (6%/12%)",
    "priser.cards.basic.button": "Välj Basic",

    "priser.cards.growth.tag": "System + marknadsföring för att växa",
    "priser.cards.growth.price": "39 999 kr",
    "priser.cards.growth.klarna": "Eller fr. 3 333 kr/mån via Klarna 12 mån",
    "priser.cards.growth.include.1": "Allt i Basic, plus:",
    "priser.cards.growth.include.2": "Broschyr-design (1 A5, tryckfärdig)",
    "priser.cards.growth.include.3": "10 QR-bordsskyltar",
    "priser.cards.growth.include.4": "Lanseringskampanj sociala medier (3 inlägg + 3 stories)",
    "priser.cards.growth.include.5": "Google My Business-optimering",
    "priser.cards.growth.include.6": "Google Ads-setup (1 kampanj; annonsbudget betalas separat till Google)",
    "priser.cards.growth.include.7": "Prioriterad support inom 12h",
    "priser.cards.growth.button": "Välj Growth",

    "priser.cards.premium.tag": "Hela paketet med innehåll och film",
    "priser.cards.premium.price": "64 999 kr",
    "priser.cards.premium.klarna": "Eller fr. 5 417 kr/mån via Klarna 12 mån",
    "priser.cards.premium.include.1": "Allt i Growth, plus:",
    "priser.cards.premium.include.2": "Filmdag på plats (1 dag)",
    "priser.cards.premium.include.3": "10 redigerade branded reels (levereras över 30 dagar)",
    "priser.cards.premium.include.4": "Månadsvis content-support i 3 mån (1 reel/mån)",
    "priser.cards.premium.include.5": "Telefonsupport med samma-dag-callback",
    "priser.cards.premium.button": "Välj Premium",

    "priser.cards.note": "Alla priser är exkl. moms (+25% moms). Engångskostnad för uppsättning + 549 kr/mån för drift, support och uppdateringar. Betalning via Klarna eller Swish. 50% deposition vid signering. Inga provisioner. Inga dolda avgifter.",

    "priser.addons.eyebrow": "TILLVAL",
    "priser.addons.h2": "Lägg till när du behöver",
    "priser.addons.sub": "Engångskostnader där inget annat anges.",
    "priser.addons.1": "Extra SUNMI V3H-terminal",
    "priser.addons.1.price": "3 999 kr",
    "priser.addons.2": "12 månader hosting förbetalt",
    "priser.addons.2.price": "5 490 kr (spara 1 098 kr)",
    "priser.addons.3": "Anpassad integration",
    "priser.addons.3.price": "från 9 999 kr",
    "priser.addons.4": "Menymigrering från befintligt system",
    "priser.addons.4.price": "4 999 kr",
    "priser.addons.5": "Utbildningssession på plats (2h)",
    "priser.addons.5.price": "2 999 kr",

    "priser.help.title": "Inte säker på vilken plan som passar?",
    "priser.help.text": "Boka ett gratis 15-minuters samtal så hjälper vi dig välja.",
    "priser.help.call": "Boka samtal",
    "priser.help.whatsapp": "WhatsApp oss",
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
    "priser.calc.amoora.setup": "Engångskostnad (Growth)",
    "priser.calc.amoora.months": "Månadsavgift",
    "priser.calc.amoora.total": "Totalt år 1",
    "priser.calc.savings.prefix": "Du sparar",
    "priser.calc.savings.suffix": "första året med Amoora",
    "priser.calc.savings.nextYear": "Och varje år därefter sparar du {amount}.",
    "priser.calc.cta": "Boka demo och börja spara →",

    "priser.compare.eyebrow": "JÄMFÖR PLANER",
    "priser.compare.h2": "Vad ingår i varje plan",
    "priser.compare.row.1": "Branded ordersystem",
    "priser.compare.row.2": "Onlinebetalning (Stripe)",
    "priser.compare.row.3": "SUNMI V3H-terminal ingår",
    "priser.compare.row.4": "Leverans, avhämtning, dine-in",
    "priser.compare.row.5": "Hosting, databas & underhåll",
    "priser.compare.row.6": "E-postsupport (24h)",
    "priser.compare.row.7": "Prioriterad support (12h)",
    "priser.compare.row.8": "Broschyr & 10 QR-bordsskyltar",
    "priser.compare.row.9": "Lanseringskampanj sociala medier",
    "priser.compare.row.10": "Google Ads-setup",
    "priser.compare.row.11": "Filmdag + 10 branded reels",
    "priser.compare.row.12": "Månadsvis content-support (3 mån)",
    "priser.compare.row.13": "Telefonsupport, samma-dag-callback",
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

    "priser.notIncluded.h3": "Det här tillkommer",
    "priser.notIncluded.1.title": "Annonsbudget (Growth & Premium)",
    "priser.notIncluded.1.body": "Om du kör Google Ads betalar du annonsbudgeten direkt till Google. Vi sätter upp och optimerar kampanjen — du bestämmer själv hur mycket du vill lägga.",
    "priser.notIncluded.2.title": "Stripes transaktionsavgifter",
    "priser.notIncluded.2.body": "Stripes vanliga avgifter per kortbetalning (cirka 1,5 % + 1,80 kr). Detta är Stripes avgift, inte Amooras — och det är ändå mycket mindre än Foodoras provision (från 15 % och uppåt).",

    "priser.faq.h2": "Allt du vill veta innan du bestämmer dig",
    "priser.faq.q1": "Hur skiljer sig Amoora från Foodora?",
    "priser.faq.a1": "Foodora är en plattform där du listar din restaurang bland tusentals andra och betalar provision på varje order — från 15 % och uppåt. Amoora är ditt eget system — din egen sida, dina egna kunder, ditt eget varumärke — och du betalar noll provision. Du kan köra båda parallellt, men varje order via Amoora är 100 % din intäkt.",
    "priser.faq.q2": "Vad betyder 'engångskostnad'?",
    "priser.faq.a2": "Du betalar uppsättningskostnaden en gång när vi installerar och designar ditt system. Sedan betalar du bara en låg fast månadsavgift för drift och support. Inga dolda kostnader. Ingen procent per order. Klarna-fakturering tillgänglig om du vill dela upp engångskostnaden.",
    "priser.faq.q3": "Vad ingår i månadsavgiften?",
    "priser.faq.a3": "Hosting (vi kör ditt system på Vercel och Supabase — proffsig molninfrastruktur), löpande uppdateringar, säkerhetsuppdateringar, e-postsupport och tillgång till adminpanelen. Du äger systemet — vi sköter underhållet.",
    "priser.faq.q4": "Kan jag använda Klarna för engångskostnaden?",
    "priser.faq.a4": "Ja. Klarna-fakturering är tillgängligt på alla planer — du kan dela upp engångskostnaden på 12 eller 24 månadsbetalningar. Du börjar tjäna in din investering direkt — innan du har slutat betala.",
    "priser.faq.q5": "Vilken plan ska jag välja?",
    "priser.faq.a5": "Basic passar dig som redan har marknadsföring på plats och bara behöver tekniken. Growth passar de flesta — du får marknadsföringsmaterial, QR-skyltar och en lanseringskampanj utöver systemet. Premium passar dig som vill växa snabbt med film och innehåll — vi spelar in och producerar reels specifikt för din restaurang.",
    "priser.faq.q6": "Hur lång tid tar installationen?",
    "priser.faq.a6": "Från påskrift till live: vanligtvis 3–7 dagar. Det beror mest på hur snabbt SUNMI V3H-terminalen levereras och hur omfattande din meny är. Vi gör all teknisk uppsättning — du levererar meny, bilder och logotyp.",
    "priser.faq.q7": "Vad händer om jag vill säga upp?",
    "priser.faq.a7": "Du kan säga upp månadsavgiften med 30 dagars varsel. Din beställningssida stängs ner när uppsägningen träder i kraft. Engångskostnaden avser uppsättningsarbete som utförs specifikt för din restaurang och faktureras vid avtalets ingång.",
    "priser.faq.q8": "Äger jag verkligen mitt system?",
    "priser.faq.a8": "Ja. Din data tillhör dig — kundregister, ordrar, försäljningsstatistik, allt. Vi exporterar din data om du säger upp. Vi använder inte din data för andra ändamål. Du är inte låst till oss på det sätt restauranger är låsta till Foodora.",
    "priser.faq.q9": "Funkar det för icke-pizzerior också?",
    "priser.faq.a9": "Absolut. Amoora är byggt för alla typer av restauranger — pizzerior, sushi, kebab, asiatiskt, fine dining. Vi anpassar menyn och flödet efter din verksamhet. Pizzerior är bara där vi har mest erfarenhet.",
    "priser.faq.q10": "Vad är SUNMI V3H-terminalen och varför behöver jag den?",
    "priser.faq.a10": "SUNMI V3H är en allt-i-ett-terminal med inbyggd kvittoskrivare som tar emot ordrar från ditt Amoora-system och skriver ut dem automatiskt i köket. En terminal ingår, färdigkonfigurerad, i alla planer — vi levererar och hjälper dig komma igång. Behöver du fler terminaler kostar en extra 3 999 kr.",
    "priser.faq.q11": "Vad händer om något krånglar tekniskt?",
    "priser.faq.a11": "Vi har distanssupport via e-post (alla planer), prioriterad support i Growth och telefonsupport med samma-dag-callback i Premium. Systemet bygger på beprövad teknik (Vercel, Supabase, Stripe) som har 99,9 % drifttid. Allvarliga driftstörningar är sällsynta — och när de händer prioriterar vi dem direkt.",
    "priser.faq.q12": "Kan jag uppgradera eller nedgradera senare?",
    "priser.faq.a12": "Ja. Du kan när som helst uppgradera till en högre plan — du betalar mellanskillnaden i engångskostnad. Att nedgradera är också möjligt vid månadsskifte. Vi vill att du har rätt plan för ditt skede.",    "ref.label": "Referenscase",
    "ref.title": "Capri Blue Pizzeria är live på Amoora",
    "ref.body": "Vår första kund är redan igång med sitt egna provisionsfria system — komplett med beställningssida, onlinebetalning och automatisk kvittoutskrift i köket. Se det live.",
    "ref.btn": "Se Capri Blue live",
    "ref.shotSoon": "Skärmdump kommer snart",

    /* Social proof */
    "proof.eyebrow": "Kunder",
    "proof.h2": "Restauranger som litar på Amoora",
    "proof.sub": "Restauranger och pizzerior över hela Sverige äger nu sina egna system.",
    "proof.builtFor": "Byggt för varje typ av restaurang",
    "case.fact1": "Sveriges första Amoora-restaurang",
    "case.fact2": "provision på direktbeställningar",
    "case.fact3.num": "Live",
    "case.fact3": "eget system, online nu",
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
    "loss.eyebrow": "Provisionen",
    "loss.title": "Pengar som rinner rakt till Foodora",
    "loss.example": "Exempel: en pizzeria som säljer 100 000 kr/mån via Foodora",
    "loss.perYear": "förlorad provision per år",
    "loss.since": "Sedan du öppnade den här sidan:",
    "loss.cta": "Räkna på din egen förlust →",
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
    "footer.onboarding": "Onboarding",
    "footer.faq": "Vanliga frågor",
    "footer.contact": "Kontakt",
    "footer.rights": "© 2026 Amoora. Alla rättigheter förbehållna.",
    "footer.privacy": "Integritetspolicy",
    "footer.terms": "Villkor",

    /* Onboarding wizard */
    "onb.hero.eyebrow": "ONBOARDING",
    "onb.hero.h1pre": "Nu bygger vi ",
    "onb.hero.h1hl": "ditt system",
    "onb.hero.sub": "Tack för att du valde Amoora. Vi tar det steg för steg — fyll i det du har just nu, så bygger vårt team ditt eget fristående beställningssystem. Det tar ungefär 10 minuter.",
    "onb.progress": "Steg",
    "onb.progress.of": "av",
    "onb.btn.back": "← Tillbaka",
    "onb.btn.next": "Nästa →",
    "onb.btn.submit": "Skicka in och börja bygga →",
    "onb.invalid": "Fyll i de obligatoriska fälten på den här sidan innan du går vidare.",

    "onb.step1.eyebrow": "Steg 1 · Restaurang",
    "onb.step1.title": "Om din restaurang",
    "onb.step1.sub": "Grunduppgifter om dig och din restaurang.",
    "onb.f.restaurantName": "Restaurangens namn",
    "onb.f.orgNr": "Organisationsnummer",
    "onb.f.contactPerson": "Kontaktperson",
    "onb.f.contactRole": "Roll",
    "onb.f.email": "E-post",
    "onb.f.phone": "Telefon",
    "onb.f.address": "Adress",
    "onb.f.postalCode": "Postnummer",
    "onb.f.city": "Ort",

    "onb.step2.eyebrow": "Steg 2 · Plan",
    "onb.step2.title": "Vald plan och tillval",
    "onb.step2.sub": "Bekräfta vilken plan du valt och kryssa i eventuella tillval.",
    "onb.f.plan": "Vald plan",
    "onb.f.addons": "Tillval (kryssa i det som gäller)",

    "onb.step3.eyebrow": "Steg 3 · Varumärke",
    "onb.step3.title": "Ditt varumärke",
    "onb.step3.sub": "Logotyp, färger och bilder som gör systemet till ditt.",
    "onb.f.logo": "Logotyp",
    "onb.f.logoHint": "En fil. PNG, SVG eller PDF fungerar bäst.",
    "onb.f.useDefaultColors": "Använd Amoora standardfärger",
    "onb.f.brandColor": "Primärfärg",
    "onb.f.brandColorHint": "Ange din färg som HEX-kod, eller använd färgväljaren.",
    "onb.f.photos": "Foton",
    "onb.f.photosHint": "Bilder på rätter, lokal eller miljö. Flera filer tillåtna.",
    "onb.f.brandNotes": "Varumärkesnoteringar",

    "onb.step4.eyebrow": "Steg 4 · Domän & online",
    "onb.step4.title": "Domän och närvaro online",
    "onb.step4.sub": "Var ska ditt system ligga, och var finns du redan idag?",
    "onb.f.domainLegend": "Webbadress för ditt system",
    "onb.f.domainOwn": "Jag har en egen domän",
    "onb.f.domainSub": "Ge mig en adress under amoora.se",
    "onb.f.ownDomain": "Egen domän",
    "onb.f.subDomain": "Önskad adress",
    "onb.f.existingWeb": "Befintlig webbplats",
    "onb.f.instagram": "Instagram",
    "onb.f.facebook": "Facebook",
    "onb.f.tiktok": "TikTok",

    "onb.step5.eyebrow": "Steg 5 · Meny",
    "onb.step5.title": "Din meny",
    "onb.step5.sub": "Länka din befintliga meny eller ladda upp den — välj det som är enklast.",
    "onb.f.menuLink": "Länk till din Foodora-meny",
    "onb.f.menuLinkHint": "Om du redan finns på Foodora kan vi utgå från din meny där.",
    "onb.f.menu": "Eller ladda upp din meny",
    "onb.f.menuHint": "Bilder eller PDF. Flera filer tillåtna.",
    "onb.f.menuNotes": "Noteringar om kategorier & varianter",

    "onb.step6.eyebrow": "Steg 6 · Drift",
    "onb.step6.title": "Öppettider och leverans",
    "onb.step6.sub": "Hur din verksamhet fungerar i praktiken.",
    "onb.f.openingHours": "Öppettider",
    "onb.f.mon": "Måndag",
    "onb.f.tue": "Tisdag",
    "onb.f.wed": "Onsdag",
    "onb.f.thu": "Torsdag",
    "onb.f.fri": "Fredag",
    "onb.f.sat": "Lördag",
    "onb.f.sun": "Söndag",
    "onb.f.serving": "Serveringssätt",
    "onb.f.pickup": "Upphämtning",
    "onb.f.delivery": "Leverans",
    "onb.f.deliveryRadius": "Leveransradie",
    "onb.f.vat": "Momshantering",
    "onb.f.terminalAddress": "Leveransadress för SUNMI V3H-terminal (om annan)",

    "onb.step7.eyebrow": "Steg 7 · Betalning",
    "onb.step7.title": "Betalning och utbetalning",
    "onb.step7.sub": "Hur pengarna kommer in till dig.",
    "onb.f.hasStripe": "Har du ett Stripe-konto?",
    "onb.f.stripeYes": "Ja",
    "onb.f.stripeNo": "Nej",
    "onb.f.stripeSetup": "Ni sätter upp åt mig",
    "onb.f.klarnaLegend": "Klarna",
    "onb.f.klarnaInterest": "Jag är intresserad av Klarna som betalsätt",
    "onb.f.payoutNotes": "Utbetalningsnoteringar",
    "onb.f.other": "Något mer vi bör veta?",

    "onb.step8.eyebrow": "Steg 8 · Granska",
    "onb.step8.title": "Granska och skicka",
    "onb.step8.sub": "Kontrollera dina uppgifter nedan. Vill du ändra något, gå tillbaka.",
    "onb.review.empty": "(ej ifyllt)",
    "onb.review.files": "filer valda",
    "onb.review.file": "fil vald",
    "onb.foot.required": "Fält märkta med * är obligatoriska. Resten kan kompletteras senare.",

    "onb.success.title": "Tack — vi har tagit emot dina uppgifter och börjar bygga ditt system.",
    "onb.success.body": "Vårt team går igenom allt du skickat in och hör av sig inom kort med nästa steg. Du behöver inte göra något mer just nu.",
    "onb.success.back": "Tillbaka till startsidan"
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
    "hero.sub": "Foodora takes commission on every order — from 15% and up. With Amoora you own the system and keep every krona on your direct orders.",
    "hero.ctaPrimary": "Book a free demo",
    "hero.ctaDemo": "See live demo",
    "hero.ctaSecondary": "See Capri Blue live",
    "hero.trust1": "One-time cost",
    "hero.trust2": "Zero commission",
    "hero.trust3": "Ready in 7 days",
    "hero.mockTitle": "Orders today",
    "hero.mockOrder": "New order",
    "hero.mockItem": "Pizza Margherita",

    /* Problem / Solution */
    "ps.eyebrow": "Comparison",
    "ps.h2": "Foodora takes at least 15%. Amoora takes 0%.",
    "ps.sub": "See the difference between renting a platform and owning your own system.",
    "ps.foodoraTitle": "With Foodora",
    "ps.amooraTitle": "With Amoora",
    "ps.f1": "From 15% commission on every order",
    "ps.f2": "Dependent on the platform",
    "ps.f3": "No access to customer data",
    "ps.f4": "Ongoing monthly fees",
    "ps.a1": "0% commission — forever",
    "ps.a2": "Your own system",
    "ps.a3": "Own all your customer data",
    "ps.a4": "One single one-time cost",
    "ps.stat": "Save 15% and up on every order",

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
    "calculator.controls.heading": "Your situation",
    "calculator.controls.hint": "Pick a starting point or drag the sliders.",
    "calculator.commission.note": "Foodora takes 15% and up. Drag the slider to your level.",
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
    "calculator.trust.1": "Calculator based on real market figures — adjustable commission 13–35%",
    "calculator.trust.2": "Results are averages — your situation may vary",
    "calculator.trust.3": "Book a demo and we'll do an exact calculation for your restaurant",
    "calculator.cta.bottom.h2": "Convinced? Next step is 20 minutes.",
    "calculator.cta.bottom.p": "Book a demo and we'll go through the result together and show the system live.",
    "calculator.cta.bottom.btn": "Book demo →",
    "calculator.share.summary": "Commissions: Foodora {foodora}% · Wolt {wolt}%",

    /* Features — three product surfaces (video cards) */
    "feat.eyebrow": "Features",
    "feat.h2": "Everything your restaurant needs",
    "feat.sub": "Three parts, one system — the customer's ordering, your admin panel and the kitchen app on the terminal.",
    "feat.soon": "Video coming soon",
    "feat.card1.t": "Customer experience & ordering",
    "feat.card1.d": "Customers browse the menu, apply discount codes and choose delivery, takeaway or dine-in — paying with Klarna, Swish and card via Stripe.",
    "feat.card2.t": "Admin panel",
    "feat.card2.d": "See sales statistics, orders and customers. Manage your menu, offers (6 ready-made types, fully customisable), reviews, delivery cost and radius, opening hours and contact details.",
    "feat.card3.t": "Kitchen app on the terminal",
    "feat.card3.d": "Manage and accept orders, flag kitchen pressure and delays, and mark dishes as sold out with one click. For delivery, a receipt prints with a QR code the driver scans for directions in Google Maps.",
    "feat.1.t": "Your own ordering page",
    "feat.1.d": "Your customers order directly from you — no middlemen, no commission.",
    "feat.1.note": "Incl. kitchen system with automatic receipt printing (SUNMI V3H terminal).",
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

    /* Live demo band */
    "demo.eyebrow": "Live demo",
    "demo.h2": "See Amoora in action",
    "demo.sub": "Explore a real Amoora system — menu, ordering and checkout, exactly as your customers would experience it.",
    "demo.cta": "Open live demo",

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

    /* Pricing teaser (index) */
    "price.eyebrow": "Pricing",
    "price.h2": "Choose your Amoora",
    "price.sub": "Three plans. One system. Zero commission.",
    "price.monthly": "+ 549 kr/month",
    "price.vat": "excl. VAT",
    "price.popular": "Most popular",
    "price.basic.name": "Amoora Basic",
    "price.basic.tagline": "Everything you need to leave Foodora",
    "price.basic.1": "Complete branded ordering system",
    "price.basic.2": "SUNMI V3H terminal included",
    "price.basic.3": "Own domain, hosting & support",
    "price.growth.name": "Amoora Growth",
    "price.growth.tagline": "System + marketing to grow",
    "price.growth.1": "Everything in Basic",
    "price.growth.2": "Brochure, QR signs & launch campaign",
    "price.growth.3": "Google Ads & priority support",
    "price.premium.name": "Amoora Premium",
    "price.premium.tagline": "The full package with content and film",
    "price.premium.1": "Everything in Growth",
    "price.premium.2": "Film day + 10 branded reels",
    "price.premium.3": "Content support & phone support",
    "price.choose": "Book demo",
    "price.cta": "See full pricing",
    "price.deposit": "All prices excl. VAT. Payment via Klarna or Swish. 50% deposit on signing.",

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
    "contact.form.subtitle": "Fill in the form and we’ll be in touch within 1 business day with three suggested times.",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.email": "Email address",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.phone": "Phone",
    "contact.form.phonePlaceholder": "+46 (0)8 000 00 00",
    "contact.form.restaurant": "Restaurant name",
    "contact.form.restaurantPlaceholder": "Your restaurant",
    "contact.form.city": "City",
    "contact.form.cityPlaceholder": "Stockholm",
    "contact.form.revenue": "Monthly revenue via Foodora",
    "contact.form.revenuePlaceholder": "Select range",
    "contact.form.revenue.help": "Helps us prepare a relevant ROI calculation for the call.",
    "contact.form.plan": "Which plan are you interested in?",
    "contact.form.plan.system": "Amoora Basic",
    "contact.form.plan.plus": "Amoora Growth",
    "contact.form.plan.pro": "Amoora Premium",
    "contact.form.plan.unsure": "Not sure yet",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell us what you'd like to know...",
    "contact.form.privacy": "I agree that Amoora can save my information to respond to my request.",
    "contact.form.submit": "Book demo →",
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
    "contact.ready.sub": "Prefer a spontaneous call? Give us a ring and we'll answer right away.",
    "contact.ready.call": "Call +46 10 185 00 01",
    "contact.ready.email": "Email info@lynkrr.se",
    "contact.form.successTitle": "Thank you! We'll be in touch within 1 business day.",
    "contact.form.successBody": "We will send three suggested times and a short confirmation to the email address you provided.",
    "contact.form.successButton": "Back to home",
    "contact.hero.label": "CONTACT",
    "contact.hero.trust.1": "No obligations",
    "contact.hero.trust.2": "Reply within 1 business day",
    "contact.hero.trust.3": "No sales consultants",
    "contact.info.label": "PREFER TO CALL OR EMAIL?",
    "contact.card.phone.title": "Phone",
    "contact.card.phone.detail": "+46 10 185 00 01",
    "contact.card.phone.hours": "Mon–Fri 09–17",
    "contact.card.email.title": "Email",
    "contact.card.email.detail": "info@lynkrr.se",
    "contact.card.email.response": "Reply within 1 business day",
    "contact.card.social.title": "Social media",
    "contact.what.title": "What happens after you book?",
    "contact.what.1": "You receive confirmation by email with three suggested times.",
    "contact.what.2": "We have a 20-minute video call — you show your current setup.",
    "contact.what.3": "We show Capri Blue live and how your system would look.",
    "contact.what.4": "You receive a concrete offer and ROI calculation. No obligations.",
    "contact.trust.title": "You're in good company",
    "contact.trust.company.name": "Lynkrr AB",
    "contact.trust.company.org": "Reg. no. 559270-8639",
    "contact.trust.company.tax": "Approved for F-tax and VAT",

    /* How it works */
    "sa_fungerar.hero.eyebrow": "HOW IT WORKS",
    "sa_fungerar.hero.h1": "From Foodora dependency to your own system — in days.",
    "sa_fungerar.hero.sub": "We handle all the technology. You focus on the food. Here is exactly how we take your restaurant from first call to live online — without you lifting a finger.",
    "sa_fungerar.hero.ctaSecondary": "See pricing",

    "sa_fungerar.promise.1.value": "7",
    "sa_fungerar.promise.1.title": "Days",
    "sa_fungerar.promise.1.text": "until your restaurant is live",
    "sa_fungerar.promise.2.value": "0",
    "sa_fungerar.promise.2.title": "Middlemen",
    "sa_fungerar.promise.2.text": "between you and the customer",
    "sa_fungerar.promise.3.value": "100%",
    "sa_fungerar.promise.3.title": "Of revenue",
    "sa_fungerar.promise.3.text": "is yours to keep",

    "sa_fungerar.onboarding.eyebrow": "ONBOARDING",
    "sa_fungerar.onboarding.h2": "From first call to live — in 3 steps",
    "sa_fungerar.onboarding.sub": "A walkthrough of exactly what happens between signing and your first order.",
    "sa_fungerar.onboarding.step1.badge": "You",
    "sa_fungerar.onboarding.step1.title": "You share your identity",
    "sa_fungerar.onboarding.step1.body": "You give us your brand identity, your menu and your wishes.",
    "sa_fungerar.onboarding.step2.badge": "We",
    "sa_fungerar.onboarding.step2.title": "We build your system",
    "sa_fungerar.onboarding.step2.body": "We set up your system with your menu, your offers and your requirements.",
    "sa_fungerar.onboarding.step3.badge": "We",
    "sa_fungerar.onboarding.step3.title": "We deliver",
    "sa_fungerar.onboarding.step3.body": "You get the terminal and the system finished and ready for your staff and your customers.",
    "sa_fungerar.onboarding.cta.label": "Want to see a restaurant that has already completed the process?",
    "sa_fungerar.onboarding.cta.link": "See Capri Blue live",

    "sa_fungerar.features.eyebrow": "WHAT YOU GET",
    "sa_fungerar.features.h2": "Everything included in your Amoora system",
    "sa_fungerar.features.1.title": "Branded ordering page",
    "sa_fungerar.features.1.body": "Your own ordering page with your logo, colors, menu and tone. No Foodora banners, no competitors on the same page. Just you and your customer.",
    "sa_fungerar.features.2.title": "Online payments via Stripe",
    "sa_fungerar.features.2.body": "Card, Apple Pay, Google Pay — straight into your account, same day. No middlemen holding the money for 30 days. No percentage fee per order beyond Stripe's standard transaction cost.",
    "sa_fungerar.features.3.title": "Kitchen system with receipt printing",
    "sa_fungerar.features.3.body": "Every new order prints automatically on your SUNMI V3H terminal in the kitchen. Staff see the order, read it, cook it. The exact same flow as Foodora — but without the commission.",
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
    "sa_fungerar.customer.step3": "Pays easily with Klarna, Swish and card (also Apple Pay & Google Pay)",
    "sa_fungerar.customer.step4": "Gets confirmation — you get the receipt in the kitchen",
    "sa_fungerar.customer.mockTitle": "Order confirmation",
    "sa_fungerar.customer.mockOrder": "New order",
    "sa_fungerar.customer.mockItem": "2× Pizza Margherita",

    "sa_fungerar.viral.h2": "And every order becomes a salesperson",
    "sa_fungerar.viral.body": "Every order confirmation and every footer carries 'Powered by Amoora'. Restaurant owners order food all the time — and each time they see a polished Amoora experience, they want the same. Your customer acquisition grows on its own.",
    "sa_fungerar.viral.link": "Learn more about the growth engine →",

    "sa_fungerar.hardware.h3": "The hardware that's included",
    "sa_fungerar.hardware.body": "SUNMI V3H — a professional handheld Android terminal built for restaurant and delivery. A 6.75-inch HD+ touchscreen (420 nits) and a powerful Qualcomm octa-core processor with 4 GB RAM and 64 GB storage. Built-in high-speed thermal printer (58 mm) for receipts, NFC and SoftPOS for contactless payments, QR payments, Wi-Fi, 4G, Bluetooth 5.0, fingerprint reader and GPS. Among the latest in mobile POS technology.",
    "sa_fungerar.hardware.bullet1": "6.75-inch HD+ touchscreen & built-in thermal printer (58 mm)",
    "sa_fungerar.hardware.bullet2": "NFC, SoftPOS & QR payments — contactless",
    "sa_fungerar.hardware.bullet3": "Wi-Fi, 4G, Bluetooth 5.0, fingerprint reader & GPS",
    "sa_fungerar.hardware.credit": "Image from SUNMI's official website.",

    "sa_fungerar.support.h3": "We stay after launch",
    "sa_fungerar.support.body": "Email support is always included. Priority support is included in Growth, and phone support with same-day callback in Premium. We train your staff, help you update menus and are there when you need us.",
    "sa_fungerar.video.soon": "Video coming soon",
    "sa_fungerar.support.cta": "See plans & support →",

    "sa_fungerar.faq.eyebrow": "FREQUENT QUESTIONS",
    "sa_fungerar.faq.h2": "Quick answers",
    "sa_fungerar.faq.q1": "How long does it take to get started?",
    "sa_fungerar.faq.a1": "From signing to live is usually 3–7 days, depending on menu size and how quickly the SUNMI V3H terminal arrives. We do all the technical setup — you focus on the food.",
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
    "priser.hero.klarna": "Split your payment with Klarna",
    "priser.hero.klarnaNote": "Pay the full amount at once — or split it with Klarna. Your choice. Klarna is available on all plans.",
    "priser.plans.eyebrow": "CHOOSE YOUR PLAN",
    "priser.plans.h2": "Three clear choices.",
    "priser.plans.sub": "No hidden fees. No commissions. Klarna invoicing available on all plans.",

    "priser.pricing.eyebrow": "Klarna",
    "priser.pricing.h2": "Start today, pay overtime with Klarna",
    "priser.pricing.body": "With Klarna invoicing you can spread the one-time cost over 12 or 24 months and be live next week. You start earning back your investment before you’re finished paying.",
    "priser.pricing.link": "Learn more about Klarna billing →",

    "priser.cards.monthly": "+ 549 kr/month",
    "priser.cards.vat": "excl. VAT",
    "priser.cards.basic.tag": "Everything you need to leave Foodora",
    "priser.cards.basic.price": "24 999 kr",
    "priser.cards.basic.klarna": "Or from 2 083 kr/month with Klarna 12 months",
    "priser.cards.basic.include.1": "Complete branded ordering system",
    "priser.cards.basic.include.2": "SUNMI V3H terminal (1 unit, preconfigured)",
    "priser.cards.basic.include.3": "Your own domain or subdomain",
    "priser.cards.basic.include.4": "Menu setup",
    "priser.cards.basic.include.5": "Email confirmations to your customers",
    "priser.cards.basic.include.6": "Hosting, database & maintenance",
    "priser.cards.basic.include.7": "Email support within 24h",
    "priser.cards.basic.include.8": "Correct VAT handling (6%/12%)",
    "priser.cards.basic.button": "Choose Basic",

    "priser.cards.growth.tag": "System + marketing to grow",
    "priser.cards.growth.price": "39 999 kr",
    "priser.cards.growth.klarna": "Or from 3 333 kr/month with Klarna 12 months",
    "priser.cards.growth.include.1": "Everything in Basic, plus:",
    "priser.cards.growth.include.2": "Brochure design (1 A5, print-ready)",
    "priser.cards.growth.include.3": "10 QR table signs",
    "priser.cards.growth.include.4": "Social media launch campaign (3 posts + 3 stories)",
    "priser.cards.growth.include.5": "Google My Business optimization",
    "priser.cards.growth.include.6": "Google Ads setup (1 campaign; ad budget paid separately to Google)",
    "priser.cards.growth.include.7": "Priority support within 12h",
    "priser.cards.growth.button": "Choose Growth",

    "priser.cards.premium.tag": "The full package with content and film",
    "priser.cards.premium.price": "64 999 kr",
    "priser.cards.premium.klarna": "Or from 5 417 kr/month with Klarna 12 months",
    "priser.cards.premium.include.1": "Everything in Growth, plus:",
    "priser.cards.premium.include.2": "On-site film day (1 day)",
    "priser.cards.premium.include.3": "10 edited branded reels (delivered over 30 days)",
    "priser.cards.premium.include.4": "Monthly content support for 3 months (1 reel/month)",
    "priser.cards.premium.include.5": "Phone support with same-day callback",
    "priser.cards.premium.button": "Choose Premium",

    "priser.cards.note": "All prices excl. VAT (+25% VAT). One-time setup cost + 549 kr/month for hosting, support and updates. Payment via Klarna or Swish. 50% deposit on signing. No commissions. No hidden fees.",

    "priser.addons.eyebrow": "ADD-ONS",
    "priser.addons.h2": "Add what you need",
    "priser.addons.sub": "One-time costs unless otherwise stated.",
    "priser.addons.1": "Extra SUNMI V3H terminal",
    "priser.addons.1.price": "3 999 kr",
    "priser.addons.2": "12 months hosting prepaid",
    "priser.addons.2.price": "5 490 kr (save 1 098 kr)",
    "priser.addons.3": "Custom integration",
    "priser.addons.3.price": "from 9 999 kr",
    "priser.addons.4": "Menu migration from existing system",
    "priser.addons.4.price": "4 999 kr",
    "priser.addons.5": "On-site training session (2h)",
    "priser.addons.5.price": "2 999 kr",

    "priser.help.title": "Not sure which plan fits?",
    "priser.help.text": "Book a free 15-minute call and we'll help you choose.",
    "priser.help.call": "Book a call",
    "priser.help.whatsapp": "WhatsApp us",
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
    "priser.calc.amoora.setup": "One-time cost (Growth)",
    "priser.calc.amoora.months": "Monthly fee",
    "priser.calc.amoora.total": "Total year 1",
    "priser.calc.savings.prefix": "You save",
    "priser.calc.savings.suffix": "in the first year with Amoora",
    "priser.calc.savings.nextYear": "And each year after that you save {amount}.",
    "priser.calc.cta": "Book a demo and start saving →",

    "priser.compare.eyebrow": "COMPARE PLANS",
    "priser.compare.h2": "What is included in each plan",
    "priser.compare.row.1": "Branded ordering system",
    "priser.compare.row.2": "Online payments (Stripe)",
    "priser.compare.row.3": "SUNMI V3H terminal included",
    "priser.compare.row.4": "Delivery, pickup, dine-in",
    "priser.compare.row.5": "Hosting, database & maintenance",
    "priser.compare.row.6": "Email support (24h)",
    "priser.compare.row.7": "Priority support (12h)",
    "priser.compare.row.8": "Brochure & 10 QR table signs",
    "priser.compare.row.9": "Social media launch campaign",
    "priser.compare.row.10": "Google Ads setup",
    "priser.compare.row.11": "Film day + 10 branded reels",
    "priser.compare.row.12": "Monthly content support (3 mo)",
    "priser.compare.row.13": "Phone support, same-day callback",
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

    "priser.notIncluded.h3": "What's added on top",
    "priser.notIncluded.1.title": "Ad budget (Growth & Premium)",
    "priser.notIncluded.1.body": "If you run Google Ads, you pay the ad budget directly to Google. We set up and optimize the campaign — you decide how much to spend.",
    "priser.notIncluded.2.title": "Stripe transaction fees",
    "priser.notIncluded.2.body": "Stripe's standard fees per card payment (about 1.5% + 1.80 kr). This is Stripe's fee, not Amoora's — and it is still much lower than Foodora's commission (from 15% and up).",

    "priser.faq.h2": "Everything you want to know before deciding",
    "priser.faq.q1": "How is Amoora different from Foodora?",
    "priser.faq.a1": "Foodora is a platform where you list your restaurant among thousands of others and pay commission on every order — from 15% and up. Amoora is your own system — your own page, your own customers, your own brand — and you pay zero commission. You can run both in parallel, but every order via Amoora is 100% yours.",
    "priser.faq.q2": "What does 'one-time cost' mean?",
    "priser.faq.a2": "You pay the setup cost once when we install and design your system. After that, you only pay a low fixed monthly fee for hosting and support. No hidden costs. No percentage per order. Klarna invoicing is available if you want to split the one-time cost.",
    "priser.faq.q3": "What is included in the monthly fee?",
    "priser.faq.a3": "Hosting (we run your system on Vercel and Supabase — professional cloud infrastructure), ongoing updates, security maintenance, email support and access to the admin panel. You own the system — we take care of maintenance.",
    "priser.faq.q4": "Can I use Klarna for the one-time cost?",
    "priser.faq.a4": "Yes. Klarna invoicing is available on all plans — you can split the setup cost over 12 or 24 monthly payments. You start earning back your investment right away — before you finish paying.",
    "priser.faq.q5": "Which plan should I choose?",
    "priser.faq.a5": "Basic is for restaurants that already have marketing in place and just need the technology. Growth fits most — you get marketing materials, QR signs and a launch campaign on top of the system. Premium is for those who want to grow fast with film and content — we shoot and produce reels specifically for your restaurant.",
    "priser.faq.q6": "How long does installation take?",
    "priser.faq.a6": "From signing to live: usually 3–7 days. It depends mostly on how quickly the SUNMI V3H terminal is delivered and how extensive your menu is. We do all technical setup — you provide the menu, images and logo.",
    "priser.faq.q7": "What happens if I want to cancel?",
    "priser.faq.a7": "You can cancel the monthly fee with 30 days notice. Your ordering page is turned off when cancellation takes effect. The one-time setup cost covers work performed specifically for your restaurant and is invoiced when the agreement is entered into.",
    "priser.faq.q8": "Do I really own my system?",
    "priser.faq.a8": "Yes. Your data belongs to you — customer records, orders, sales statistics, everything. We export your data if you cancel. We do not use your data for other purposes. You are not locked in the way restaurants are locked into Foodora.",
    "priser.faq.q9": "Does it work for non-pizzerias too?",
    "priser.faq.a9": "Absolutely. Amoora is built for all types of restaurants — pizzerias, sushi, kebab, Asian, fine dining. We adapt the menu and flow to your business. Pizzerias are just where we have the most experience.",
    "priser.faq.q10": "What is the SUNMI V3H terminal and why do I need it?",
    "priser.faq.a10": "The SUNMI V3H is an all-in-one terminal with a built-in printer that receives orders from your Amoora system and prints them automatically in the kitchen. One terminal is included, preconfigured, in every plan — we deliver it and help you get started. Need more terminals? An extra one is 3 999 kr.",
    "priser.faq.q11": "What happens if something breaks technically?",
    "priser.faq.a11": "We have remote support via email (all plans), priority support in Growth and phone support with same-day callback in Premium. The system is built on proven technology (Vercel, Supabase, Stripe) with 99.9% uptime. Serious outages are rare — and when they happen, we prioritize them immediately.",
    "priser.faq.q12": "Can I upgrade or downgrade later?",
    "priser.faq.a12": "Yes. You can upgrade to a higher plan at any time — you pay the difference in the setup cost. Downgrading is also possible at month-end. We want you to have the right plan for your stage.",

    /* Reference case */
    "ref.label": "Reference case",
    "ref.title": "Capri Blue Pizzeria is live on Amoora",
    "ref.body": "Our first customer is already up and running with their own commission-free system — complete with an ordering page, online payments and automatic kitchen receipt printing. See it live.",
    "ref.btn": "See Capri Blue live",
    "ref.shotSoon": "Screenshot coming soon",

    /* Social proof */
    "proof.eyebrow": "Customers",
    "proof.h2": "Restaurants that trust Amoora",
    "proof.sub": "Restaurants and pizzerias across Sweden now own their own systems.",
    "proof.builtFor": "Built for every kind of restaurant",
    "case.fact1": "Sweden's first Amoora restaurant",
    "case.fact2": "commission on direct orders",
    "case.fact3.num": "Live",
    "case.fact3": "own system, online now",
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
    "loss.eyebrow": "The commission",
    "loss.title": "Money flowing straight to Foodora",
    "loss.example": "Example: a pizzeria selling 100,000 kr/month via Foodora",
    "loss.perYear": "lost to commission per year",
    "loss.since": "Since you opened this page:",
    "loss.cta": "Calculate your own loss →",
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
    "footer.onboarding": "Onboarding",
    "footer.faq": "FAQ",
    "footer.contact": "Contact",
    "footer.rights": "© 2026 Amoora. All rights reserved.",
    "footer.privacy": "Privacy policy",
    "footer.terms": "Terms",

    /* Onboarding wizard */
    "onb.hero.eyebrow": "ONBOARDING",
    "onb.hero.h1pre": "Now we build ",
    "onb.hero.h1hl": "your system",
    "onb.hero.sub": "Thank you for choosing Amoora. We'll take it step by step — fill in what you have right now, and our team will build your own standalone ordering system. It takes about 10 minutes.",
    "onb.progress": "Step",
    "onb.progress.of": "of",
    "onb.btn.back": "← Back",
    "onb.btn.next": "Next →",
    "onb.btn.submit": "Submit and start building →",
    "onb.invalid": "Please fill in the required fields on this page before continuing.",

    "onb.step1.eyebrow": "Step 1 · Restaurant",
    "onb.step1.title": "About your restaurant",
    "onb.step1.sub": "Basic details about you and your restaurant.",
    "onb.f.restaurantName": "Restaurant name",
    "onb.f.orgNr": "Company registration number",
    "onb.f.contactPerson": "Contact person",
    "onb.f.contactRole": "Role",
    "onb.f.email": "Email",
    "onb.f.phone": "Phone",
    "onb.f.address": "Address",
    "onb.f.postalCode": "Postal code",
    "onb.f.city": "City",

    "onb.step2.eyebrow": "Step 2 · Plan",
    "onb.step2.title": "Selected plan and add-ons",
    "onb.step2.sub": "Confirm the plan you chose and tick any add-ons.",
    "onb.f.plan": "Selected plan",
    "onb.f.addons": "Add-ons (tick what applies)",

    "onb.step3.eyebrow": "Step 3 · Brand",
    "onb.step3.title": "Your brand",
    "onb.step3.sub": "Logo, colours and images that make the system yours.",
    "onb.f.logo": "Logo",
    "onb.f.logoHint": "One file. PNG, SVG or PDF works best.",
    "onb.f.useDefaultColors": "Use Amoora default colours",
    "onb.f.brandColor": "Primary colour",
    "onb.f.brandColorHint": "Enter your colour as a HEX code, or use the colour picker.",
    "onb.f.photos": "Photos",
    "onb.f.photosHint": "Images of dishes, venue or atmosphere. Multiple files allowed.",
    "onb.f.brandNotes": "Brand notes",

    "onb.step4.eyebrow": "Step 4 · Domain & online",
    "onb.step4.title": "Domain and online presence",
    "onb.step4.sub": "Where should your system live, and where are you already today?",
    "onb.f.domainLegend": "Web address for your system",
    "onb.f.domainOwn": "I have my own domain",
    "onb.f.domainSub": "Give me an address under amoora.se",
    "onb.f.ownDomain": "Own domain",
    "onb.f.subDomain": "Desired address",
    "onb.f.existingWeb": "Existing website",
    "onb.f.instagram": "Instagram",
    "onb.f.facebook": "Facebook",
    "onb.f.tiktok": "TikTok",

    "onb.step5.eyebrow": "Step 5 · Menu",
    "onb.step5.title": "Your menu",
    "onb.step5.sub": "Link your existing menu or upload it — whichever is easiest.",
    "onb.f.menuLink": "Link to your Foodora menu",
    "onb.f.menuLinkHint": "If you're already on Foodora we can start from your menu there.",
    "onb.f.menu": "Or upload your menu",
    "onb.f.menuHint": "Images or PDF. Multiple files allowed.",
    "onb.f.menuNotes": "Notes on categories & variants",

    "onb.step6.eyebrow": "Step 6 · Operations",
    "onb.step6.title": "Opening hours and delivery",
    "onb.step6.sub": "How your business works in practice.",
    "onb.f.openingHours": "Opening hours",
    "onb.f.mon": "Monday",
    "onb.f.tue": "Tuesday",
    "onb.f.wed": "Wednesday",
    "onb.f.thu": "Thursday",
    "onb.f.fri": "Friday",
    "onb.f.sat": "Saturday",
    "onb.f.sun": "Sunday",
    "onb.f.serving": "Service options",
    "onb.f.pickup": "Pickup",
    "onb.f.delivery": "Delivery",
    "onb.f.deliveryRadius": "Delivery radius",
    "onb.f.vat": "VAT handling",
    "onb.f.terminalAddress": "Delivery address for SUNMI V3H terminal (if different)",

    "onb.step7.eyebrow": "Step 7 · Payment",
    "onb.step7.title": "Payment and payout",
    "onb.step7.sub": "How the money reaches you.",
    "onb.f.hasStripe": "Do you have a Stripe account?",
    "onb.f.stripeYes": "Yes",
    "onb.f.stripeNo": "No",
    "onb.f.stripeSetup": "You set it up for me",
    "onb.f.klarnaLegend": "Klarna",
    "onb.f.klarnaInterest": "I'm interested in Klarna as a payment method",
    "onb.f.payoutNotes": "Payout notes",
    "onb.f.other": "Anything else we should know?",

    "onb.step8.eyebrow": "Step 8 · Review",
    "onb.step8.title": "Review and submit",
    "onb.step8.sub": "Check your details below. If you want to change something, go back.",
    "onb.review.empty": "(not filled in)",
    "onb.review.files": "files selected",
    "onb.review.file": "file selected",
    "onb.foot.required": "Fields marked with * are required. The rest can be added later.",

    "onb.success.title": "Thank you — we've received your details and are starting to build your system.",
    "onb.success.body": "Our team reviews everything you submitted and will be in touch shortly with the next steps. You don't need to do anything more right now.",
    "onb.success.back": "Back to the homepage"
  }
};

/* Language choice — persisted in localStorage so it survives MPA navigation. */
function getStoredLang() {
  try {
    const v = localStorage.getItem("amoora_lang");
    if (v === "sv" || v === "en") return v;
  } catch (e) { /* storage blocked — fall back to default */ }
  return "sv";
}
let currentLang = getStoredLang();

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
  try { localStorage.setItem("amoora_lang", lang); } catch (e) { /* storage blocked */ }
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
  const vacations = document.getElementById("calcVacations");
  const barFoodora = document.getElementById("barFoodora");
  const barWolt = document.getElementById("barWolt");
  const barAmoora = document.getElementById("barAmoora");
  const chartFoodoraValue = document.getElementById("chartFoodoraValue");
  const chartWoltValue = document.getElementById("chartWoltValue");
  const chartAmooraValue = document.getElementById("chartAmooraValue");
  const chartFoodoraLabel = document.getElementById("chartFoodoraLabel");
  const chartWoltLabel = document.getElementById("chartWoltLabel");
  const presetButtons = document.querySelectorAll(".calculator-scenario");
  const advancedToggle = document.getElementById("calcAdvancedToggle");
  const advancedPanel = document.getElementById("calcAdvancedPanel");
  const amooraFirstYear = 46587; // Growth setup 39 999 + 12 × 549 kr/mån
  const amooraAnnual = 6588;     // 12 × 549 kr/mån
  const WOLT_PCT = 15;           // Wolt comparison commission (fixed reference)
  const COMMISSION_MIN = 13;     // slider bounds (kept in sync with raknare.html)
  const COMMISSION_MAX = 35;
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

  // Fill an i18n "{pct}"-templated chart label with a concrete percentage.
  const setChartLabel = (el, key, pct) => {
    if (!el) return;
    const tpl = I18N[currentLang]?.[key] || el.textContent || "";
    el.textContent = tpl.replace("{pct}", String(pct));
  };

  const updateMetrics = () => {
    const orders = parseInt(ordersInput.value, 10) || 0;
    const avg = parseInt(avgInput.value, 10) || 0;
    // Clamp commission to the supported 13–35% band so the math can't run on
    // an out-of-range value (e.g. a stale URL/preset or manual input).
    const commission = Math.min(
      COMMISSION_MAX,
      Math.max(COMMISSION_MIN, parseInt(commissionInput.value, 10) || COMMISSION_MIN)
    );

    // Annual platform commission = weekly orders × avg order value × 52 weeks × rate.
    const annualRevenue = orders * avg * 52;
    const foodoraAnnual = Math.round(annualRevenue * (commission / 100));
    const woltAnnual = Math.round(annualRevenue * (WOLT_PCT / 100));
    const monthly = Math.round(foodoraAnnual / 12);
    const daily = Math.round(foodoraAnnual / 365);
    const minute = Math.max(foodoraAnnual / 525600, 0);
    const payback = daily > 0 ? Math.round(amooraFirstYear / daily) : 0;
    const breakEvenDate = payback > 0 ? new Date(Date.now() + payback * 24 * 60 * 60 * 1000) : null;
    const ovensCount = Math.max(0, Math.round(foodoraAnnual / 28000));
    const vacationCount = Math.max(0, Math.round(foodoraAnnual / 54000));
    const maxValue = Math.max(foodoraAnnual, woltAnnual, amooraFirstYear);
    const foodoraWidth = maxValue ? Math.round((foodoraAnnual / maxValue) * 100) : 0;
    const woltWidth = maxValue ? Math.round((woltAnnual / maxValue) * 100) : 0;
    const amooraWidth = maxValue ? Math.round((amooraFirstYear / maxValue) * 100) : 0;

    ordersValue.textContent = formatNumber(orders, true);
    avgValue.textContent = `${formatNumber(avg, true)} kr`;
    commissionValue.textContent = String(commission);
    // Keep the slider's value + ARIA state consistent with the clamped number.
    if (parseInt(commissionInput.value, 10) !== commission) commissionInput.value = String(commission);
    commissionInput.setAttribute("aria-valuenow", String(commission));
    ordersInput.setAttribute("aria-valuenow", String(orders));
    avgInput.setAttribute("aria-valuenow", String(avg));

    yearlyValue.textContent = formatCurrency(foodoraAnnual, 0);
    perLine.textContent = `Per månad: ${formatCurrency(monthly)} · Per dag: ${formatCurrency(daily)} · Per minut: ${formatCurrency(minute, 1)}`;
    paybackDays.textContent = payback > 0 ? String(payback) : "—";
    freedomDate.textContent = breakEvenDate ? new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long", year: "numeric" }).format(breakEvenDate) : "—";
    ovens.textContent = String(ovensCount);
    vacations.textContent = String(vacationCount);

    // Chart labels follow the actual commissions (Foodora = slider, Wolt = fixed).
    setChartLabel(chartFoodoraLabel, "calculator.chart.foodora", commission);
    setChartLabel(chartWoltLabel, "calculator.chart.wolt", WOLT_PCT);
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
      small: { orders: 50, avg: 130, commission: 15 },
      medium: { orders: 150, avg: 150, commission: 15 },
      large: { orders: 350, avg: 170, commission: 15 },
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

  const AMOORA_FIRST_YEAR = 46587; // Growth setup 39 999 + 12 × 549 kr/mån
  const AMOORA_ANNUAL = 6588;      // 12 × 549 kr/mån
  const COMMISSION = 0.15; // Foodora baseline — "från 15 %"
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
   6. LEAD SUBMISSION — shared helper hitting the notify-lead Edge Function.
   Used by the contact form, the email-capture CTAs and the calculator.
   Exposed as window.AmooraLead so page-level inline scripts can reuse it.
   -------------------------------------------------------------------------- */
async function submitLead(payload) {
  const cfg = window.AMOORA_CONFIG || {};
  if (!cfg.FUNCTIONS_BASE || !cfg.SUPABASE_ANON_KEY) {
    console.warn("AMOORA_CONFIG missing — cannot submit lead");
    return { ok: false, error: "config_missing" };
  }
  try {
    const res = await fetch(cfg.FUNCTIONS_BASE + "/notify-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + cfg.SUPABASE_ANON_KEY,
        "apikey": cfg.SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return res.ok ? { ok: true, ...data } : { ok: false, ...data };
  } catch (err) {
    console.error("submitLead failed", err);
    return { ok: false, error: "network" };
  }
}
window.AmooraLead = submitLead;

/* Final CTA email-capture form (index + sa-fungerar). Records an `email_cta`
   lead, then continues to the contact page so the visitor can finish booking. */
function initCtaForm() {
  const form = document.querySelector(".cta-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailEl = form.querySelector("input[type='email']");
    const email = emailEl && emailEl.value.trim();
    const go = () => {
      window.location.href = email
        ? "kontakt.html?email=" + encodeURIComponent(email)
        : "kontakt.html";
    };
    if (email) {
      // Fire-and-forget: record the lead, then navigate regardless.
      submitLead({ source: "email_cta", email }).finally(go);
    } else {
      go();
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

/* Point every [data-capri-blue] link at the live Capri Blue URL from config.
   Falls back to the contact page until CAPRI_BLUE_URL is set in site-config.js. */
function initCapriLinks() {
  const url = (window.AMOORA_CONFIG && window.AMOORA_CONFIG.CAPRI_BLUE_URL) || "";
  document.querySelectorAll("[data-capri-blue]").forEach((a) => {
    if (url) {
      a.setAttribute("href", url);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    } else {
      a.setAttribute("href", "kontakt.html");
    }
  });
}

/* Inject the Capri Blue homepage screenshot from config into the reference
   card. While CAPRI_BLUE_SCREENSHOT is empty, the branded placeholder stays. */
function initCapriScreenshot() {
  const url = (window.AMOORA_CONFIG && window.AMOORA_CONFIG.CAPRI_BLUE_SCREENSHOT) || "";
  if (!url) return;
  document.querySelectorAll("[data-capri-shot]").forEach((wrap) => {
    const img = wrap.querySelector("img");
    if (!img) return;
    img.src = url;
    wrap.classList.add("has-shot");
  });
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
   7b. LOSS TICKER — live "lost to Foodora since you landed" counter (homepage)
   Rate derived from the same example as the hero: 100 000 kr/mån × 15 % × 12
   = 180 000 kr/year commission.
   No-ops on pages without #lossSince; respects prefers-reduced-motion.
   -------------------------------------------------------------------------- */
function initLossTicker() {
  const el = document.getElementById("lossSince");
  if (!el) return;

  const perYear = parseFloat(el.getAttribute("data-loss-year")) || 180000;
  const perSecond = perYear / (365 * 24 * 60 * 60);
  const fmt = (n) =>
    n.toLocaleString("sv-SE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kr";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("requestAnimationFrame" in window)) {
    el.textContent = fmt(0);
    return;
  }

  const start = performance.now();
  const tick = (now) => {
    el.textContent = fmt(((now - start) / 1000) * perSecond);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* --------------------------------------------------------------------------
   7c. HOMEPAGE VIDEO — hero background + the three product-surface cards.
   Driven entirely by AMOORA_CONFIG (HERO_VIDEO_URL + CARD_VIDEOS). Until a
   URL is set we keep the branded gradient/poster fallback — never a broken
   player. Autoplay is suppressed under prefers-reduced-motion.
   -------------------------------------------------------------------------- */
function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function attachVideo(video, url) {
  // Wire a config URL onto a <video>, play it, and flag the wrapper. Returns
  // true when a source was attached so callers can hide their placeholder.
  if (!video || !url) return false;
  const source = document.createElement("source");
  source.src = url;
  video.appendChild(source);
  video.load();
  if (!prefersReducedMotion()) {
    const play = () => { const p = video.play(); if (p && p.catch) p.catch(() => {}); };
    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });
  }
  return true;
}

function initHeroVideo() {
  const video = document.getElementById("heroVideo");
  if (!video) return;
  const url = (window.AMOORA_CONFIG && window.AMOORA_CONFIG.HERO_VIDEO_URL) || "";
  if (attachVideo(video, url)) {
    const hero = video.closest(".hero");
    if (hero) hero.classList.add("has-video");
  } else {
    // No URL yet — drop the empty element so no browser renders a broken
    // player. The .hero-media gradient (+ optional poster) carries the look.
    video.remove();
  }
}

function initCardVideos() {
  const map = (window.AMOORA_CONFIG && window.AMOORA_CONFIG.CARD_VIDEOS) || {};
  document.querySelectorAll("[data-card-video]").forEach((wrap) => {
    const key = wrap.getAttribute("data-card-video");
    const video = wrap.querySelector("video");
    if (attachVideo(video, map[key])) {
      video.controls = true; // let visitors play/pause + unmute the demo
      wrap.classList.add("has-video");
    }
    // else: keep the poster + "Video kommer snart" badge.
  });
}

/* --------------------------------------------------------------------------
   8. BOOT
   -------------------------------------------------------------------------- */
/* Expose the dictionary + helpers so inline page scripts (e.g. the onboarding
   wizard) can read the active-language strings and re-translate injected DOM. */
window.I18N = I18N;
window.applyTranslations = applyTranslations;
window.setLang = setLang;

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
  initCapriLinks();
  initCapriScreenshot();
  initLossTicker();
  initHeroVideo();
  initCardVideos();
});
