import { RuleTester } from "eslint";
import { describe } from "vitest";

const plugin = require("../../dist/index");

describe("accessible-dialog-wrapper", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  const rule = plugin.rules["accessible-dialog-wrapper"];

  ruleTester.run("accessible-dialog-wrapper", rule, {
    valid: [
      // Has headline attribute
      {
        code: 'const t = html`<sp-dialog-wrapper headline="Confirm action" confirm-label="OK">Are you sure?</sp-dialog-wrapper>`;',
      },
      // Has headline with other attributes
      {
        code: 'const t = html`<sp-dialog-wrapper headline="Delete Item" dismissable confirm-label="Delete" cancel-label="Cancel">This action cannot be undone.</sp-dialog-wrapper>`;',
      },
      // Not a Lit html tag (should be ignored)
      {
        code: "const t = css`<sp-dialog-wrapper>Content</sp-dialog-wrapper>`;",
      },
      // Different element (should be ignored)
      {
        code: "const t = html`<sp-dialog dismissable>Content</sp-dialog>`;",
      },
    ],
    invalid: [
      // Missing headline
      {
        code: 'const t = html`<sp-dialog-wrapper confirm-label="OK">Are you sure?</sp-dialog-wrapper>`;',
        errors: [{ messageId: "missingHeadline" }],
      },
      // Self-closing without headline
      {
        code: "const t = html`<sp-dialog-wrapper />`;",
        errors: [{ messageId: "missingHeadline" }],
      },
      // Empty element without headline
      {
        code: "const t = html`<sp-dialog-wrapper></sp-dialog-wrapper>`;",
        errors: [{ messageId: "missingHeadline" }],
      },
    ],
  });
});
