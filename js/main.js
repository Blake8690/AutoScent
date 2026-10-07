/* =========================================================
   Gemensamt för alla sidor: språk, laddningsskärm, meny,
   fartlinjer, varukorg, scroll-effekter.
   ========================================================= */

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Varukorg (sparas i localStorage) ---------- */
const Cart = (() => {
  const KEY = "autoscent-cart";
  let items = [];
  try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { items = []; }
  if (!Array.isArray(items)) items = [];
  const listeners = [];

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const validScent = s => DOFTER.some(d => d.id === s) ? s : DOFTER[0].id;

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
    listeners.forEach(fn => fn(items));
  }

  // Ett paket: { uid, type: "pack", size: 1|2|3, scents: [...] }
  // En refill: { uid, type: "refill", scent }
  function addPack(size, scents) {
    const list = Array.from({ length: size }, (_, i) => validScent(scents[i] || scents[0]));
    items.push({ uid: uid(), type: "pack", size, scents: list });
    save();
  }
  function addRefill(scent, qty = 1) {
    for (let i = 0; i < qty; i++) items.push({ uid: uid(), type: "refill", scent: validScent(scent) });
    save();
  }
  function remove(id) { items = items.filter(i => i.uid !== id); save(); }
  function setScent(id, scent, index = 0) {
    const item = items.find(i => i.uid === id);
    if (!item) return;
    if (item.type === "pack") item.scents[index] = validScent(scent);
    else item.scent = validScent(scent);
    save();
  }
  function clear() { items = []; save(); }

  function itemPrice(item) {
    return item.type === "pack" ? PRISER.pack[item.size] : PRISER.refill;
  }
  function subtotal() { return items.reduce((sum, i) => sum + itemPrice(i), 0); }
  function count() { return items.length; }

  return {
    get items() { return items; },
    addPack, addRefill, remove, setScent, clear, itemPrice, subtotal, count,
    onChange(fn) { listeners.push(fn); }
  };
})();

const scentById = id => DOFTER.find(d => d.id === id) || DOFTER[0];

/* ---------- Hjälpare ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

// Hur långt (0–1) man scrollat genom ett element
function sectionProgress(el) {
  const r = el.getBoundingClientRect();
  const total = r.height - window.innerHeight;
  if (total <= 0) return clamp((window.innerHeight - r.top) / (window.innerHeight + r.height));
  return clamp(-r.top / total);
}

/* ---------- Laddningsskärm: emblemet ritas som en hastighetsmätare ---------- */
function initLoader() {
  const loader = $(".loader");
  if (!loader) return;

  // Bygg mätarens skalstreck
  const ticks = $(".loader__ticks", loader);
  if (ticks) {
    let html = "";
    for (let i = 0; i <= 20; i++) {
      const angle = -135 + i * 13.5;
      const major = i % 5 === 0;
      html += `<line x1="100" y1="${major ? 33 : 37}" x2="100" y2="45" transform="rotate(${angle} 100 100)" class="${major ? "major" : ""}" style="--i:${i}"/>`;
    }
    ticks.innerHTML = html;
  }

  const firstVisit = (() => {
    try {
      const seen = sessionStorage.getItem("autoscent-loaded");
      sessionStorage.setItem("autoscent-loaded", "1");
      return !seen;
    } catch (e) { return true; }
  })();

  if (REDUCED_MOTION.matches) loader.classList.add("is-instant");
  else if (!firstVisit) loader.classList.add("is-quick");

  const delay = REDUCED_MOTION.matches ? 50 : firstVisit ? 1700 : 650;
  const speed = $(".loader__speed", loader);
  if (speed && !REDUCED_MOTION.matches) {
    const start = performance.now();
    const step = now => {
      const p = clamp((now - start) / (delay - 250));
      speed.textContent = Math.round(240 * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const finish = () => {
    loader.classList.add("is-done");
    document.documentElement.classList.add("is-loaded");
    setTimeout(() => loader.remove(), 600);
  };
  const go = () => setTimeout(finish, delay);
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
  // Säkerhetsspärr om något laddar långsamt
  setTimeout(finish, 4000);
}

/* ---------- Språkknapp ---------- */
function initLanguage() {
  $$(".lang-toggle").forEach(btn => {
    const render = () => {
      const next = I18N.lang === "sv" ? "en" : "sv";
      btn.innerHTML = `<span class="lang-toggle__flag" aria-hidden="true">${next === "en" ? "🇬🇧" : "🇸🇪"}</span><span class="lang-toggle__code">${next.toUpperCase()}</span>`;
      btn.setAttribute("aria-label", I18N.t("lang.switch"));
    };
    render();
    btn.addEventListener("click", () => I18N.set(I18N.lang === "sv" ? "en" : "sv"));
    I18N.onChange(render);
  });
}

/* ---------- Header, meny & varukorgsräknare ---------- */
function initHeader() {
  const header = $(".site-header");
  const toggle = $(".menu-toggle");
  const nav = $(".site-nav");

  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    const setOpen = open => {
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = open ? SVG.icons.close : SVG.icons.menu;
    };
    toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
    $$("a", nav).forEach(a => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
  }

  const updateCount = () => {
    $$(".cart-count").forEach(el => {
      const n = Cart.count();
      el.textContent = n;
      el.hidden = n === 0;
      el.classList.remove("is-bump");
      void el.offsetWidth;
      el.classList.add("is-bump");
    });
  };
  updateCount();
  Cart.onChange(updateCount);
}

/* ---------- Fartlinjer som rör sig snabbare ju snabbare man scrollar ---------- */
function initSpeedLines() {
  const canvas = $(".speed-lines");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, dpr, lines = [];
  let lastY = window.scrollY, velocity = 0, boost = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(clamp(w / 22, 18, 70));
    lines = Array.from({ length: count }, () => spawn(true));
  }
  function spawn(anywhere) {
    return {
      x: anywhere ? Math.random() * w : w + Math.random() * w * 0.3,
      y: Math.random() * h,
      len: 40 + Math.random() * 160,
      speed: 0.6 + Math.random() * 1.6,
      alpha: 0.05 + Math.random() * 0.18,
      width: Math.random() < 0.15 ? 2 : 1
    };
  }

  function drawStatic() {
    ctx.clearRect(0, 0, w, h);
    lines.forEach(l => {
      ctx.strokeStyle = `rgba(197,204,212,${l.alpha * 0.7})`;
      ctx.lineWidth = l.width;
      ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(l.x + l.len, l.y); ctx.stroke();
    });
  }

  function frame() {
    const y = window.scrollY;
    const delta = Math.abs(y - lastY);
    lastY = y;
    velocity += (delta - velocity) * 0.15;
    boost = clamp(velocity / 18, 0, 6);
    document.documentElement.style.setProperty("--scroll-speed", boost.toFixed(3));

    ctx.clearRect(0, 0, w, h);
    const mult = 1 + boost * 4;
    for (const l of lines) {
      l.x -= l.speed * mult * 2.2;
      if (l.x + l.len * (1 + boost * 0.6) < 0) Object.assign(l, spawn(false));
      const len = l.len * (1 + boost * 0.6);
      const grad = ctx.createLinearGradient(l.x, 0, l.x + len, 0);
      const a = clamp(l.alpha * (1 + boost * 0.8), 0, 0.7);
      grad.addColorStop(0, `rgba(242,244,246,${a})`);
      grad.addColorStop(1, "rgba(197,204,212,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = l.width;
      ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(l.x + len, l.y); ctx.stroke();
    }
    raf = requestAnimationFrame(frame);
  }

  let raf = null;
  function start() {
    cancelAnimationFrame(raf);
    if (REDUCED_MOTION.matches) drawStatic();
    else raf = requestAnimationFrame(frame);
  }

  resize(); start();
  window.addEventListener("resize", () => { resize(); start(); });
  REDUCED_MOTION.addEventListener("change", start);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf); else start();
  });
}

