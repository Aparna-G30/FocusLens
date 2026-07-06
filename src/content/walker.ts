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

export function findReadingUnit(target: Element): Element | null {

  let current: Element | null = target;

  while (current && current !== document.body) {

    if (BLOCK_TAGS.has(current.tagName)) {
      return current;
    }

    current = current.parentElement;
  }

  // We didn't find any valid reading block.
  // Only return the target if it isn't a huge container.

  const rect = target.getBoundingClientRect();

  const isReasonableSize =
    rect.height < window.innerHeight * 0.6 &&
    rect.width < window.innerWidth * 0.95;

  if (isReasonableSize) {
    return target;
  }

  return null;
}