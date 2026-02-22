import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { extractElements, hasAttribute } from "../utils/html-parser";
import { getTemplateText, isLitHtmlTag } from "../utils/lit-utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/AlexHayton/eslint-plugin-spectrum-web-components/blob/main/docs/rules/${name}.md`,
);

type MessageIds = "missingTriggeredBy";

export const overlayTriggerTriggeredBy = createRule<[], MessageIds>({
  name: "overlay-trigger-triggered-by",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require `triggered-by` attribute on <overlay-trigger> elements for performance optimization",
    },
    messages: {
      missingTriggeredBy:
        "For optimal performance, explicitly declare which overlay types you plan to use with the `triggered-by` attribute (e.g. `triggered-by='click hover'`).",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function checkTemplate(node: TSESTree.TaggedTemplateExpression) {
      if (!isLitHtmlTag(node)) return;

      const templateText = getTemplateText(node);
      const elements = extractElements(templateText, "overlay-trigger");

      for (const element of elements) {
        const hasTriggeredBy = hasAttribute(element, "triggered-by");
        const hasTriggeredByProp = hasAttribute(element, ".triggeredBy");
        // Also check for camelCase triggeredBy attribute just in case (though standard is kebab-case)
        const hasTriggeredByAttrCamel = hasAttribute(element, "triggeredBy");

        if (
          !hasTriggeredBy &&
          !hasTriggeredByProp &&
          !hasTriggeredByAttrCamel
        ) {
          context.report({
            node,
            messageId: "missingTriggeredBy",
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

export default overlayTriggerTriggeredBy;
