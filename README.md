# eslint-plugin-spectrum-web-components

ESLint plugin for Spectrum Web Components dev mode checks.

## Rules

### accessible-action-menu

Requiring accessible labeling on `<sp-action-menu>` elements ensures that screen reader users can understand the purpose of the menu.

**Fail**
```html
<sp-action-menu></sp-action-menu>
```

**Pass**
```html
<sp-action-menu label="More Actions"></sp-action-menu>
<sp-action-menu aria-label="More Actions"></sp-action-menu>
<sp-action-menu aria-labelledby="label-id"></sp-action-menu>
```

### accessible-avatar

Requiring accessible attributes on `<sp-avatar>` elements ensures that the avatar is either labeled for screen readers or marked as decorative if it provides no content value.

**Fail**
```html
<sp-avatar></sp-avatar>
<sp-avatar is-decorative href="#"></sp-avatar>
```

**Pass**
```html
<sp-avatar label="User Avatar"></sp-avatar>
<sp-avatar is-decorative></sp-avatar>
<sp-avatar is-decorative href="#" label="User Profile"></sp-avatar>
```

### accessible-clear-button

Requiring a label attribute on `<sp-clear-button>` elements provides an accessible name for screen readers.

**Fail**
```html
<sp-clear-button></sp-clear-button>
```

**Pass**
```html
<sp-clear-button label="Clear"></sp-clear-button>
```

### accessible-dialog-wrapper

Requiring a headline attribute on `<sp-dialog-wrapper>` elements ensures that the dialog has a title that is accessible to screen readers.

**Fail**
```html
<sp-dialog-wrapper></sp-dialog-wrapper>
```

**Pass**
```html
<sp-dialog-wrapper headline="Dialog Title"></sp-dialog-wrapper>
```

### accessible-picker

Requiring accessible labeling on `<sp-picker>` elements ensures that screen reader users can understand the purpose of the picker.

**Fail**
```html
<sp-picker></sp-picker>
```

**Pass**
```html
<sp-picker label="Select an option"></sp-picker>
<sp-picker aria-label="Select an option"></sp-picker>
<sp-picker aria-labelledby="label-id"></sp-picker>
```

### accessible-progress-bar

Requiring accessible labeling on `<sp-progress-bar>` elements ensures that screen reader users can understand what the progress bar represents.

**Fail**
```html
<sp-progress-bar></sp-progress-bar>
```

**Pass**
```html
<sp-progress-bar label="Loading"></sp-progress-bar>
<sp-progress-bar aria-label="Loading"></sp-progress-bar>
<sp-progress-bar aria-labelledby="label-id"></sp-progress-bar>
```

### no-deprecated-options

Disallows deprecated attribute values and attributes on Spectrum Web Components to encourage using the latest recommended practices.

**Fail**
```html
<sp-button variant="cta">Click me</sp-button>
<sp-theme color="lightest"></sp-theme>
<sp-overlay allow-outside-click></sp-overlay>
<sp-slider>Slider Label</sp-slider>
```

**Pass**
```html
<sp-button variant="accent">Click me</sp-button>
<sp-theme color="light"></sp-theme>
<sp-overlay></sp-overlay>
<sp-slider label="Slider Label"></sp-slider>
```

### validate-theme-context

Requires `color`, `scale`, and `system` attributes on `<sp-theme>` elements to ensure proper theming configuration.

**Fail**
```html
<sp-theme></sp-theme>
<sp-theme color="light"></sp-theme>
```

**Pass**
```html
<sp-theme color="light" scale="medium" system="spectrum"></sp-theme>
```
