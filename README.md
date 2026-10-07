# AutoScent UF – hemsida

Doftpads till bilen från Vimmerby. *Liten detalj. Stor skillnad.*

Ren HTML, CSS och JavaScript – inget byggsteg. Öppna `index.html` direkt eller
lägg upp mappen på valfritt webbhotell (t.ex. GitHub Pages, Netlify).

## Sidor

| Fil | Innehåll |
| --- | --- |
| `index.html` | Hem: hero med roterande emblem, så funkar det, produkten i delar, doftväljare, paket, FAQ |
| `produkt.html` | Produkt & dofter: doftväljare, paketbyggare med live-pris, doftmätare + refill |
| `kassa.html` | Kassa: varukorg → doft per pad → leverans → Beställ → ordernummer + Swish |

## Att fylla i innan lansering

Allt ligger i **`js/config.js`**:

- `SWISH_NUMMER` – står på `"KOMMER"` tills vidare. Då visas ett meddelande
  istället för QR-kod/knapp. Skriv in numret (t.ex. `"123 456 78 90"`) så visas
  Swish-QR på dator och "Öppna Swish"-knapp på mobil automatiskt.
- `EMAILJS` – `PUBLIC_KEY`, `SERVICE_ID` och `TEMPLATE_ID` från
  [EmailJS](https://dashboard.emailjs.com). Tills nycklarna finns loggas ordern
  bara i webbläsarens konsol.

### EmailJS-mall

Skapa en mall med mottagare `{{to_email}}` och t.ex. detta innehåll:

```
Ny beställning {{order_number}}

Kund: {{customer_name}}
Adress: {{customer_address}}
E-post: {{customer_email}}
Telefon: {{customer_phone}}

{{order_items}}

Delsumma: {{subtotal}}
Frakt: {{shipping}}
Totalt: {{total}}
```

## Övrigt

- **Texter/översättningar:** alla texter (svenska + engelska) finns i `js/i18n.js`.
- **Priser och dofter:** `js/config.js` (`PRISER`, `DOFTER`).
- **Bilder:** se `images/README.md`. Sidan fungerar med inbyggda SVG-platshållare
  tills riktiga bilder läggs in.
- **Tillgänglighet:** `prefers-reduced-motion` stänger av animationer,
  tangentbordsnavigering fungerar i doftväljaren (piltangenter).
