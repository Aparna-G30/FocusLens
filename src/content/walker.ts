const BLOCK_TAGS = new Set([
  "P",
  "LI",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "BLOCKQUOTE",
  "PRE",
  "TD",
  "TH",
  "FIGCAPTION",
  "DT",
  "DD",
]);

export function findReadingUnit(target: Element): Element {
  let current: Element | null = target;

  while (current && current !== document.body) {
    if (BLOCK_TAGS.has(current.tagName)) {
      return current;
    }

    current = current.parentElement;
  }

  // Fall back to the original target if no reading unit is found.
  return target;
}