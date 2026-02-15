import { RuleTester } from "eslint";
import { describe } from "vitest";

const plugin = require("../../dist/index");

describe("accessible-clear-button", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  const rule = plugin.rules["accessible-clear-button"];

  ruleTester.run("accessible-clear-button", rule, {
    valid: [
      // Has label attribute
      {
        code: 'const t = html`<sp-clear-button label="Clear"></sp-clear-button>`;',
      },
      // Has label with other attributes
      {
        code: 'const t = html`<sp-clear-button label="Clear search" size="s"></sp-clear-button>`;',
      },
      // Self-closing with label
      {
        code: 'const t = html`<sp-clear-button label="Clear" />`;',
      },
      // Not a Lit html tag (should be ignored)
      {
        code: "const t = css`<sp-clear-button></sp-clear-button>`;",
      },
      // Different element (should be ignored)
      {
        code: 'const t = html`<sp-button variant="accent">OK</sp-button>`;',
      },
    ],
    invalid: [
      // Missing label
      {
        code: "const t = html`<sp-clear-button></sp-clear-button>`;",
        errors: [{ messageId: "missingLabel" }],
      },
      // Self-closing without label
      {
        code: "const t = html`<sp-clear-button />`;",
        errors: [{ messageId: "missingLabel" }],
      },
      // With other attributes but no label
      {
        code: 'const t = html`<sp-clear-button size="s" quiet></sp-clear-button>`;',
        errors: [{ messageId: "missingLabel" }],
      },
    ],
  });
});
