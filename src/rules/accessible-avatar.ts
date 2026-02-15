import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import {
  extractElements,
  getAttributeValue,
  hasAttribute,
} from "../utils/html-parser";
import { getTemplateText, isLitHtmlTag } from "../utils/lit-utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/nickelsh1ts/eslint-plugin-spectrum-web-components/blob/main/docs/rules/${name}.md`,
);

type MessageIds = "missingLabelOrDecorative" | "decorativeLinkNeedsLabel";

export const accessibleAvatar = createRule<[], MessageIds>({
  name: "accessible-avatar",
  meta: {
    type: "suggestion",
    docs: {
      description: "Require accessible attributes on <sp-avatar> elements",
    },
    messages: {
      missingLabelOrDecorative:
        "<sp-avatar> needs either a `label` attribute or `is-decorative` attribute to be accessible.",
      decorativeLinkNeedsLabel:
        "<sp-avatar> with `is-decorative` and `href` requires a `label` attribute for the link to be accessible.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function checkTemplate(node: TSESTree.TaggedTemplateExpression) {
      if (!isLitHtmlTag(node)) return;

      const templateText = getTemplateText(node);
      const elements = extractElements(templateText, "sp-avatar");

      for (const element of elements) {
        const label = getAttributeValue(element, "label");
        const isDecorativeAttr = hasAttribute(element, "is-decorative");
        const href = getAttributeValue(element, "href");

        if (!label && !isDecorativeAttr) {
          context.report({
            node,
            messageId: "missingLabelOrDecorative",
          });
        } else if (isDecorativeAttr && href !== undefined && !label) {
          context.report({
            node,
            messageId: "decorativeLinkNeedsLabel",
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

export default accessibleAvatar;
