const ACTIVE_CLASS = "focuslens-active";
const FOCUSED_CLASS = "focuslens-focused";

const STYLE_CONTENT = `
body.focuslens-active * {
  opacity: var(--fl-dim, 0.2);
  transition: opacity 120ms ease;
}

body.focuslens-active .focuslens-focused,
body.focuslens-active .focuslens-focused * {
  opacity: 1 !important;
}
`;

let styleElement: HTMLStyleElement | null = null;
let currentFocused: Element | null = null;

export function attach(dimOpacity: number): void {
  if (styleElement) {
    setDimOpacity(dimOpacity);
    return;
  }

  styleElement = document.createElement("style");
  styleElement.textContent = STYLE_CONTENT;

  document.head.appendChild(styleElement);

  document.body.classList.add(ACTIVE_CLASS);

  setDimOpacity(dimOpacity);
}

export function detach(): void {
  clearHighlight();

  document.body.classList.remove(ACTIVE_CLASS);

  if (styleElement) {
    styleElement.remove();
    styleElement = null;
  }
}

export function highlight(element: Element): void {
  if (currentFocused === element) {
    return;
  }

  clearHighlight();

  element.classList.add(FOCUSED_CLASS);
  currentFocused = element;
}

export function clearHighlight(): void {
  if (!currentFocused) {
    return;
  }

  currentFocused.classList.remove(FOCUSED_CLASS);
  currentFocused = null;
}

export function setDimOpacity(opacity: number): void {
  document.body.style.setProperty("--fl-dim", opacity.toString());
}