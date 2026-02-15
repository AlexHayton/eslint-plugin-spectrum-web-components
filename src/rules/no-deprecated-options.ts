import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { extractElements, getAttributeValue } from "../utils/html-parser";
import { getTemplateText, isLitHtmlTag } from "../utils/lit-utils";

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/nickelsh1ts/eslint-plugin-spectrum-web-components/blob/main/docs/rules/${name}.md`,
);

/**
 * Deprecation map: tag -> attribute -> { deprecatedValues, messages }
 */
interface DeprecatedValueEntry {
  value: string;
  message: string;
  replacement?: string;
}

interface DeprecatedAttributeEntry {
  attribute: string;
  /** Message when the entire attribute is deprecated (no value check) */
  message?: string;
  deprecatedValues?: DeprecatedValueEntry[];
}

interface DeprecatedTagConfig {
  tagName: string;
  attributes: DeprecatedAttributeEntry[];
  /** If set, warns when this element has text content in its default slot */
  warnOnTextContent?: {
    message: string;
  };
}

const DEPRECATED_CONFIGS: DeprecatedTagConfig[] = [
  {
    tagName: "sp-button",
    attributes: [
      {
        attribute: "variant",
        deprecatedValues: [
          {
            value: "cta",
            message:
              'The "cta" value of the "variant" attribute on <sp-button> has been deprecated. Use variant="accent" instead.',
            replacement: "accent",
          },
          {
            value: "overBackground",
            message:
              'The "overBackground" value of the "variant" attribute on <sp-button> has been deprecated. Use static-color="white" with treatment="outline" instead.',
          },
          {
            value: "white",
            message:
              'The "white" value of the "variant" attribute on <sp-button> has been deprecated. Use static-color="white" instead.',
          },
          {
            value: "black",
            message:
              'The "black" value of the "variant" attribute on <sp-button> has been deprecated. Use static-color="black" instead.',
          },
        ],
      },
    ],
  },
  {
    tagName: "sp-theme",
    attributes: [
      {
        attribute: "color",
        deprecatedValues: [
          {
            value: "lightest",
            message:
              'Color "lightest" on <sp-theme> is deprecated. See: https://opensource.adobe.com/spectrum-web-components/tools/theme/',
          },
          {
            value: "darkest",
            message:
              'Color "darkest" on <sp-theme> is deprecated. See: https://opensource.adobe.com/spectrum-web-components/tools/theme/',
          },
        ],
      },
    ],
  },
  {
    tagName: "sp-overlay",
    attributes: [
      {
        attribute: "allow-outside-click",
        message:
          'The "allow-outside-click" attribute on <sp-overlay> has been deprecated and will be removed in a future release. It is not recommended for accessibility reasons.',
      },
    ],
  },
  {
    tagName: "sp-slider",
    attributes: [],
    warnOnTextContent: {
      message:
        'The default slot for text label in <sp-slider> has been deprecated. Use the "label" attribute instead.',
    },
  },
];

type MessageIds =
  | "deprecatedValue"
  | "deprecatedAttribute"
  | "deprecatedSlotContent";

export const noDeprecatedOptions = createRule<[], MessageIds>({
  name: "no-deprecated-options",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Disallow deprecated attribute values and attributes on Spectrum Web Components",
    },
    messages: {
      deprecatedValue: "{{message}}",
      deprecatedAttribute: "{{message}}",
      deprecatedSlotContent: "{{message}}",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    function checkTemplate(node: TSESTree.TaggedTemplateExpression) {
      if (!isLitHtmlTag(node)) return;

      const templateText = getTemplateText(node);

      for (const config of DEPRECATED_CONFIGS) {
        const elements = extractElements(templateText, config.tagName);

        for (const element of elements) {
          // Check deprecated attribute values
          for (const attrConfig of config.attributes) {
            if (attrConfig.deprecatedValues) {
              const attrValue = getAttributeValue(
                element,
                attrConfig.attribute,
              );
              if (attrValue === undefined) continue;

              const deprecation = attrConfig.deprecatedValues.find(
                (d) => d.value === attrValue,
              );
              if (deprecation) {
                context.report({
                  node,
                  messageId: "deprecatedValue",
                  data: { message: deprecation.message },
                });
              }
            } else if (attrConfig.message) {
              // Entire attribute is deprecated
              const hasAttr = element.attributes.some(
                (a) => a.name === attrConfig.attribute,
              );
              if (hasAttr) {
                context.report({
                  node,
                  messageId: "deprecatedAttribute",
                  data: { message: attrConfig.message },
                });
              }
            }
          }

          // Check deprecated text content in slots
          if (config.warnOnTextContent && element.hasTextContent) {
            context.report({
              node,
              messageId: "deprecatedSlotContent",
              data: { message: config.warnOnTextContent.message },
            });
          }
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

export default noDeprecatedOptions;
