// Valid: picker with label
const pickerWithLabel = html`<sp-picker label="Choose"
  ><sp-menu-item value="1">Option 1</sp-menu-item></sp-picker
>`;

// Valid: picker with aria-label
const pickerWithAriaLabel = html`<sp-picker aria-label="Select"
  ><sp-menu-item value="1">Option 1</sp-menu-item></sp-picker
>`;

// Valid: picker with aria-labelledby
const pickerWithAriaLabelledby = html`<sp-picker aria-labelledby="picker-label"
  ><sp-menu-item value="1">Option 1</sp-menu-item></sp-picker
>`;
