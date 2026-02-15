// ❌ FAIL: no-deprecated-options — deprecated button variants

// Deprecated: variant="cta" → use variant="accent"
const button1 = html`<sp-button variant="cta">OK</sp-button>`;

// Deprecated: variant="overBackground" → use static-color="white" + treatment="outline"
const button2 = html`<sp-button variant="overBackground">OK</sp-button>`;

// Deprecated: variant="white" → use static-color="white"
const button3 = html`<sp-button variant="white">OK</sp-button>`;

// Deprecated: variant="black" → use static-color="black"
const button4 = html`<sp-button variant="black">OK</sp-button>`;

// Deprecated: color="lightest" on sp-theme
const theme1 = html`<sp-theme
  color="lightest"
  scale="medium"
  system="spectrum"
></sp-theme>`;

// Deprecated: color="darkest" on sp-theme
const theme2 = html`<sp-theme
  color="darkest"
  scale="medium"
  system="spectrum"
></sp-theme>`;

// Deprecated: allow-outside-click on sp-overlay
const overlay1 = html`<sp-overlay allow-outside-click></sp-overlay>`;

// Deprecated: text content in sp-slider default slot
const slider1 = html`<sp-slider>Volume</sp-slider>`;
