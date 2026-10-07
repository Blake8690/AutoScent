/* =========================================================
   Kassa: varukorg → doft per pad → leverans → Beställ
   → ordernummer, totalbelopp och Swish.
   ========================================================= */

const Checkout = (() => {
  let step = "cart";
  let lastOrder = null;

  const els = {};
  const tSv = (key, vars) => {
    let s = TRANSLATIONS.sv[key] || key;
    if (vars) Object.keys(vars).forEach(k => { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  };

  /* ---------- Steg ---------- */
  function goTo(next, { scroll = true } = {}) {
    step = next;
    $$(".co-step").forEach(s => {
      const active = s.dataset.step === next;
      s.hidden = !active;
      if (active) { s.classList.remove("is-enter"); void s.offsetWidth; s.classList.add("is-enter"); }
    });
    const order = ["cart", "delivery", "done"];
    const idx = order.indexOf(next);
    $$(".co-progress__item").forEach((li, i) => {
      li.classList.toggle("is-active", i === idx);
      li.classList.toggle("is-complete", i < idx);
      if (i === idx) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
    });
    document.body.dataset.coStep = next;
    if (scroll) window.scrollTo({ top: 0, behavior: REDUCED_MOTION.matches ? "auto" : "smooth" });
    const heading = $(`.co-step[data-step="${next}"] h2`);
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
  }

  /* ---------- Varukorg ---------- */
  function renderCart() {
    const list = els.list;
    const items = Cart.items;
    const empty = items.length === 0;
    els.empty.hidden = !empty;
    els.cartBody.hidden = empty;
    els.summary.hidden = empty && step !== "done";

    list.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.dataset.uid = item.uid;
      const title = item.type === "pack" ? I18N.t("co.packItem", { n: item.size }) : I18N.t("co.refillItem");
      const firstScent = item.type === "pack" ? item.scents[0] : item.scent;

      li.innerHTML = `
        <div class="cart-item__head">
          <div class="cart-item__thumb" style="--scent:${scentById(firstScent).farg}">
            ${item.type === "pack" ? SVG.pad() : `<div class="cart-item__drop">${SVG.drop()}</div>`}
            ${item.type === "pack" && item.size > 1 ? `<span class="cart-item__qty">×${item.size}</span>` : ""}
          </div>
          <div class="cart-item__meta">
            <h3 class="cart-item__title">${title}</h3>
            <p class="cart-item__sub">${item.type === "pack" ? I18N.t("co.chooseScent") : I18N.t("co.scent")}</p>
          </div>
          <div class="cart-item__price">${I18N.price(Cart.itemPrice(item))}</div>
          <button type="button" class="round-btn round-btn--ghost cart-item__remove" aria-label="${I18N.t("co.remove")}: ${title}">${SVG.icons.close}</button>
        </div>
        <div class="cart-item__scents"></div>`;

      const host = $(".cart-item__scents", li);
      const scents = item.type === "pack" ? item.scents : [item.scent];
      scents.forEach((s, i) => {
        const row = document.createElement("div");
        row.className = "cart-item__scent";
        row.style.setProperty("--scent", scentById(s).farg);
        const label = document.createElement("span");
        label.className = "cart-item__scent-label";
        label.innerHTML = `${item.type === "pack" ? `<b>${I18N.t("co.padLabel", { n: i + 1 })}</b>` : ""}<span>${scentById(s).namn}</span>`;
        const group = swatchGroup({
          name: `${item.uid}-${i}`,
          selected: s,
          label: item.type === "pack" ? I18N.t("co.padLabel", { n: i + 1 }) : I18N.t("co.scent"),
          onSelect: id => {
            row.style.setProperty("--scent", scentById(id).farg);
            label.lastElementChild.textContent = scentById(id).namn;
            if (i === 0) $(".cart-item__thumb", li).style.setProperty("--scent", scentById(id).farg);
            Cart.setScent(item.uid, id, i);
          }
        });
        row.append(label, group);
        host.appendChild(row);
      });

      $(".cart-item__remove", li).addEventListener("click", () => {
        li.classList.add("is-removing");
        setTimeout(() => Cart.remove(item.uid), REDUCED_MOTION.matches ? 0 : 220);
      });
      list.appendChild(li);
    });
    renderSummary();
  }

  /* ---------- Sammanfattning ---------- */
  function renderSummary(order) {
    const items = order ? order.items : Cart.items;
    const subtotal = order ? order.subtotal : Cart.subtotal();
    const total = subtotal + PRISER.frakt;
    els.sumLines.innerHTML = items.map(item => {
      const title = item.type === "pack" ? I18N.t("co.packItem", { n: item.size }) : I18N.t("co.refillItem");
      const scents = (item.type === "pack" ? item.scents : [item.scent]).map(s => scentById(s));
      return `<li>
        <div><span class="sum-title">${title}</span>
          <span class="sum-scents">${scents.map(s => `<i style="--c:${s.farg}" title="${s.namn}"></i>`).join("")}
          <span class="visually-hidden">${scents.map(s => s.namn).join(", ")}</span></span></div>
        <span>${I18N.price(Cart.itemPrice(item))}</span></li>`;
    }).join("");
    els.subtotal.textContent = I18N.price(subtotal);
    els.shipping.textContent = I18N.price(PRISER.frakt);
    els.total.textContent = I18N.price(total);
  }

  /* ---------- Formulär ---------- */
  function validate(form) {
    let ok = true;
    $$("input", form).forEach(input => {
      const field = input.closest(".field");
      const msg = $(".field__error", field);
      let error = "";
      const v = input.value.trim();
      if (input.required && !v) error = I18N.t("co.required");
      else if (input.name === "zip" && v && !/^\d{3}\s?\d{2}$/.test(v)) error = I18N.t("co.zipInvalid");
      else if (input.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) error = I18N.t("co.emailInvalid");
      field.classList.toggle("is-invalid", !!error);
      input.setAttribute("aria-invalid", error ? "true" : "false");
      if (msg) msg.textContent = error;
      if (error && ok) { input.focus(); ok = false; }
    });
    return ok;
  }

  function orderNumber() {
    const d = new Date();
    const pad = n => String(n).padStart(2, "0");
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `AS-${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${rand}`;
  }

  /* ---------- EmailJS ---------- */
  function emailConfigured() {
    return typeof emailjs !== "undefined" &&
      !Object.values(EMAILJS).some(v => !v || v.startsWith("DIN_"));
  }

  async function sendOrderEmail(order) {
    if (!emailConfigured()) {
      console.warn("[AutoScent] EmailJS är inte konfigurerat – fyll i nycklarna i js/config.js. Ordern:", order);
      return "skipped";
    }
    const lines = order.items.map(item => {
      const price = `${Cart.itemPrice(item)} kr`;
      if (item.type === "pack") {
        const scents = item.scents.map((s, i) => `   Pad ${i + 1}: ${scentById(s).namn}`).join("\n");
        return `${tSv("co.packItem", { n: item.size })} – ${price}\n${scents}`;
      }
      return `${tSv("co.refillItem")} – ${price}\n   ${scentById(item.scent).namn}`;
    }).join("\n\n");

    const c = order.customer;
    const params = {
      to_email: KONTAKT.epost,
      order_number: order.number,
      customer_name: c.name,
      customer_address: `${c.street}, ${c.zip} ${c.city}`,
      customer_email: c.email || "–",
      customer_phone: c.phone || "–",
      order_items: lines,
      subtotal: `${order.subtotal} kr`,
      shipping: `${PRISER.frakt} kr`,
      total: `${order.total} kr`,
      language: I18N.lang
    };
    // Avbryt efter 10 s så att kunden inte väntar för evigt
    const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 10000));
    await Promise.race([
      emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_ID, params, { publicKey: EMAILJS.PUBLIC_KEY }),
      timeout
    ]);
    return "sent";
  }

  /* ---------- Swish ---------- */
  const swishDigits = () => SWISH_NUMMER.replace(/\D/g, "");
  const swishReady = () => SWISH_NUMMER !== "KOMMER" && swishDigits().length >= 8;
  const isMobile = () =>
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 900);

  // Swish QR-format: C<nummer>;<belopp>;<meddelande>;<låsta fält>
  function swishQrData(order) {
    return `C${swishDigits()};${order.total};${order.number};0`;
  }
  // Swish-länk för mobil (öppnar appen med ifyllt belopp och meddelande)
  function swishAppLink(order) {
    const data = {
      version: 1,
      payee: { value: swishDigits() },
      amount: { value: order.total },
      message: { value: order.number, editable: false }
    };
    return `swish://payment?data=${encodeURIComponent(JSON.stringify(data))}`;
  }

  function renderSwish(order, mode) {
    const box = els.swish;
    if (!swishReady()) {
      box.innerHTML = `<p class="swish__pending">${I18N.t("co.swishPending")}</p>`;
      return;
    }
    const mobile = mode ? mode === "mobile" : isMobile();
    const number = `<p class="swish__to">${I18N.t("co.swishTo")} <strong>${SWISH_NUMMER}</strong></p>`;
    if (mobile) {
      box.innerHTML = `
        <a class="btn btn--primary btn--swish" href="${swishAppLink(order)}">${I18N.t("co.openSwish")} ${SVG.icons.arrow}</a>
        ${number}
        <button type="button" class="link-btn swish__switch" data-mode="desktop">${I18N.t("co.showQr")}</button>`;
    } else {
      box.innerHTML = `
        <div class="swish__qr" role="img" aria-label="${I18N.t("co.scanQr")}"></div>
        <p class="swish__hint">${I18N.t("co.scanQr")}</p>
        ${number}
        <button type="button" class="link-btn swish__switch" data-mode="mobile">${I18N.t("co.showButton")}</button>`;
      const qrHost = $(".swish__qr", box);
      if (typeof QRCode !== "undefined") {
        new QRCode(qrHost, {
          text: swishQrData(order), width: 220, height: 220,
          colorDark: "#0f1620", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M
        });
      } else {
        qrHost.textContent = swishQrData(order);
      }
    }
    $(".swish__switch", box).addEventListener("click", e => renderSwish(order, e.currentTarget.dataset.mode));
  }

  /* ---------- Bekräftelse ---------- */
  function renderDone(order) {
    els.orderNo.textContent = order.number;
    els.orderTotal.textContent = I18N.price(order.total);
    const c = order.customer;
    els.address.textContent = `${c.name}, ${c.street}, ${c.zip} ${c.city}`;
    els.mailStatus.hidden = order.mail === "skipped";
    els.mailStatus.className = `co-mail co-mail--${order.mail}`;
    els.mailStatus.textContent = order.mail === "sent" ? I18N.t("co.mailOk")
      : order.mail === "failed" ? I18N.t("co.mailFail", { email: KONTAKT.epost }) : "";
    renderSwish(order);
    renderSummary(order);
    els.summary.hidden = false;
  }

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validate(form)) return;
    if (Cart.count() === 0) { goTo("cart"); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    Object.keys(data).forEach(k => { data[k] = String(data[k]).trim(); });
    const subtotal = Cart.subtotal();
    const order = {
      number: orderNumber(),
      items: JSON.parse(JSON.stringify(Cart.items)),
      subtotal,
      total: subtotal + PRISER.frakt,
      customer: data,
      mail: "skipped"
    };

    const btn = $("button[type='submit']", form);
    btn.disabled = true;
    btn.classList.add("is-loading");
    $(".btn__label", btn).textContent = I18N.t("co.sending");

    try { order.mail = await sendOrderEmail(order); }
    catch (err) { console.error("[AutoScent] Kunde inte skicka ordern:", err); order.mail = "failed"; }

    btn.disabled = false;
    btn.classList.remove("is-loading");
    $(".btn__label", btn).textContent = I18N.t("co.order");

    lastOrder = order;
    try { sessionStorage.setItem("autoscent-last-order", JSON.stringify(order)); } catch (err) {}
    Cart.clear();
    form.reset();
    renderDone(order);
    goTo("done");
  }

  function init() {
    if (!$("[data-checkout]")) return;
    Object.assign(els, {
      list: $(".cart-list"),
      empty: $(".co-empty"),
      cartBody: $(".co-cart-body"),
      summary: $(".co-summary"),
      sumLines: $(".co-summary__lines"),
      subtotal: $(".co-subtotal"),
      shipping: $(".co-shipping"),
      total: $(".co-total"),
      orderNo: $(".co-order-no"),
      orderTotal: $(".co-order-total"),
      address: $(".co-address"),
      mailStatus: $(".co-mail"),
      swish: $(".swish")
    });

    $(".co-add-refill").addEventListener("click", () => {
      const last = Cart.items[Cart.items.length - 1];
      const scent = last ? (last.type === "pack" ? last.scents[0] : last.scent) : DOFTER[0].id;
      Cart.addRefill(scent, 1);
    });
    $(".co-next").addEventListener("click", () => { if (Cart.count()) goTo("delivery"); });
    $(".co-back").addEventListener("click", () => goTo("cart"));
    $(".co-form").addEventListener("submit", submit);
    $$(".co-form input").forEach(input => input.addEventListener("input", () => {
      input.closest(".field").classList.remove("is-invalid");
      input.setAttribute("aria-invalid", "false");
    }));

    Cart.onChange(() => { if (step !== "done") renderCart(); });
    I18N.onChange(() => {
      if (step === "done" && lastOrder) renderDone(lastOrder);
      else renderCart();
    });

    renderCart();
    goTo("cart", { scroll: false });
    if (EMAILJS.PUBLIC_KEY && !EMAILJS.PUBLIC_KEY.startsWith("DIN_") && typeof emailjs !== "undefined") {
      emailjs.init({ publicKey: EMAILJS.PUBLIC_KEY });
    }
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", Checkout.init);
