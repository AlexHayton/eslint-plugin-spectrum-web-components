import { RuleTester } from "eslint";
import { describe } from "vitest";

const plugin = require("../../dist/index");

describe("accessible-action-menu", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  const rule = plugin.rules["accessible-action-menu"];

  ruleTester.run("accessible-action-menu", rule, {
    valid: [
      // Has label attribute
      {
        code: 'const t = html`<sp-action-menu label="Actions"><sp-menu-item>Cut</sp-menu-item></sp-action-menu>`;',
      },
      // Has aria-label
      {
        code: 'const t = html`<sp-action-menu aria-label="More actions"><sp-menu-item>Copy</sp-menu-item></sp-action-menu>`;',
      },
      // Has aria-labelledby
      {
        code: 'const t = html`<sp-action-menu aria-labelledby="menu-label"><sp-menu-item>Paste</sp-menu-item></sp-action-menu>`;',
      },
      // Not a Lit html tag (should be ignored)
      {
        code: "const t = css`<sp-action-menu><sp-menu-item>Cut</sp-menu-item></sp-action-menu>`;",
      },
      // Different element (should be ignored)
      {
        code: 'const t = html`<sp-button variant="accent">OK</sp-button>`;',
      },
    ],
    invalid: [
      // Missing all label attributes
      {
        code: "const t = html`<sp-action-menu><sp-menu-item>Cut</sp-menu-item></sp-action-menu>`;",
        errors: [{ messageId: "missingLabel" }],
      },
      // Self-closing without label
      {
        code: "const t = html`<sp-action-menu />`;",
        errors: [{ messageId: "missingLabel" }],
      },
    ],
  });
});
