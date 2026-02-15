import { RuleTester } from "eslint";
import { describe, it, expect } from "vitest";
import {
  extractElements,
  getAttributeValue,
  hasAttribute,
} from "../../src/utils/html-parser";

// Use the compiled dist since RuleTester is CommonJS
const plugin = require("../../dist/index");

describe("html-parser", () => {
  it("extracts elements by tag name", () => {
    const html = '<sp-button variant="accent">Click me</sp-button>';
    const elements = extractElements(html, "sp-button");
    expect(elements).toHaveLength(1);
    expect(elements[0].tagName).toBe("sp-button");
  });

  it("extracts attributes correctly", () => {
    const html =
      '<sp-button variant="accent" treatment="fill">Click</sp-button>';
    const elements = extractElements(html, "sp-button");
    expect(elements).toHaveLength(1);
    expect(getAttributeValue(elements[0], "variant")).toBe("accent");
    expect(getAttributeValue(elements[0], "treatment")).toBe("fill");
    expect(getAttributeValue(elements[0], "nonexistent")).toBeUndefined();
  });

  it("detects text content", () => {
    const html = "<sp-slider>Label text</sp-slider>";
    const elements = extractElements(html, "sp-slider");
    expect(elements).toHaveLength(1);
    expect(elements[0].hasTextContent).toBe(true);
  });

  it("detects no text content for self-closing tags", () => {
    const html = '<sp-avatar src="photo.jpg" />';
    const elements = extractElements(html, "sp-avatar");
    expect(elements).toHaveLength(1);
    expect(elements[0].hasTextContent).toBe(false);
  });

  it("hasAttribute works", () => {
    const html = '<sp-avatar is-decorative src="photo.jpg" />';
    const elements = extractElements(html, "sp-avatar");
    expect(hasAttribute(elements[0], "is-decorative")).toBe(true);
    expect(hasAttribute(elements[0], "label")).toBe(false);
  });
});

describe("no-deprecated-options", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  const rule = plugin.rules["no-deprecated-options"];

  ruleTester.run("no-deprecated-options", rule, {
    valid: [
      // Valid variant
      {
        code: 'const t = html`<sp-button variant="accent">OK</sp-button>`;',
      },
      // Valid variant secondary
      {
        code: 'const t = html`<sp-button variant="secondary">OK</sp-button>`;',
      },
      // Valid theme colors
      {
        code: 'const t = html`<sp-theme color="light" scale="medium" system="spectrum"></sp-theme>`;',
      },
      // No variant at all (valid)
      {
        code: "const t = html`<sp-button>OK</sp-button>`;",
      },
      // Non-html tag (should be ignored)
      {
        code: 'const t = css`<sp-button variant="cta">OK</sp-button>`;',
      },
      // Slider with label attribute (no text content)
      {
        code: 'const t = html`<sp-slider label="Volume"></sp-slider>`;',
      },
    ],
    invalid: [
      // Deprecated variant="cta"
      {
        code: 'const t = html`<sp-button variant="cta">OK</sp-button>`;',
        errors: [
          {
            messageId: "deprecatedValue",
          },
        ],
      },
      // Deprecated variant="overBackground"
      {
        code: 'const t = html`<sp-button variant="overBackground">OK</sp-button>`;',
        errors: [
          {
            messageId: "deprecatedValue",
          },
        ],
      },
      // Deprecated variant="white"
      {
        code: 'const t = html`<sp-button variant="white">OK</sp-button>`;',
        errors: [
          {
            messageId: "deprecatedValue",
          },
        ],
      },
      // Deprecated variant="black"
      {
        code: 'const t = html`<sp-button variant="black">OK</sp-button>`;',
        errors: [
          {
            messageId: "deprecatedValue",
          },
        ],
      },
      // Deprecated theme color="lightest"
      {
        code: 'const t = html`<sp-theme color="lightest"></sp-theme>`;',
        errors: [
          {
            messageId: "deprecatedValue",
          },
        ],
      },
      // Deprecated theme color="darkest"
      {
        code: 'const t = html`<sp-theme color="darkest"></sp-theme>`;',
        errors: [
          {
            messageId: "deprecatedValue",
          },
        ],
      },
      // Deprecated allow-outside-click on overlay
      {
        code: "const t = html`<sp-overlay allow-outside-click></sp-overlay>`;",
        errors: [
          {
            messageId: "deprecatedAttribute",
          },
        ],
      },
      // Deprecated text content in slider
      {
        code: "const t = html`<sp-slider>Volume</sp-slider>`;",
        errors: [
          {
            messageId: "deprecatedSlotContent",
          },
        ],
      },
    ],
  });
});
