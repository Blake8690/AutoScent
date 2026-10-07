/* =========================================================
   Sidfunktioner: doftväljare, produkt i delar,
   paketbyggare, doftmätare och refill.
   Varje funktion körs bara om dess element finns på sidan.
   ========================================================= */

const ScentState = (() => {
  const KEY = "autoscent-scent";
  let current = DOFTER[0].id;
  try {
    const fromUrl = new URLSearchParams(location.search).get("doft");
    current = (fromUrl && DOFTER.some(d => d.id === fromUrl) ? fromUrl : sessionStorage.getItem(KEY)) || current;
  } catch (e) {}
  if (!DOFTER.some(d => d.id === current)) current = DOFTER[0].id;
  const listeners = [];
  return {
    get current() { return current; },
    set(id) {
      current = id;
      try { sessionStorage.setItem(KEY, id); } catch (e) {}
      document.documentElement.style.setProperty("--scent", scentById(id).farg);
      listeners.forEach(fn => fn(id));
    },
    onChange(fn) { listeners.push(fn); }
  };
})();

/* Rad med runda färgval (radiogrupp) */
function swatchGroup({ name, selected, label, size = "sm", onSelect }) {
  const group = document.createElement("div");
  group.className = `swatches swatches--${size}`;
  group.setAttribute("role", "radiogroup");
  if (label) group.setAttribute("aria-label", label);

  DOFTER.forEach(d => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "swatch";
    b.setAttribute("role", "radio");
    b.dataset.scent = d.id;
    b.style.setProperty("--c", d.farg);
    b.setAttribute("aria-label", d.namn);
    b.title = d.namn;
    b.name = name;
    group.appendChild(b);
  });

  const select = (id, focus) => {
    $$(".swatch", group).forEach(b => {
      const on = b.dataset.scent === id;
      b.setAttribute("aria-checked", String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
  };
  select(selected);

  group.addEventListener("click", e => {
    const b = e.target.closest(".swatch");
    if (!b) return;
    select(b.dataset.scent);
    onSelect && onSelect(b.dataset.scent);
  });
  group.addEventListener("keydown", e => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const btns = $$(".swatch", group);
    const i = btns.findIndex(b => b.getAttribute("aria-checked") === "true");
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
    const next = btns[(i + dir + btns.length) % btns.length];
    select(next.dataset.scent, true);
    onSelect && onSelect(next.dataset.scent);
  });

  group.setValue = id => select(id);
  return group;
}

/* ---------- Doftväljare ---------- */
function initScentPicker() {
  $$("[data-scent-picker]").forEach(root => {
    const swatchHost = $(".scent-picker__swatches", root);
    const nameEl = $(".scent-picker__name", root);
    const descEl = $(".scent-picker__desc", root);
    const indexEl = $(".scent-picker__index", root);
    const cta = $(".scent-picker__cta", root);
    const stage = $(".scent-picker__stage", root);

    const names = document.createElement("div");
    names.className = "scent-picker__list";

    const group = swatchGroup({
      name: "scent-picker",
      selected: ScentState.current,
      label: I18N.t("scents.picker"),
      size: "lg",
      onSelect: id => ScentState.set(id)
    });
    // Visa doftnamn under varje cirkel
    $$(".swatch", group).forEach(b => {
      const d = scentById(b.dataset.scent);
      b.innerHTML = `<span class="swatch__label">${d.namn}</span>`;
    });
    swatchHost.appendChild(group);

    const render = id => {
      const d = scentById(id);
      const i = DOFTER.indexOf(d);
      root.style.setProperty("--scent", d.farg);
      group.setValue(id);
      // Växla text med en snabb "swipe"
      [nameEl, descEl].forEach(el => { el.classList.remove("is-swap"); void el.offsetWidth; el.classList.add("is-swap"); });
      nameEl.textContent = d.namn;
      descEl.textContent = I18N.t(`scent.${d.id}`);
      if (indexEl) indexEl.textContent = `0${i + 1} / 0${DOFTER.length}`;
      if (cta) cta.href = `produkt.html?doft=${d.id}#bygg`;
      if (stage) { stage.classList.remove("is-pulse"); void stage.offsetWidth; stage.classList.add("is-pulse"); }
    };
    render(ScentState.current);
    ScentState.onChange(render);
    I18N.onChange(() => render(ScentState.current));
  });
  document.documentElement.style.setProperty("--scent", scentById(ScentState.current).farg);
}

/* ---------- Produkten i delar – flyger isär vid scroll ---------- */
function initExploded() {
  const section = $("[data-exploded]");
  if (!section) return;
  let ticking = false;
  const update = () => {
    // Börja isär efter 15 %, fullt isär vid 70 %
    const raw = sectionProgress(section);
    const p = REDUCED_MOTION.matches ? 1 : clamp((raw - 0.12) / 0.55);
    const eased = 1 - Math.pow(1 - p, 3);
    section.style.setProperty("--p", eased.toFixed(4));
    section.classList.toggle("is-open", p > 0.6);
    ticking = false;
  };
  update();
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener("resize", update);
  REDUCED_MOTION.addEventListener("change", update);
}

/* ---------- Doftmätare som bränslemätare ---------- */
function initGauge() {
  const gauge = $("[data-gauge]");
  if (!gauge) return;
  const needle = $(".gauge__needle", gauge);
  const status = $(".gauge__status", gauge);
  const week = $(".gauge__week", gauge);
  const arc = $(".gauge__fill", gauge);
  const arcLen = arc ? arc.getTotalLength() : 0;
  if (arc) arc.style.strokeDasharray = `${arcLen}`;

  let ticking = false;
  const update = () => {
    const r = gauge.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 = full (F) när mätaren kommer in, 1 = tom (E) när den passerat mitten
    const p = clamp((vh * 0.9 - r.top) / (vh * 0.75));
    const angle = 90 - p * 180; // +90 = F (höger), -90 = E (vänster)
    needle.style.transform = `rotate(${angle}deg)`;
    if (arc) arc.style.strokeDashoffset = `${arcLen * p}`;
    const key = p < 0.35 ? "gauge.full" : p < 0.8 ? "gauge.half" : "gauge.low";
    if (status.dataset.key !== key) { status.dataset.key = key; status.textContent = I18N.t(key); }
    week.textContent = I18N.t("gauge.week", { n: p >= 0.99 ? 3 : Math.floor(p * 3) });
    gauge.classList.toggle("is-low", p >= 0.8);
    ticking = false;
  };
  update();
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener("resize", update);
  I18N.onChange(() => { status.dataset.key = ""; update(); });
}

/* ---------- Animerat pris ---------- */
function animateNumber(el, to) {
  const from = Number(el.dataset.value || to);
  el.dataset.value = to;
  if (REDUCED_MOTION.matches || from === to) { el.textContent = I18N.price(to); return; }
  const start = performance.now(), dur = 280;
  const step = now => {
    const p = clamp((now - start) / dur);
    el.textContent = I18N.price(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- Toast-meddelande ---------- */
function toast(html) {
  let el = $(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.innerHTML = html;
  el.classList.remove("is-visible"); void el.offsetWidth; el.classList.add("is-visible");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("is-visible"), 4200);
}
function addedToast() {
  toast(`<span class="toast__icon">${SVG.icons.check}</span><span>${I18N.t("builder.added")}</span>
    <a class="toast__link" href="kassa.html">${I18N.t("builder.goCheckout")} ${SVG.icons.arrow}</a>`);
}

/* ---------- Stegräknare (+/−) ---------- */
function stepper(root, { min = 0, max = 9, value = 0, onChange }) {
  const out = $(".stepper__value", root);
  const dec = $("[data-step='-1']", root);
  const inc = $("[data-step='1']", root);
  let v = value;
  const render = () => {
    out.textContent = v;
    dec.disabled = v <= min;
    inc.disabled = v >= max;
  };
  root.addEventListener("click", e => {
    const b = e.target.closest("[data-step]");
    if (!b) return;
    v = clamp(v + Number(b.dataset.step), min, max);
    render();
    onChange && onChange(v);
  });
  render();
  return { get value() { return v; }, set(n) { v = n; render(); } };
}

/* ---------- Paketbyggare med live-pris ---------- */
function initBuilder() {
  const root = $("[data-builder]");
  if (!root) return;

  let size = 2;
  let scents = [ScentState.current, ScentState.current, ScentState.current];

  const padsHost = $(".builder__pads", root);
  const totalEl = $(".builder__total-value", root);
  const ordinaryEl = $(".builder__ordinary-value", root);
  const ordinaryRow = $(".builder__ordinary", root);
  const saveEl = $(".builder__save", root);
  const lineEl = $(".builder__line", root);

  function renderPads() {
    padsHost.innerHTML = "";
    for (let i = 0; i < size; i++) {
      const row = document.createElement("div");
      row.className = "builder__pad";
      row.style.setProperty("--scent", scentById(scents[i]).farg);
      const label = document.createElement("div");
      label.className = "builder__pad-label";
      label.innerHTML = `<span class="builder__pad-dot" aria-hidden="true"></span>
        <span class="builder__pad-title">${I18N.t("builder.pad", { n: i + 1 })}</span>
        <span class="builder__pad-name">${scentById(scents[i]).namn}</span>`;
      const group = swatchGroup({
        name: `pad-${i}`,
        selected: scents[i],
        label: I18N.t("builder.pad", { n: i + 1 }),
        onSelect: id => {
          scents[i] = id;
          row.style.setProperty("--scent", scentById(id).farg);
          $(".builder__pad-name", row).textContent = scentById(id).namn;
        }
      });
      row.append(label, group);
      padsHost.appendChild(row);
    }
  }

  function renderPrice() {
    const packPrice = PRISER.pack[size];
    const ordinary = size * PRISER.pack[1];
    const save = ordinary - packPrice;
    animateNumber(totalEl, packPrice);
    ordinaryEl.textContent = I18N.price(ordinary);
    ordinaryRow.hidden = save <= 0;
    saveEl.hidden = save <= 0;
    if (save > 0) {
      saveEl.textContent = I18N.t("pack.save", { amount: I18N.price(save) });
      saveEl.classList.remove("is-pop"); void saveEl.offsetWidth; saveEl.classList.add("is-pop");
    }
    lineEl.textContent = I18N.t("builder.summaryPack", { n: size });
  }

  // Paketval
  $$("input[name='pack']", root).forEach(input => {
    if (Number(input.value) === size) input.checked = true;
    input.addEventListener("change", () => {
      size = Number(input.value);
      renderPads();
      renderPrice();
    });
  });

  $(".builder__add", root).addEventListener("click", e => {
    Cart.addPack(size, scents.slice(0, size));
    const btn = e.currentTarget;
    btn.classList.add("is-added");
    setTimeout(() => btn.classList.remove("is-added"), 900);
    addedToast();
  });

  // Doftväljaren ovanför styr standarddoften
  ScentState.onChange(id => { scents = scents.map(() => id); renderPads(); });
  I18N.onChange(() => { renderPads(); renderPrice(); });

  renderPads();
  renderPrice();
}

/* ---------- Refill-kort ---------- */
function initRefill() {
  const root = $("[data-refill]");
  if (!root) return;
  let scent = ScentState.current;
  let qty = 1;
  const host = $(".refill__swatches", root);
  const nameEl = $(".refill__scent-name", root);
  const totalEl = $(".refill__total", root);

  const setScent = id => {
    scent = id;
    nameEl.textContent = scentById(id).namn;
    root.style.setProperty("--scent", scentById(id).farg);
  };
  const group = swatchGroup({ name: "refill", selected: scent, label: I18N.t("refill.scent"), onSelect: setScent });
  host.appendChild(group);
  setScent(scent);

  const renderTotal = () => animateNumber(totalEl, qty * PRISER.refill);
  stepper($(".stepper", root), { min: 1, max: 9, value: 1, onChange: v => { qty = v; renderTotal(); } });
  renderTotal();
  I18N.onChange(renderTotal);

  $(".refill__add", root).addEventListener("click", () => {
    Cart.addRefill(scent, qty);
    addedToast();
  });
}

/* ---------- FAQ: bara en öppen åt gången ---------- */
function initFaq() {
  const items = $$(".faq details");
  items.forEach(d => d.addEventListener("toggle", () => {
    if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  initScentPicker();
  initExploded();
  initGauge();
  initBuilder();
  initRefill();
  initFaq();
});
