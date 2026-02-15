// ✅ PASS: validate-theme-context — all required attributes present

const theme1 = html`<sp-theme color="light" scale="medium" system="spectrum">
  <slot></slot>
</sp-theme>`;

const theme2 = html`<sp-theme color="dark" scale="large" system="express">
  <div>Content</div>
</sp-theme>`;
