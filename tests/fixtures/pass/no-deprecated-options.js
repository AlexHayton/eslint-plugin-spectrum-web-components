// ✅ PASS: no-deprecated-options — all valid usage

// Valid button variants
const button1 = html`<sp-button variant="accent">OK</sp-button>`;
const button2 = html`<sp-button variant="primary">Save</sp-button>`;
const button3 = html`<sp-button variant="secondary">Cancel</sp-button>`;
const button4 = html`<sp-button variant="negative">Delete</sp-button>`;

// Button with no variant (valid)
const button5 = html`<sp-button>Click me</sp-button>`;

// Valid theme colors
const theme1 = html`<sp-theme
  color="light"
  scale="medium"
  system="spectrum"
></sp-theme>`;
const theme2 = html`<sp-theme
  color="dark"
  scale="large"
  system="express"
></sp-theme>`;

// Overlay without deprecated attribute
const overlay1 = html`<sp-overlay trigger="button@click"></sp-overlay>`;

// Slider with label attribute (not text content)
const slider1 = html`<sp-slider label="Volume" value="50"></sp-slider>`;
