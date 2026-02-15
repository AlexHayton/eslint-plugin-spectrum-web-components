import { RuleTester } from "eslint";
import { describe } from "vitest";

const plugin = require("../../dist/index");

describe("accessible-progress-bar", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  const rule = plugin.rules["accessible-progress-bar"];

  ruleTester.run("accessible-progress-bar", rule, {
    valid: [
      // Has label attribute
      {
        code: 'const t = html`<sp-progress-bar label="Loading" progress="50"></sp-progress-bar>`;',
      },
      // Has aria-label
      {
        code: 'const t = html`<sp-progress-bar aria-label="Upload progress" progress="75"></sp-progress-bar>`;',
      },
      // Has aria-labelledby
      {
        code: 'const t = html`<sp-progress-bar aria-labelledby="progress-label" progress="25"></sp-progress-bar>`;',
      },
      // Indeterminate with label
      {
        code: 'const t = html`<sp-progress-bar label="Processing" indeterminate></sp-progress-bar>`;',
      },
      // Not a Lit html tag (should be ignored)
      {
        code: 'const t = css`<sp-progress-bar progress="50"></sp-progress-bar>`;',
      },
      // Different element (should be ignored)
      {
        code: 'const t = html`<sp-progress-circle size="s" indeterminate></sp-progress-circle>`;',
      },
    ],
    invalid: [
      // Missing all label attributes
      {
        code: 'const t = html`<sp-progress-bar progress="50"></sp-progress-bar>`;',
        errors: [{ messageId: "missingLabel" }],
      },
      // Self-closing without label
      {
        code: "const t = html`<sp-progress-bar />`;",
        errors: [{ messageId: "missingLabel" }],
      },
      // Indeterminate without label
      {
        code: "const t = html`<sp-progress-bar indeterminate></sp-progress-bar>`;",
        errors: [{ messageId: "missingLabel" }],
      },
    ],
  });
});
