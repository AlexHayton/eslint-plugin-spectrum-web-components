import { RuleTester } from "eslint";
import { describe } from "vitest";

const plugin = require("../../dist/index");

describe("accessible-avatar", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  const rule = plugin.rules["accessible-avatar"];

  ruleTester.run("accessible-avatar", rule, {
    valid: [
      // Has label
      {
        code: 'const t = html`<sp-avatar label="User photo" src="photo.jpg"></sp-avatar>`;',
      },
      // Is decorative (no href)
      {
        code: 'const t = html`<sp-avatar is-decorative src="photo.jpg"></sp-avatar>`;',
      },
      // Is decorative with href AND label
      {
        code: 'const t = html`<sp-avatar is-decorative href="/profile" label="Profile" src="photo.jpg"></sp-avatar>`;',
      },
      // Not an sp-avatar (should be ignored)
      {
        code: 'const t = html`<img src="photo.jpg" />`;',
      },
      // Not a Lit html tag (should be ignored)
      {
        code: 'const t = css`<sp-avatar src="photo.jpg"></sp-avatar>`;',
      },
    ],
    invalid: [
      // Missing both label and is-decorative
      {
        code: 'const t = html`<sp-avatar src="photo.jpg"></sp-avatar>`;',
        errors: [{ messageId: "missingLabelOrDecorative" }],
      },
      // Missing both label and is-decorative (self-closing)
      {
        code: 'const t = html`<sp-avatar src="photo.jpg" />`;',
        errors: [{ messageId: "missingLabelOrDecorative" }],
      },
      // is-decorative with href but no label
      {
        code: 'const t = html`<sp-avatar is-decorative href="/profile" src="photo.jpg"></sp-avatar>`;',
        errors: [{ messageId: "decorativeLinkNeedsLabel" }],
      },
    ],
  });
});
