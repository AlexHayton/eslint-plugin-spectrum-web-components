import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { extractElements, hasAttribute } from "../utils/html-parser";
import { getTemplateText, isLitHtmlTag } from "../utils/lit-utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/nickelsh1ts/eslint-plugin-spectrum-web-components/blob/main/docs/rules/${name}.md`,
);

type MessageIds = "missingLabel";

export const accessibleActionMenu = createRule<[], MessageIds>({
  name: "accessible-action-menu",
  meta: {
    type: "suggestion",
    docs: {
      description: "Require accessible labeling on <sp-action-menu> elements",
    },
    messages: {
      missingLabel:
        "<sp-action-menu> needs one of the following to be accessible: a `label` attribute, an `aria-label` attribute, or an `aria-labelledby` attribute.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function checkTemplate(node: TSESTree.TaggedTemplateExpression) {
      if (!isLitHtmlTag(node)) return;

      const templateText = getTemplateText(node);
      const elements = extractElements(templateText, "sp-action-menu");

      for (const element of elements) {
        const hasLabel = hasAttribute(element, "label");
        const hasAriaLabel = hasAttribute(element, "aria-label");
        const hasAriaLabelledby = hasAttribute(element, "aria-labelledby");

        if (!hasLabel && !hasAriaLabel && !hasAriaLabelledby) {
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

export default accessibleActionMenu;
