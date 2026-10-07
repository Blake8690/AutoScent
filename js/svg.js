/* =========================================================
   SVG-grafik (platshållare för logga och produktbilder).
   Element med data-svg="namn" fylls automatiskt.
   Lägg riktiga bilder i /images – se images/README.md.
   ========================================================= */

const SVG = (() => {
  let uid = 0;
  const id = p => `${p}${++uid}`;

  // Vit sportbil i sidoprofil (viewBox 0 0 240 100)
  function carPaths(body = "#ffffff", dark = "#0f1620", rim = "#c5ccd4") {
    return `
      <path fill="${body}" d="M12 70c0-8 5-12 15-14l42-7c16-12 35-20 59-21 23-1 41 6 57 18l27 6c12 2 18 8 18 16v4H12z"/>
      <path fill="${dark}" opacity=".85" d="M84 49c12-9 27-14 44-14 15 0 29 4 40 12z"/>
      <path fill="none" stroke="${dark}" stroke-width="1.6" opacity=".35" d="M70 58h140"/>
      <circle cx="62" cy="72" r="14" fill="${dark}"/>
      <circle cx="62" cy="72" r="8" fill="none" stroke="${rim}" stroke-width="3"/>
      <circle cx="188" cy="72" r="14" fill="${dark}"/>
      <circle cx="188" cy="72" r="8" fill="none" stroke="${rim}" stroke-width="3"/>`;
  }

  function car() {
    return `<svg viewBox="0 0 240 100" aria-hidden="true" focusable="false">${carPaths()}</svg>`;
  }

  // Runt silveremblem med sportbil, fartlinjer och text
  function emblem({ text = true } = {}) {
    const s = id("es"), i = id("ei"), a = id("ea");
    return `
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="${s}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f4f6f8"/>
          <stop offset=".35" stop-color="#9aa3ad"/>
          <stop offset=".55" stop-color="#eef1f4"/>
          <stop offset=".8" stop-color="#6f7a86"/>
          <stop offset="1" stop-color="#c5ccd4"/>
        </linearGradient>
        <radialGradient id="${i}" cx=".4" cy=".35" r=".8">
          <stop offset="0" stop-color="#223041"/>
          <stop offset="1" stop-color="#0b1119"/>
        </radialGradient>
        <path id="${a}" d="M38 100a62 62 0 0 1 124 0"/>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#${s})"/>
      <circle cx="100" cy="100" r="88" fill="url(#${i})"/>
      <circle cx="100" cy="100" r="88" fill="none" stroke="#c5ccd4" stroke-opacity=".5" stroke-width="1"/>
      <circle cx="100" cy="100" r="80" fill="none" stroke="#c5ccd4" stroke-opacity=".22" stroke-width="2" stroke-dasharray="1 5"/>
      <g stroke="#f2f4f6" stroke-linecap="round" opacity=".85">
        <path d="M22 104h26" stroke-width="2.4"/>
        <path d="M30 112h20" stroke-width="2"/>
        <path d="M38 120h14" stroke-width="1.6"/>
      </g>
      <g transform="translate(46 76) scale(.5)">${carPaths("#ffffff", "#0f1620", "#c5ccd4")}</g>
      ${text ? `
      <text font-family="'Barlow Condensed', sans-serif" font-weight="700" font-style="italic" font-size="19" letter-spacing="3" fill="#c5ccd4">
        <textPath href="#${a}" startOffset="50%" text-anchor="middle">AUTOSCENT</textPath>
      </text>
      <text x="100" y="152" text-anchor="middle" font-family="'Barlow Condensed', sans-serif" font-weight="700" font-style="italic" font-size="12" letter-spacing="4" fill="#5f6f82">UF</text>` : ""}
    </svg>`;
  }

  // Tygbit (färgas via CSS-variabeln --scent)
  function fabric() {
    const p = id("fp");
    return `
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="${p}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 3h6M3 0v6" stroke="#000" stroke-opacity=".07" stroke-width="1"/>
        </pattern>
      </defs>
      <circle cx="100" cy="100" r="92" style="fill:var(--scent,#e9e4da)"/>
      <circle cx="100" cy="100" r="92" fill="url(#${p})"/>
      <circle cx="100" cy="100" r="82" fill="none" stroke="#0f1620" stroke-opacity=".25" stroke-width="1.6" stroke-dasharray="4 4"/>
      <circle cx="100" cy="100" r="92" fill="none" stroke="#fff" stroke-opacity=".4"/>
    </svg>`;
  }

  // 3D-dekoration – liten version av emblemet
  function deco() {
    return emblem({ text: false });
  }

  // Doftdroppe
  function drop() {
    const g = id("dg");
    return `
    <svg viewBox="0 0 120 160" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity=".9"/>
          <stop offset="1" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="M60 6C60 6 14 64 14 100a46 46 0 0 0 92 0C106 64 60 6 60 6z" style="fill:var(--scent,#c5ccd4)" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>
      <path d="M40 92c0-14 8-28 14-38" fill="none" stroke="url(#${g})" stroke-width="7" stroke-linecap="round"/>
      <text x="60" y="122" text-anchor="middle" font-family="'Barlow Condensed', sans-serif" font-weight="700" font-style="italic" font-size="24" fill="#0f1620" fill-opacity=".75">2 ml</text>
    </svg>`;
  }

  // Ventilationsklämma
  function clip() {
    const g = id("cg");
    return `
    <svg viewBox="0 0 120 180" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="${g}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#5f6f82"/>
          <stop offset=".5" stop-color="#c5ccd4"/>
          <stop offset="1" stop-color="#5f6f82"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="40" r="32" fill="url(#${g})"/>
      <circle cx="60" cy="40" r="20" fill="#0f1620" opacity=".55"/>
      <rect x="44" y="64" width="32" height="30" rx="6" fill="url(#${g})"/>
      <path d="M46 92v70a8 8 0 0 0 8 8h0V92zM74 92v70a8 8 0 0 1-8 8h0V92z" fill="url(#${g})"/>
      <path d="M50 100v62M70 100v62" stroke="#0f1620" stroke-opacity=".35" stroke-width="2"/>
    </svg>`;
  }

  // Komplett pad: tygbit + dekoration
  function pad() {
    return `
    <div class="pad-visual">
      <div class="pad-visual__fabric">${fabric()}</div>
      <div class="pad-visual__deco">${deco()}</div>
    </div>`;
  }

  // Ikoner
  const icons = {
    cart: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20.5" r="1.4" fill="currentColor"/><circle cx="17" cy="20.5" r="1.4" fill="currentColor"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    close: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    drop: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3s-6 7.2-6 11.2a6 6 0 0 0 12 0C18 10.2 12 3 12 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    clip: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 11v9M14 11v9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    car: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 15.5v-2.3c0-.8.5-1.4 1.3-1.6l3.2-.8 2.3-2.6a3 3 0 0 1 2.2-1h3.2c.9 0 1.7.4 2.2 1.1l1.9 2.5 1.4.4c.8.2 1.3.9 1.3 1.7v2.6M2 15.5h20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="16.5" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="16.5" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 3h3l1.5 4.2-2 1.3a11 11 0 0 0 6.4 6.4l1.3-2L21 14.4v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
    check: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    minus: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
  };

  const builders = { emblem, fabric, deco, "part-drop": drop, "part-clip": clip, pad };

  function render(root = document) {
    root.querySelectorAll("[data-svg]").forEach(el => {
      const name = el.dataset.svg;
      if (builders[name]) el.innerHTML = builders[name]();
      else if (icons[name]) el.innerHTML = icons[name];
    });
  }

  // Byt ut platshållare mot riktig bild om den finns i /images
  function optionalImages(root = document) {
    root.querySelectorAll("[data-img]").forEach(el => {
      const img = new Image();
      img.alt = el.dataset.imgAlt || "";
      img.decoding = "async";
      img.onload = () => {
        el.innerHTML = "";
        el.appendChild(img);
        el.classList.add("has-image");
      };
      img.src = el.dataset.img;
    });
  }

  return { render, optionalImages, icons, ...builders };
})();
