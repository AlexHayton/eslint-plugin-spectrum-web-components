// Valid: progress-bar with label
const progressWithLabel = html`<sp-progress-bar
  label="Loading"
  progress="50"
></sp-progress-bar>`;

// Valid: progress-bar with aria-label
const progressWithAriaLabel = html`<sp-progress-bar
  aria-label="Upload progress"
  progress="75"
></sp-progress-bar>`;

// Valid: progress-bar with aria-labelledby
const progressWithAriaLabelledby = html`<sp-progress-bar
  aria-labelledby="progress-label"
  progress="25"
></sp-progress-bar>`;
