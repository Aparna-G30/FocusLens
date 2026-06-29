let overlayElement: HTMLDivElement | null = null;

export function createOverlay(): void {
 
  if (overlayElement) {
    return;
  }

  overlayElement = document.createElement("div");

  overlayElement.id = "focuslens-overlay";

  overlayElement.style.position = "fixed";
  overlayElement.style.border = "2px solid #4CAF50";
  overlayElement.style.borderRadius = "8px";
  overlayElement.style.pointerEvents = "none";
  overlayElement.style.zIndex = "999999";
  overlayElement.style.display = "none";

  document.body.appendChild(overlayElement);
}

export function showOverlay(): void {
  if (!overlayElement) {
    return;
  }

  overlayElement.style.display = "block";
}

export function hideOverlay(): void {
  if (!overlayElement) {
    return;
  }

  overlayElement.style.display = "none";
}

export function removeOverlay(): void {
  if (!overlayElement) {
    return;
  }

  overlayElement.remove();
  overlayElement = null;
}
export function moveOverlay(element: Element): void {
  if (!overlayElement) {
    return;
  }

  const rect = element.getBoundingClientRect();

  overlayElement.style.top = `${rect.top}px`;
  overlayElement.style.left = `${rect.left}px`;
  overlayElement.style.width = `${rect.width}px`;
  overlayElement.style.height = `${rect.height}px`;

  showOverlay();
}
