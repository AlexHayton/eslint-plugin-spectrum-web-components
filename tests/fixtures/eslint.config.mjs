import spectrumWebComponents from "../../dist/index.js";

export default [
  {
    files: ["**/*.js"],
    plugins: {
      "spectrum-web-components": spectrumWebComponents,
    },
    rules: {
      "spectrum-web-components/no-deprecated-options": "warn",
      "spectrum-web-components/accessible-avatar": "warn",
      "spectrum-web-components/accessible-action-menu": "warn",
      "spectrum-web-components/accessible-picker": "warn",
      "spectrum-web-components/accessible-dialog-wrapper": "warn",
      "spectrum-web-components/accessible-progress-bar": "warn",
      "spectrum-web-components/accessible-clear-button": "warn",
      "spectrum-web-components/validate-theme-context": "warn",
    },
  },
];
