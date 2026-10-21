/* =========================================================
   AutoScent UF – inställningar
   Ändra värdena här, resten av sidan läser från denna fil.
   ========================================================= */

// Swish-nummer som betalningen ska gå till (t.ex. "1231234567").
// Så länge värdet är "KOMMER" visas ett meddelande istället för QR/knapp.
const SWISH_NUMMER = "KOMMER";

// Kundens kontaktuppgifter
const KONTAKT = {
  epost: "charlie.sjoholm@edu.vimmerby.se",
  telefon: "0793028307",
  instagram: "https://instagram.com/autoscent_uf",
  tiktok: "https://tiktok.com/@autoscentuf"
};

// Ordermejl – beställningar skickas till den här adressen via FormSubmit
// (formsubmit.co). Inget konto eller nycklar behövs. Första gången någon
// beställer får adressen ett mejl från FormSubmit – klicka "Activate Form"
// en gång, sedan kommer alla ordrar fram.
const ORDER_EPOST = "charlie.sjoholm@edu.vimmerby.se";

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
