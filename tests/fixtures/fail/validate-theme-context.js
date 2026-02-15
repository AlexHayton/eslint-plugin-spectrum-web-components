// ❌ FAIL: validate-theme-context — missing required attributes

// Missing all three: color, scale, system
const theme1 = html`<sp-theme></sp-theme>`;

// Missing color
const theme2 = html`<sp-theme scale="medium" system="spectrum"></sp-theme>`;

// Missing scale
const theme3 = html`<sp-theme color="light" system="spectrum"></sp-theme>`;

// Missing system
const theme4 = html`<sp-theme color="light" scale="medium"></sp-theme>`;
