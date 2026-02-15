// ✅ PASS: accessible-avatar — all valid usage

// Avatar with label
const avatar1 = html`<sp-avatar
  label="User photo"
  src="photo.jpg"
></sp-avatar>`;

// Avatar marked as decorative
const avatar2 = html`<sp-avatar is-decorative src="photo.jpg"></sp-avatar>`;

// Decorative avatar with href AND label (valid)
const avatar3 = html`<sp-avatar
  is-decorative
  href="/profile"
  label="Go to profile"
  src="photo.jpg"
></sp-avatar>`;
