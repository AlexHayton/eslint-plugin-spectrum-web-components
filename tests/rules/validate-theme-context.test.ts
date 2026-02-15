import { RuleTester } from "eslint";
import { describe } from "vitest";

const plugin = require("../../dist/index");

describe("validate-theme-context", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  const rule = plugin.rules["validate-theme-context"];

  ruleTester.run("validate-theme-context", rule, {
    valid: [
      // All attributes present
      {
        code: 'const t = html`<sp-theme color="light" scale="medium" system="spectrum"><slot></slot></sp-theme>`;',
      },
      // Not a Lit template (should be ignored)
      {
        code: "const t = css`<sp-theme></sp-theme>`;",
      },
      // Different tag (should be ignored)
      {
        code: 'const t = html`<sp-button variant="accent">OK</sp-button>`;',
      },
    ],
    invalid: [
      // Missing all three
      {
        code: "const t = html`<sp-theme></sp-theme>`;",
        errors: [
          { messageId: "missingColor" },
          { messageId: "missingScale" },
          { messageId: "missingSystem" },
        ],
      },
      // Missing color only
      {
        code: 'const t = html`<sp-theme scale="medium" system="spectrum"></sp-theme>`;',
        errors: [{ messageId: "missingColor" }],
      },
      // Missing scale only
      {
        code: 'const t = html`<sp-theme color="light" system="spectrum"></sp-theme>`;',
        errors: [{ messageId: "missingScale" }],
      },
      // Missing system only
      {
        code: 'const t = html`<sp-theme color="light" scale="medium"></sp-theme>`;',
        errors: [{ messageId: "missingSystem" }],
      },
    ],
  });
});
