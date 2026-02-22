import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { extractElements, hasAttribute } from "../utils/html-parser";
import { getTemplateText, isLitHtmlTag } from "../utils/lit-utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/AlexHayton/eslint-plugin-spectrum-web-components/blob/main/docs/rules/${name}.md`,
);

type MessageIds = "missingLabel";

export const accessibleClearButton = createRule<[], MessageIds>({
  name: "accessible-clear-button",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require a label attribute on <sp-clear-button> elements for screen reader accessibility",
    },
    messages: {
      missingLabel:
        'The "label" attribute is required on <sp-clear-button> to provide an accessible name for screen readers. Please add a label attribute, e.g., <sp-clear-button label="Clear">.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function checkTemplate(node: TSESTree.TaggedTemplateExpression) {
      if (!isLitHtmlTag(node)) return;

      const templateText = getTemplateText(node);
      const elements = extractElements(templateText, "sp-clear-button");

      for (const element of elements) {
        if (!hasAttribute(element, "label")) {
          context.report({
            node,
            messageId: "missingLabel",
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

export default accessibleClearButton;