/* ---------- Rubriken fälls upp ord för ord ---------- */
function splitWords(el) {
  const text = I18N.t(el.dataset.split);
  el.setAttribute("aria-label", text);
  el.innerHTML = text.split(" ").map((word, i) =>
    `<span class="word" aria-hidden="true"><span class="word__inner" style="--i:${i}">${word}</span></span>`
  ).join(" ");
}
function initSplitHeadings() {
  const els = $$("[data-split]");
  els.forEach(splitWords);
  I18N.onChange(() => els.forEach(el => {
    splitWords(el);
    el.classList.remove("is-in"); void el.offsetWidth; el.classList.add("is-in");
  }));
}

/* ---------- Element som glider in vid scroll ---------- */
function initReveal() {
  const els = $$("[data-reveal], [data-split]");
  if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      // Hero-rubriken väntar på att laddningsskärmen ska försvinna
      const wait = !document.documentElement.classList.contains("is-loaded") && e.target.closest(".hero");
      if (wait) {
        const check = setInterval(() => {
          if (document.documentElement.classList.contains("is-loaded")) { clearInterval(check); e.target.classList.add("is-in"); }
        }, 50);
      } else e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
  els.forEach(el => io.observe(el));
}

/* ---------- Hero: emblemet roterar, ljusglans följer scroll ---------- */
function initHeroEmblem() {
  const emblem = $(".hero-emblem");
  if (!emblem) return;
  let ticking = false;
  const update = () => {
    const p = clamp(window.scrollY / (window.innerHeight * 1.1));
    emblem.style.setProperty("--glare", (p * 1.6 - 0.3).toFixed(3));
    emblem.style.setProperty("--tilt", (p * 30).toFixed(2) + "deg");
    emblem.style.setProperty("--lift", (p * -60).toFixed(1) + "px");
    ticking = false;
  };
  update();
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
}

/* ---------- Metallglans på knappar följer muspekaren ---------- */
function initButtonShine() {
  document.addEventListener("pointermove", e => {
    const btn = e.target.closest && e.target.closest(".btn, .round-btn");
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    btn.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
  }, { passive: true });
}

/* ---------- Footer: kontaktuppgifter från config ---------- */
function initContact() {
  $$("[data-contact]").forEach(el => {
    const type = el.dataset.contact;
    if (type === "email") { el.href = `mailto:${KONTAKT.epost}`; el.querySelector("span").textContent = KONTAKT.epost; }
    if (type === "phone") {
      el.href = `tel:+46${KONTAKT.telefon.replace(/^0/, "")}`;
      el.querySelector("span").textContent = KONTAKT.telefon.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1-$2 $3 $4");
    }
    if (type === "instagram") el.href = KONTAKT.instagram;
    if (type === "tiktok") el.href = KONTAKT.tiktok;
  });
}

/* ---------- Start ---------- */
document.addEventListener("DOMContentLoaded", () => {
  SVG.render();
  SVG.optionalImages();
  I18N.apply();
  initLoader();
  initLanguage();
  initHeader();
  initContact();
  initSpeedLines();
  initSplitHeadings();
  initReveal();
  initHeroEmblem();
  initButtonShine();
});
