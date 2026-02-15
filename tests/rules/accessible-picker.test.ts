import { RuleTester } from "eslint";
import { describe } from "vitest";

const plugin = require("../../dist/index");

describe("accessible-picker", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  const rule = plugin.rules["accessible-picker"];

  ruleTester.run("accessible-picker", rule, {
    valid: [
      // Has label attribute
      {
        code: 'const t = html`<sp-picker label="Choose an option"><sp-menu-item value="1">Option 1</sp-menu-item></sp-picker>`;',
      },
      // Has aria-label
      {
        code: 'const t = html`<sp-picker aria-label="Select item"><sp-menu-item value="1">Option 1</sp-menu-item></sp-picker>`;',
      },
      // Has aria-labelledby
      {
        code: 'const t = html`<sp-picker aria-labelledby="picker-label"><sp-menu-item value="1">Option 1</sp-menu-item></sp-picker>`;',
      },
      // Not a Lit html tag (should be ignored)
      {
        code: "const t = css`<sp-picker><sp-menu-item>Opt</sp-menu-item></sp-picker>`;",
      },
      // Different element (should be ignored)
      {
        code: 'const t = html`<sp-button variant="accent">OK</sp-button>`;',
      },
    ],
    invalid: [
      // Missing all label attributes
      {
        code: 'const t = html`<sp-picker><sp-menu-item value="1">Option 1</sp-menu-item></sp-picker>`;',
        errors: [{ messageId: "missingLabel" }],
      },
      // Self-closing without label
      {
        code: "const t = html`<sp-picker />`;",
        errors: [{ messageId: "missingLabel" }],
      },
      // Has value but no label
      {
        code: 'const t = html`<sp-picker value="1"><sp-menu-item value="1">Option 1</sp-menu-item></sp-picker>`;',
        errors: [{ messageId: "missingLabel" }],
      },
    ],
  });
});
