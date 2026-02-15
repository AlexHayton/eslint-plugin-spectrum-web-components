import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Concatenate the quasis of a tagged template literal into a single string.
 * Template expressions (${...}) are replaced with a placeholder to preserve
 * attribute positioning.
 */
export function getTemplateText(
  node: TSESTree.TaggedTemplateExpression | TSESTree.TemplateLiteral,
): string {
  const templateLiteral =
    node.type === "TaggedTemplateExpression" ? node.quasi : node;

  return templateLiteral.quasis
    .map((quasi: TSESTree.TemplateElement, i: number) => {
      const text = quasi.value.raw;
      if (i < templateLiteral.quasis.length - 1) {
        return text + "${__EXPR__}";
      }
      return text;
    })
    .join("");
}

/**
 * Check if a tagged template expression is a Lit html tag.
 */
export function isLitHtmlTag(node: TSESTree.TaggedTemplateExpression): boolean {
  if (node.type !== "TaggedTemplateExpression") return false;

  const { tag } = node;

  // Direct `html` identifier
  if (tag.type === "Identifier" && tag.name === "html") {
    return true;
  }

  // Member expression like `LitElement.html` or namespace.html
  if (
    tag.type === "MemberExpression" &&
    tag.property.type === "Identifier" &&
    tag.property.name === "html"
  ) {
    return true;
  }

  return false;
}
