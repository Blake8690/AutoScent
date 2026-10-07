/* =========================================================
   AutoScent UF – inställningar
   Ändra värdena här, resten av sidan läser från denna fil.
   ========================================================= */

// Swish-nummer som betalningen ska gå till (t.ex. "1231234567").
// Så länge värdet är "KOMMER" visas ett meddelande istället för QR/knapp.
const SWISH_NUMMER = "KOMMER";

// Kundens kontaktuppgifter
const KONTAKT = {
  epost: "lars.lingefjord-bogren@edu.vimmerby.se",
  telefon: "0793028307",
  instagram: "https://instagram.com/autoscent_uf",
  tiktok: "https://tiktok.com/@autoscentuf"
};

// EmailJS – fyll i nycklarna från https://dashboard.emailjs.com
// Mallen (template) kan använda variablerna som skickas i js/kassa.js:
// {{to_email}} {{order_number}} {{customer_name}} {{customer_address}}
// {{customer_email}} {{customer_phone}} {{order_items}} {{subtotal}}
// {{shipping}} {{total}} {{language}}
const EMAILJS = {
  PUBLIC_KEY: "DIN_PUBLIC_KEY",
  SERVICE_ID: "DIN_SERVICE_ID",
  TEMPLATE_ID: "DIN_TEMPLATE_ID"
};

// Priser i kronor
const PRISER = {
  pack: { 1: 79, 2: 129, 3: 199 },
  refill: 49,
  frakt: 49
};

// Dofter – namn är varumärken och översätts inte, beskrivningar ligger i i18n.js
const DOFTER = [
  { id: "cherry", namn: "Cherry Blossom", farg: "#f2c4cf" },
  { id: "pureair", namn: "Pure Air", farg: "#dfe8cc" },
  { id: "forest", namn: "Misty Forest", farg: "#5e8a4a" },
  { id: "lemon", namn: "Lemon Grass", farg: "#e6d98f" },
  { id: "linen", namn: "Fresh Linen", farg: "#efe7d4" },
  { id: "cotton", namn: "Cotton Clean", farg: "#e8eef2" }
];
