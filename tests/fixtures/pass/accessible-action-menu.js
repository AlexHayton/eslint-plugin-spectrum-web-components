// Valid: action-menu with label
const actionMenuWithLabel = html`<sp-action-menu label="Actions"
  ><sp-menu-item>Cut</sp-menu-item></sp-action-menu
>`;

// Valid: action-menu with aria-label
const actionMenuWithAriaLabel = html`<sp-action-menu aria-label="More actions"
  ><sp-menu-item>Copy</sp-menu-item></sp-action-menu
>`;

// Valid: action-menu with aria-labelledby
const actionMenuWithAriaLabelledby = html`<sp-action-menu
  aria-labelledby="menu-label"
  ><sp-menu-item>Paste</sp-menu-item></sp-action-menu
>`;
