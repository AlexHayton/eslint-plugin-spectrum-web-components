import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { extractElements, hasAttribute } from "../utils/html-parser";
import { getTemplateText, isLitHtmlTag } from "../utils/lit-utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/AlexHayton/eslint-plugin-spectrum-web-components/blob/main/docs/rules/${name}.md`,
);

type MessageIds = "missingHeadline";

export const accessibleDialogWrapper = createRule<[], MessageIds>({
  name: "accessible-dialog-wrapper",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require a headline attribute on <sp-dialog-wrapper> elements for screen reader accessibility",
    },
    messages: {
      missingHeadline:
        '<sp-dialog-wrapper> elements will not be accessible to screen readers without a "headline" attribute or property.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function checkTemplate(node: TSESTree.TaggedTemplateExpression) {
      if (!isLitHtmlTag(node)) return;

      const templateText = getTemplateText(node);
      const elements = extractElements(templateText, "sp-dialog-wrapper");

      for (const element of elements) {
        if (!hasAttribute(element, "headline")) {
          context.report({
            node,
            messageId: "missingHeadline",
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

export default accessibleDialogWrapper;
