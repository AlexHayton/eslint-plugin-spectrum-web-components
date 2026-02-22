# eslint-plugin-spectrum-web-components

ESLint plugin for Spectrum Web Components dev mode checks.

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```bash
npm i eslint --save-dev
```

Next, install `eslint-plugin-spectrum-web-components`:

```bash
npm install @alexhayton/eslint-plugin-spectrum-web-components --save-dev
```

## Usage

### Flat Config (ESLint 9+)

Add `@alexhayton/spectrum-web-components` to the plugins section of your `eslint.config.mjs` configuration file. You can omit the `eslint-plugin-` prefix:

```javascript
import spectrumWebComponents from "@alexhayton/eslint-plugin-spectrum-web-components";

export default [
    {
        files: ["**/*.js", "**/*.ts"],
        plugins: {
            "@alexhayton/spectrum-web-components": spectrumWebComponents
        },
        rules: {
            ...spectrumWebComponents.configs.recommended.rules
        }
    }
];
```

### Legacy Config (ESLint 8)

Add `@alexhayton/spectrum-web-components` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@alexhayton/spectrum-web-components"
    ],
    "rules": {
        "@alexhayton/spectrum-web-components/accessible-action-menu": "warn",
        "@alexhayton/spectrum-web-components/accessible-avatar": "warn",
        "@alexhayton/spectrum-web-components/accessible-clear-button": "warn",
        "@alexhayton/spectrum-web-components/accessible-dialog-wrapper": "warn",
        "@alexhayton/spectrum-web-components/accessible-picker": "warn",
        "@alexhayton/spectrum-web-components/accessible-progress-bar": "warn",
        "@alexhayton/spectrum-web-components/no-deprecated-options": "warn",
        "@alexhayton/spectrum-web-components/overlay-trigger-triggered-by": "warn",
        "@alexhayton/spectrum-web-components/validate-theme-context": "warn"
    }
}
```

## Rules

### accessible-action-menu

Require accessible labeling on `<sp-action-menu>` elements.

**Fail**
```javascript
html`<sp-action-menu></sp-action-menu>`;
```

**Pass**
```javascript
html`<sp-action-menu label="More actions"></sp-action-menu>`;
html`<sp-action-menu aria-label="More actions"></sp-action-menu>`;
html`<sp-action-menu aria-labelledby="some-id"></sp-action-menu>`;
```

### accessible-avatar

Require accessible attributes on `<sp-avatar>` elements.

**Fail**
```javascript
html`<sp-avatar></sp-avatar>`;
html`<sp-avatar is-decorative href="#"></sp-avatar>`;
```

**Pass**
```javascript
html`<sp-avatar label="User Name"></sp-avatar>`;
html`<sp-avatar is-decorative></sp-avatar>`;
html`<sp-avatar is-decorative label="User Name" href="#"></sp-avatar>`;
```

### accessible-clear-button

Require a label attribute on `<sp-clear-button>` elements for screen reader accessibility.

**Fail**
```javascript
html`<sp-clear-button></sp-clear-button>`;
```

**Pass**
```javascript
html`<sp-clear-button label="Clear"></sp-clear-button>`;
```

### accessible-dialog-wrapper

Require a headline attribute on `<sp-dialog-wrapper>` elements for screen reader accessibility.

**Fail**
```javascript
html`<sp-dialog-wrapper></sp-dialog-wrapper>`;
```

**Pass**
```javascript
html`<sp-dialog-wrapper headline="Dialog Title"></sp-dialog-wrapper>`;
```

### accessible-picker

Require accessible labeling on `<sp-picker>` elements.

**Fail**
```javascript
html`<sp-picker></sp-picker>`;
```

**Pass**
```javascript
html`<sp-picker label="Select an option"></sp-picker>`;
html`<sp-picker aria-label="Select an option"></sp-picker>`;
html`<sp-picker aria-labelledby="some-id"></sp-picker>`;
```

### accessible-progress-bar

Require accessible labeling on `<sp-progress-bar>` elements.

**Fail**
```javascript
html`<sp-progress-bar></sp-progress-bar>`;
```

**Pass**
```javascript
html`<sp-progress-bar label="Loading..."></sp-progress-bar>`;
html`<sp-progress-bar aria-label="Loading..."></sp-progress-bar>`;
html`<sp-progress-bar aria-labelledby="some-id"></sp-progress-bar>`;
```

### no-deprecated-options

Disallow deprecated attribute values and attributes on Spectrum Web Components.

**Fail**
```javascript
html`<sp-button variant="cta">Click me</sp-button>`;
html`<sp-theme color="lightest"></sp-theme>`;
html`<sp-overlay allow-outside-click></sp-overlay>`;
```

**Pass**
```javascript
html`<sp-button variant="accent">Click me</sp-button>`;
html`<sp-theme color="light"></sp-theme>`;
html`<sp-overlay></sp-overlay>`;
```

### overlay-trigger-triggered-by

Require `triggered-by` attribute on `<overlay-trigger>` elements for performance optimization.

**Fail**
```javascript
html`<overlay-trigger>content</overlay-trigger>`;
```

**Pass**
```javascript
html`<overlay-trigger triggered-by="click hover">content</overlay-trigger>`;
```

### validate-theme-context

Require color, scale, and system attributes on `<sp-theme>` elements.

**Fail**
```javascript
html`<sp-theme></sp-theme>`;
html`<sp-theme color="light"></sp-theme>`;
```

**Pass**
```javascript
html`<sp-theme color="light" scale="medium" system="spectrum"></sp-theme>`;
```
