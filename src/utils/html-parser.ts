/**
 * Utility functions for parsing Lit-style tagged template literals
 * and extracting HTML element/attribute information from them.
 */

export interface ParsedAttribute {
  name: string;
  value: string;
  /** Character offset within the quasi string where attribute name starts */
  nameStart: number;
  /** Character offset within the quasi string where the value starts (inside quotes) */
  valueStart: number;
  /** Character offset within the quasi string where the value ends (inside quotes) */
  valueEnd: number;
}

export interface ParsedElement {
  tagName: string;
  attributes: ParsedAttribute[];
  /** Whether this element has a text content slot (non-whitespace text between open/close tags) */
  hasTextContent: boolean;
  /** The raw source of the element opening tag */
  raw: string;
}

/**
 * Simple regex-based parser for extracting elements from HTML template strings.
 * Not a full HTML parser - covers the common patterns used with Lit/JSX.
 */

const OPEN_TAG_RE =
  /<(sp-[\w-]+|overlay-trigger)((?:\s+[\w@.?-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|\$\{[^}]*\}))?)*)\s*\/?>/g;

const ATTR_RE = /([\w@.?-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g;

/**
 * Extract elements matching a given tag name from an HTML string.
 */
export function extractElements(
  html: string,
  tagName: string,
): ParsedElement[] {
  const results: ParsedElement[] = [];
  let match: RegExpExecArray | null;
  OPEN_TAG_RE.lastIndex = 0;

  while ((match = OPEN_TAG_RE.exec(html)) !== null) {
    const [fullMatch, foundTag, attrString] = match;
    if (foundTag !== tagName) continue;

    const attributes: ParsedAttribute[] = [];
    if (attrString) {
      let attrMatch: RegExpExecArray | null;
      ATTR_RE.lastIndex = 0;
      while ((attrMatch = ATTR_RE.exec(attrString)) !== null) {
        const attrName = attrMatch[1];
        const attrValue = attrMatch[2] ?? attrMatch[3] ?? "";
        attributes.push({
          name: attrName,
          value: attrValue,
          nameStart: match.index + fullMatch.indexOf(attrMatch[0]),
          valueStart: 0, // simplified — exact offset tracking not needed for lint messages
          valueEnd: 0,
        });
      }
    }

    // Check for text content between open/close tags (simplified)
    const afterTag = html.slice(match.index + fullMatch.length);
    const closeTagRe = new RegExp(`</${tagName}\\s*>`);
    const closeMatch = closeTagRe.exec(afterTag);
    let hasTextContent = false;
    if (closeMatch) {
      const innerContent = afterTag.slice(0, closeMatch.index).trim();
      // Ignore template expressions ${...} and whitespace-only content
      const stripped = innerContent.replace(/\$\{[^}]*\}/g, "").trim();
      hasTextContent = stripped.length > 0;
    }

    results.push({
      tagName: foundTag,
      attributes,
      hasTextContent,
      raw: fullMatch,
    });
  }

  return results;
}

/**
 * Get the value of an attribute by name, or undefined if not present.
 */
export function getAttributeValue(
  element: ParsedElement,
  attrName: string,
): string | undefined {
  const attr = element.attributes.find((a) => a.name === attrName);
  return attr?.value;
}

/**
 * Check if an attribute is present on the element (regardless of value).
 */
export function hasAttribute(
  element: ParsedElement,
  attrName: string,
): boolean {
  return element.attributes.some((a) => a.name === attrName);
}
