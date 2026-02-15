import spectrumWebComponents from "../../dist/index.js";

export default [
  {
    files: ["**/*.js"],
    plugins: {
      "spectrum-web-components": spectrumWebComponents,
    },
    rules: {
      "spectrum-web-components/no-deprecated-options": "error",
      "spectrum-web-components/accessible-avatar": "error",
      "spectrum-web-components/accessible-action-menu": "error",
      "spectrum-web-components/accessible-picker": "error",
      "spectrum-web-components/accessible-dialog-wrapper": "error",
      "spectrum-web-components/accessible-progress-bar": "error",
      "spectrum-web-components/accessible-clear-button": "error",
      "spectrum-web-components/validate-theme-context": "error",
    },
  },
];
