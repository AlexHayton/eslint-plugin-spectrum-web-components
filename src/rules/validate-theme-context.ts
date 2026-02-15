import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { extractElements, hasAttribute } from "../utils/html-parser";
import { getTemplateText, isLitHtmlTag } from "../utils/lit-utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/nickelsh1ts/eslint-plugin-spectrum-web-components/blob/main/docs/rules/${name}.md`,
);

type MessageIds = "missingColor" | "missingScale" | "missingSystem";

export const validateThemeContext = createRule<[], MessageIds>({
  name: "validate-theme-context",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require color, scale, and system attributes on <sp-theme> elements",
    },
    messages: {
      missingColor:
        '<sp-theme> should have an explicit "color" attribute set (e.g. color="light" or color="dark").',
      missingScale:
        '<sp-theme> should have an explicit "scale" attribute set (e.g. scale="medium" or scale="large").',
      missingSystem:
        '<sp-theme> should have an explicit "system" attribute set (e.g. system="spectrum" or system="express").',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function checkTemplate(node: TSESTree.TaggedTemplateExpression) {
      if (!isLitHtmlTag(node)) return;

      const templateText = getTemplateText(node);
      const elements = extractElements(templateText, "sp-theme");

      for (const element of elements) {
        if (!hasAttribute(element, "color")) {
          context.report({
            node,
            messageId: "missingColor",
          });
        }

        if (!hasAttribute(element, "scale")) {
          context.report({
            node,
            messageId: "missingScale",
          });
        }

        if (!hasAttribute(element, "system")) {
          context.report({
            node,
            messageId: "missingSystem",
          });
        }
      }
    }

    return {
      TaggedTemplateExpression(node) {
        checkTemplate(node);
      },
    };
  },
});

export default validateThemeContext;
