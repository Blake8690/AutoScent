/* =========================================================
   Översättningar – alla texter på sidan ligger här.
   HTML-element använder data-i18n="nyckel" (text),
   data-i18n-html (tillåter <strong> m.m.), data-i18n-placeholder
   och data-i18n-aria (aria-label).
   ========================================================= */

const TRANSLATIONS = {
  sv: {
    "meta.title.home": "AutoScent UF – Liten detalj, stor skillnad",
    "meta.title.product": "Produkt & dofter – AutoScent UF",
    "meta.title.checkout": "Kassa – AutoScent UF",
    "meta.description": "AutoScent UF – doftpads till bilen från Vimmerby. Droppa din favoritdoft, kläm fast på ventilationen och kör.",

    "nav.home": "Hem",
    "nav.product": "Produkt & dofter",
    "nav.checkout": "Kassa",
    "nav.cart": "Varukorg",
    "nav.menu": "Öppna meny",
    "nav.skip": "Hoppa till innehållet",
    "lang.switch": "Switch to English",
    "loader.label": "Laddar AutoScent",

    "slogan": "Liten detalj, stor skillnad",
    "currency": "kr",

    "hero.eyebrow": "Doftpads till bilen · Vimmerby",
    "hero.lead": "En liten tyg-pad med din favoritdoft, fäst på ventilationen – toppad med en 3D-printad design som gör bilen ännu snyggare.",
    "hero.cta": "Bygg ditt paket",
    "hero.cta2": "Utforska dofterna",
    "hero.from": "Från",
    "hero.scroll": "Scrolla",

    "how.eyebrow": "Så funkar det",
    "how.title": "Tre steg till en bil som doftar du",
    "how.1.title": "Droppa",
    "how.1.text": "Droppa 2 ml av din valda doft på tygbiten.",
    "how.2.title": "Kläm fast",
    "how.2.text": "Klämman fäster paden på ventilationen på några sekunder.",
    "how.3.title": "Kör",
    "how.3.text": "Luftflödet sprider doften – i 2–3 veckor.",

    "parts.eyebrow": "Produkten i delar",
    "parts.title": "Fyra delar. En känsla.",
    "parts.lead": "Scrolla för att se vad som ingår i varje paket.",
    "parts.fabric": "Tygbit",
    "parts.fabric.text": "Suger upp doften och släpper den långsamt.",
    "parts.scent": "2 ml doft",
    "parts.scent.text": "Valfri doft som räcker 2–3 veckor.",
    "parts.clip": "Klämma",
    "parts.clip.text": "Fäster stadigt på ventilationen.",
    "parts.deco": "3D-dekoration",
    "parts.deco.text": "3D-printad design som gör bilen snyggare.",

    "scents.eyebrow": "Dofterna",
    "scents.title": "Välj din doft",
    "scents.lead": "Sex dofter, sex stämningar. Klicka på en doft för att känna in den.",
    "scents.cta": "Välj den här doften",
    "scents.picker": "Doftväljare",
    "scent.cherry": "Doften av ett klassiskt rosa körsbärsträd.",
    "scent.pureair": "Doften av de första timmarna en söndagsmorgon.",
    "scent.forest": "Doften av mossa, löv och en stund i skogen.",
    "scent.lemon": "Doften av färskpressad citron.",
    "scent.linen": "Doften och känslan av nytt linne.",
    "scent.cotton": "Doften av nytvättade bomullslakan.",

    "packs.eyebrow": "Paket",
    "packs.title": "Ju fler, desto mer sparar du",
    "packs.cta": "Se alla paket",

    "faq.eyebrow": "FAQ",
    "faq.title": "Vanliga frågor",
    "faq.1.q": "Hur länge räcker doften?",
    "faq.1.a": "En påfyllning på 2 ml räcker i 2–3 veckor, beroende på hur ofta du kör och hur mycket fläkten används. Sedan droppar du bara på en refill för 49 kr.",
    "faq.2.q": "Passar klämman i min bil?",
    "faq.2.a": "Klämman passar de flesta ventilationsgaller, både med liggande och stående lameller.",
    "faq.3.q": "Hur fyller jag på?",
    "faq.3.a": "Droppa refill-doften direkt på tygbiten – du behöver ingen ny pad. Du kan byta doft när du vill.",
    "faq.4.q": "Hur betalar jag?",
    "faq.4.a": "Med Swish. Efter beställningen får du ett ordernummer, totalbeloppet och en Swish-QR-kod (dator) eller en knapp som öppnar Swish direkt (mobil).",
    "faq.5.q": "Vad kostar frakten?",
    "faq.5.a": "Fast pris 49 kr för alla beställningar. Vi skickar hem till dig – det finns ingen upphämtning.",
    "faq.6.q": "Vilka är AutoScent UF?",
    "faq.6.a": "Ett UF-företag från Vimmerby som vill göra varje bilresa lite trevligare – en liten detalj i taget.",

    "footer.tagline": "Doftpads till bilen från Vimmerby.",
    "footer.contact": "Kontakt",
    "footer.follow": "Följ oss",
    "footer.pages": "Sidor",
    "footer.uf": "Ett UF-företag inom Ung Företagsamhet",
    "footer.rights": "© 2026 AutoScent UF",

    "prod.eyebrow": "Produkt & dofter",
    "prod.title": "AutoScent-paden",
    "prod.lead": "En liten tyg-pad där du droppar din favoritdoft. Den fästs på ventilationen med en klämma, och på paden sitter en 3D-printad design som gör bilen ännu snyggare.",
    "prod.includes": "Varje paket (79 kr) innehåller",
    "prod.inc.1": "Tygbit",
    "prod.inc.2": "2 ml valfri doft – räcker 2–3 veckor",
    "prod.inc.3": "Klämma till ventilationen",
    "prod.inc.4": "3D-printad dekoration",

    "builder.eyebrow": "Paketbyggare",
    "builder.title": "Bygg ditt paket",
    "builder.step1": "Välj paket",
    "builder.step2": "Välj doft per pad",
    "builder.step3": "Lägg till refill",
    "builder.optional": "valfritt",
    "builder.pad": "Pad {n}",
    "builder.refillLabel": "Refill à 49 kr",
    "builder.refillHint": "Samma doft som pad 1 – kan ändras i kassan.",
    "builder.ordinary": "Ordinarie",
    "builder.total": "Totalt",
    "builder.shippingNote": "+ frakt 49 kr",
    "builder.add": "Lägg i varukorg",
    "builder.added": "Tillagt i varukorgen",
    "builder.goCheckout": "Till kassan",
    "builder.summaryPack": "{n}-pack",
    "builder.summaryRefill": "{n} × refill",

    "pack.1": "1-pack",
    "pack.2": "2-pack",
    "pack.3": "3-pack",
    "pack.pads.1": "1 doftpad",
    "pack.pads.n": "{n} doftpads",
    "pack.popular": "Populärast",
    "pack.save": "Spara {amount}",
    "pack.single": "Ett komplett paket",

    "gauge.eyebrow": "Doftmätaren",
    "gauge.title": "Räcker 2–3 veckor",
    "gauge.lead": "Som en bränslemätare: full tank från dag ett. När nålen närmar sig E droppar du på en refill – samma pad, ny doft.",
    "gauge.full": "Full doft",
    "gauge.half": "Halvvägs",
    "gauge.low": "Dags för refill",
    "gauge.week": "Vecka {n}",
    "gauge.aria": "Doftmätare som visar hur länge doften räcker",

    "refill.eyebrow": "Refill",
    "refill.title": "Ny doft, samma pad",
    "refill.text": "2 ml valfri doft som droppas direkt på tygbiten.",
    "refill.price": "49 kr/st",
    "refill.scent": "Doft",
    "refill.qty": "Antal",
    "refill.add": "Lägg till refill",
    "refill.decrease": "Minska antal",
    "refill.increase": "Öka antal",

    "co.title": "Kassa",
    "co.step1": "Varukorg",
    "co.step2": "Leverans",
    "co.step3": "Betalning",
    "co.empty": "Varukorgen är tom.",
    "co.emptyText": "Bygg ditt paket och välj dina dofter – det tar under en minut.",
    "co.emptyCta": "Bygg ditt paket",
    "co.chooseScent": "Välj doft per pad",
    "co.remove": "Ta bort",
    "co.addRefill": "Lägg till refill",
    "co.addPack": "Lägg till paket",
    "co.subtotal": "Delsumma",
    "co.shipping": "Frakt",
    "co.shippingNote": "Fast pris · endast frakt, ingen upphämtning",
    "co.total": "Totalt",
    "co.next": "Fortsätt till leverans",
    "co.back": "Tillbaka",
    "co.summary": "Din beställning",
    "co.name": "Namn",
    "co.street": "Gatuadress",
    "co.zip": "Postnummer",
    "co.city": "Ort",
    "co.email": "E-post (valfritt)",
    "co.phone": "Telefon (valfritt)",
    "co.deliveryNote": "Vi skickar alla beställningar med frakt – ingen upphämtning.",
    "co.order": "Beställ",
    "co.sending": "Skickar…",
    "co.required": "Fyll i det här fältet.",
    "co.zipInvalid": "Ange ett giltigt postnummer (5 siffror).",
    "co.emailInvalid": "Ange en giltig e-postadress.",
    "co.thanks": "Tack för din beställning!",
    "co.orderNo": "Ordernummer",
    "co.amount": "Att betala",
    "co.payInfo": "Betala med Swish för att slutföra beställningen. Ordernumret följer med som meddelande.",
    "co.scanQr": "Skanna QR-koden med Swish-appen",
    "co.openSwish": "Öppna Swish",
    "co.showQr": "Visa QR-kod istället",
    "co.showButton": "Betalar du på mobilen? Visa Swish-knapp",
    "co.swishTo": "Swish till",
    "co.swishPending": "Swish-numret kommer snart. Vi kontaktar dig med betalningsinformation – spara ditt ordernummer.",
    "co.mailOk": "Ordern är mottagen av AutoScent UF.",
    "co.mailFail": "Ordern kunde inte skickas automatiskt. Mejla gärna ditt ordernummer till {email}.",
    "co.backHome": "Till startsidan",
    "co.refillItem": "Refill · 2 ml",
    "co.packItem": "{n}-pack",
    "co.scent": "Doft",
    "co.padLabel": "Pad {n}",
    "co.deliverTo": "Levereras till"
  },

  en: {
    "meta.title.home": "AutoScent UF – Small detail, big difference",
    "meta.title.product": "Product & scents – AutoScent UF",
    "meta.title.checkout": "Checkout – AutoScent UF",
    "meta.description": "AutoScent UF – car scent pads from Vimmerby, Sweden. Drop your favourite scent, clip it to the vent and drive.",

    "nav.home": "Home",
    "nav.product": "Product & scents",
    "nav.checkout": "Checkout",
    "nav.cart": "Cart",
    "nav.menu": "Open menu",
    "nav.skip": "Skip to content",
    "lang.switch": "Byt till svenska",
    "loader.label": "Loading AutoScent",

    "slogan": "Small detail, big difference",
    "currency": "SEK",

    "hero.eyebrow": "Car scent pads · Vimmerby, Sweden",
    "hero.lead": "A small fabric pad with your favourite scent, clipped to the air vent – topped with a 3D-printed design that makes your car look even better.",
    "hero.cta": "Build your pack",
    "hero.cta2": "Explore the scents",
    "hero.from": "From",
    "hero.scroll": "Scroll",

    "how.eyebrow": "How it works",
    "how.title": "Three steps to a car that smells like you",
    "how.1.title": "Drop",
    "how.1.text": "Drop 2 ml of your chosen scent onto the fabric pad.",
    "how.2.title": "Clip on",
    "how.2.text": "The clip attaches the pad to your air vent in seconds.",
    "how.3.title": "Drive",
    "how.3.text": "The airflow spreads the scent – for 2–3 weeks.",

    "parts.eyebrow": "The product, piece by piece",
    "parts.title": "Four parts. One feeling.",
    "parts.lead": "Scroll to see what's inside every pack.",
    "parts.fabric": "Fabric pad",
    "parts.fabric.text": "Absorbs the scent and releases it slowly.",
    "parts.scent": "2 ml scent",
    "parts.scent.text": "Your choice of scent, lasts 2–3 weeks.",
    "parts.clip": "Clip",
    "parts.clip.text": "Grips the air vent firmly.",
    "parts.deco": "3D decoration",
    "parts.deco.text": "A 3D-printed design that upgrades your car.",

    "scents.eyebrow": "The scents",
    "scents.title": "Choose your scent",
    "scents.lead": "Six scents, six moods. Tap a scent to get a feel for it.",
    "scents.cta": "Choose this scent",
    "scents.picker": "Scent picker",
    "scent.cherry": "The scent of a classic pink cherry tree.",
    "scent.pureair": "The scent of the first hours of a Sunday morning.",
    "scent.forest": "The scent of moss, leaves and a moment in the forest.",
    "scent.lemon": "The scent of freshly squeezed lemon.",
    "scent.linen": "The scent and feel of fresh linen.",
    "scent.cotton": "The scent of freshly washed cotton sheets.",

    "packs.eyebrow": "Packs",
    "packs.title": "The more you get, the more you save",
    "packs.cta": "See all packs",

    "faq.eyebrow": "FAQ",
    "faq.title": "Frequently asked questions",
    "faq.1.q": "How long does the scent last?",
    "faq.1.a": "One 2 ml fill lasts 2–3 weeks, depending on how often you drive and how much you use the fan. After that, just add a refill for 49 SEK.",
    "faq.2.q": "Will the clip fit my car?",
    "faq.2.a": "The clip fits most air vents, with both horizontal and vertical slats.",
    "faq.3.q": "How do I refill?",
    "faq.3.a": "Drop the refill scent straight onto the fabric pad – no new pad needed. You can switch scents whenever you like.",
    "faq.4.q": "How do I pay?",
    "faq.4.a": "With Swish. After ordering you get an order number, the total amount and a Swish QR code (desktop) or a button that opens Swish directly (mobile).",
    "faq.5.q": "How much is shipping?",
    "faq.5.a": "A flat 49 SEK for every order. We ship to your door – there is no pickup option.",
    "faq.6.q": "Who are AutoScent UF?",
    "faq.6.a": "A student company (UF) from Vimmerby, Sweden, making every drive a little nicer – one small detail at a time.",

    "footer.tagline": "Car scent pads from Vimmerby, Sweden.",
    "footer.contact": "Contact",
    "footer.follow": "Follow us",
    "footer.pages": "Pages",
    "footer.uf": "A student company within Junior Achievement Sweden (UF)",
    "footer.rights": "© 2026 AutoScent UF",

    "prod.eyebrow": "Product & scents",
    "prod.title": "The AutoScent pad",
    "prod.lead": "A small fabric pad where you drop your favourite scent. It attaches to the air vent with a clip, and a 3D-printed design on the pad makes your car look even better.",
    "prod.includes": "Every pack (79 SEK) includes",
    "prod.inc.1": "Fabric pad",
    "prod.inc.2": "2 ml scent of your choice – lasts 2–3 weeks",
    "prod.inc.3": "Air vent clip",
    "prod.inc.4": "3D-printed decoration",

    "builder.eyebrow": "Pack builder",
    "builder.title": "Build your pack",
    "builder.step1": "Choose a pack",
    "builder.step2": "Choose a scent for each pad",
    "builder.step3": "Add refills",
    "builder.optional": "optional",
    "builder.pad": "Pad {n}",
    "builder.refillLabel": "Refill at 49 SEK",
    "builder.refillHint": "Same scent as pad 1 – you can change it at checkout.",
    "builder.ordinary": "Regular price",
    "builder.total": "Total",
    "builder.shippingNote": "+ shipping 49 SEK",
    "builder.add": "Add to cart",
    "builder.added": "Added to cart",
    "builder.goCheckout": "Go to checkout",
    "builder.summaryPack": "{n}-pack",
    "builder.summaryRefill": "{n} × refill",

    "pack.1": "1-pack",
    "pack.2": "2-pack",
    "pack.3": "3-pack",
    "pack.pads.1": "1 scent pad",
    "pack.pads.n": "{n} scent pads",
    "pack.popular": "Most popular",
    "pack.save": "Save {amount}",
    "pack.single": "One complete pack",

    "gauge.eyebrow": "The scent gauge",
    "gauge.title": "Lasts 2–3 weeks",
    "gauge.lead": "Just like a fuel gauge: a full tank from day one. When the needle nears E, add a refill – same pad, new scent.",
    "gauge.full": "Full scent",
    "gauge.half": "Halfway",
    "gauge.low": "Time for a refill",
    "gauge.week": "Week {n}",
    "gauge.aria": "Scent gauge showing how long the scent lasts",

    "refill.eyebrow": "Refill",
    "refill.title": "New scent, same pad",
    "refill.text": "2 ml of any scent, dropped straight onto the fabric pad.",
    "refill.price": "49 SEK each",
    "refill.scent": "Scent",
    "refill.qty": "Quantity",
    "refill.add": "Add refill",
    "refill.decrease": "Decrease quantity",
    "refill.increase": "Increase quantity",

    "co.title": "Checkout",
    "co.step1": "Cart",
    "co.step2": "Delivery",
    "co.step3": "Payment",
    "co.empty": "Your cart is empty.",
    "co.emptyText": "Build your pack and pick your scents – it takes less than a minute.",
    "co.emptyCta": "Build your pack",
    "co.chooseScent": "Choose a scent for each pad",
    "co.remove": "Remove",
    "co.addRefill": "Add refill",
    "co.addPack": "Add a pack",
    "co.subtotal": "Subtotal",
    "co.shipping": "Shipping",
    "co.shippingNote": "Flat rate · delivery only, no pickup",
    "co.total": "Total",
    "co.next": "Continue to delivery",
    "co.back": "Back",
    "co.summary": "Your order",
    "co.name": "Full name",
    "co.street": "Street address",
    "co.zip": "Postal code",
    "co.city": "City",
    "co.email": "Email (optional)",
    "co.phone": "Phone (optional)",
    "co.deliveryNote": "All orders are shipped – there is no pickup.",
    "co.order": "Place order",
    "co.sending": "Sending…",
    "co.required": "Please fill in this field.",
    "co.zipInvalid": "Enter a valid postal code (5 digits).",
    "co.emailInvalid": "Enter a valid email address.",
    "co.thanks": "Thank you for your order!",
    "co.orderNo": "Order number",
    "co.amount": "Amount to pay",
    "co.payInfo": "Pay with Swish to complete your order. The order number is included as the message.",
    "co.scanQr": "Scan the QR code with the Swish app",
    "co.openSwish": "Open Swish",
    "co.showQr": "Show QR code instead",
    "co.showButton": "Paying on your phone? Show Swish button",
    "co.swishTo": "Swish to",
    "co.swishPending": "Our Swish number is coming soon. We will contact you with payment details – keep your order number.",
    "co.mailOk": "Your order has been received by AutoScent UF.",
    "co.mailFail": "The order could not be sent automatically. Please email your order number to {email}.",
    "co.backHome": "Back to home",
    "co.refillItem": "Refill · 2 ml",
    "co.packItem": "{n}-pack",
    "co.scent": "Scent",
    "co.padLabel": "Pad {n}",
    "co.deliverTo": "Delivered to"
  }
};

