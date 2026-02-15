// ❌ FAIL: accessible-avatar — missing accessibility attributes

// Missing both label and is-decorative
const avatar1 = html`<sp-avatar src="photo.jpg"></sp-avatar>`;

// Decorative with href but no label (link inaccessible)
const avatar2 = html`<sp-avatar
  is-decorative
  href="/profile"
  src="photo.jpg"
></sp-avatar>`;
