import spectrumWebComponents from "../../dist/index.js";

export default [
  {
    files: ["**/*.js"],
    plugins: {
      "@alexhayton/spectrum-web-components": spectrumWebComponents,
    },
    rules: {
      "@alexhayton/spectrum-web-components/no-deprecated-options": "error",
      "@alexhayton/spectrum-web-components/accessible-avatar": "error",
      "@alexhayton/spectrum-web-components/accessible-action-menu": "error",
      "@alexhayton/spectrum-web-components/accessible-picker": "error",
      "@alexhayton/spectrum-web-components/accessible-dialog-wrapper": "error",
      "@alexhayton/spectrum-web-components/accessible-progress-bar": "error",
      "@alexhayton/spectrum-web-components/accessible-clear-button": "error",
      "@alexhayton/spectrum-web-components/validate-theme-context": "error",
    },
  },
];