const I18N = (() => {
  const KEY = "autoscent-lang";
  let lang = "sv";
  try { lang = localStorage.getItem(KEY) || "sv"; } catch (e) {}
  if (!TRANSLATIONS[lang]) lang = "sv";

  const listeners = [];

  function t(key, vars) {
    let str = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) ?? TRANSLATIONS.sv[key] ?? key;
    if (vars) Object.keys(vars).forEach(k => { str = str.split("{" + k + "}").join(vars[k]); });
    return str;
  }

  function price(amount) {
    return lang === "sv" ? `${amount} kr` : `${amount} SEK`;
  }

  function apply(root = document) {
    document.documentElement.lang = lang;
    root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    root.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    root.querySelectorAll("[data-price]").forEach(el => { el.textContent = price(el.dataset.price); });
    root.querySelectorAll("[data-save]").forEach(el => { el.textContent = t("pack.save", { amount: price(el.dataset.save) }); });
    root.querySelectorAll("[data-pads]").forEach(el => {
      const n = Number(el.dataset.pads);
      el.textContent = n === 1 ? t("pack.pads.1") : t("pack.pads.n", { n });
    });
    const titleKey = document.body && document.body.dataset.titleKey;
    if (titleKey) document.title = t(titleKey);
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = t("meta.description");
  }

  function set(newLang) {
    if (!TRANSLATIONS[newLang] || newLang === lang) return;
    lang = newLang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply();
    listeners.forEach(fn => fn(lang));
  }

  return {
    t, price, apply, set,
    get lang() { return lang; },
    onChange(fn) { listeners.push(fn); }
  };
})();
