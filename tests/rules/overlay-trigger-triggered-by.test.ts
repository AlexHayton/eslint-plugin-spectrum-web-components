import { RuleTester } from "eslint";
import { describe } from "vitest";

const plugin = require("../../dist/index");

describe("overlay-trigger-triggered-by", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  const rule = plugin.rules["overlay-trigger-triggered-by"];

  ruleTester.run("overlay-trigger-triggered-by", rule, {
    valid: [
      // triggered-by attribute present
      {
        code: 'const t = html`<overlay-trigger triggered-by="click hover">content</overlay-trigger>`;',
      },
      // .triggeredBy property binding
      {
        code: 'const t = html`<overlay-trigger .triggeredBy=${"click"}>content</overlay-trigger>`;',
      },
      // triggeredBy attribute (camelCase fallback)
      {
        code: 'const t = html`<overlay-trigger triggeredBy="click">content</overlay-trigger>`;',
      },
      // Not a Lit template (should be ignored)
      {
        code: "const t = css`<overlay-trigger></overlay-trigger>`;",
      },
      // Different tag (should be ignored)
      {
        code: 'const t = html`<sp-overlay open>content</sp-overlay>`;',
      },
    ],
    invalid: [
      // Missing triggered-by
      {
        code: "const t = html`<overlay-trigger>content</overlay-trigger>`;",
        errors: [{ messageId: "missingTriggeredBy" }],
      },
      // Missing triggered-by with other attributes
      {
        code: 'const t = html`<overlay-trigger placement="bottom">content</overlay-trigger>`;',
        errors: [{ messageId: "missingTriggeredBy" }],
      },
    ],
  });
});
