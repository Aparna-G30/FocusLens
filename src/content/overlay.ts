let overlayElement: HTMLDivElement | null = null;

let topOverlay: HTMLDivElement | null = null;
let leftOverlay: HTMLDivElement | null = null;
let rightOverlay: HTMLDivElement | null = null;
let bottomOverlay: HTMLDivElement | null = null;

function createShade(): HTMLDivElement {

    const shade = document.createElement("div");

    shade.style.position = "fixed";

    shade.style.background = "rgba(0,0,0,0.35)";

    shade.style.pointerEvents = "none";

    shade.style.zIndex = "999998";

    shade.style.display = "none";

    document.body.appendChild(shade);

    return shade;

}

export function createOverlay(): void {
 
  console.log("creating overlay..");

  if (overlayElement) {
    return;
  }
  
  overlayElement = document.createElement("div");
  console.log(overlayElement);

  overlayElement.id = "focuslens-overlay";

  overlayElement.style.position = "fixed";
  overlayElement.style.border = "2px solid #F59E0B";
  overlayElement.style.backgroundColor = "rgba(245,158,11,0.08)";
  overlayElement.style.borderRadius = "10px";
  overlayElement.style.pointerEvents = "none";
  overlayElement.style.zIndex = "999999";
  overlayElement.style.display = "none";
//   overlayElement.style.boxShadow="0 6px 20px rgba(245,158,11,0.25"
  overlayElement.style.transition =
    "left 150ms ease-out, top 150ms ease-out, width 150ms ease-out, height 150ms ease-out";

    topOverlay = createShade();
    leftOverlay = createShade();
    rightOverlay = createShade();
    bottomOverlay = createShade();
  document.body.appendChild(topOverlay);
  document.body.appendChild(leftOverlay);
  document.body.appendChild(rightOverlay);
  document.body.appendChild(bottomOverlay);

  document.body.appendChild(overlayElement);
  console.log(document.getElementById("focuslens-overlay"));
}

export function showOverlay(): void {

    if (
        !overlayElement ||
        !topOverlay ||
        !leftOverlay ||
        !rightOverlay ||
        !bottomOverlay
    ) {
        return;
    }

    overlayElement.style.display = "block";

    topOverlay.style.display = "block";
    leftOverlay.style.display = "block";
    rightOverlay.style.display = "block";
    bottomOverlay.style.display = "block";
}

export function hideOverlay(): void {

    if (
        !overlayElement ||
        !topOverlay ||
        !leftOverlay ||
        !rightOverlay ||
        !bottomOverlay
    ) {
        return;
    }

    overlayElement.style.display = "none";

    topOverlay.style.display = "none";
    leftOverlay.style.display = "none";
    rightOverlay.style.display = "none";
    bottomOverlay.style.display = "none";
}

export function removeOverlay(): void {
  if (!overlayElement ) {
    return;
  }

  overlayElement.remove();
  overlayElement = null;
}
export function moveOverlay(element: Element): void {
  if (!overlayElement || !topOverlay || !leftOverlay || !rightOverlay || !bottomOverlay) {
    return;
  }

  
  console.log("Moving overlay to:", element.tagName);
  const rect = element.getBoundingClientRect();
  console.log(rect);

  const padding=8;

  const left = rect.left - padding;
  const top = rect.top - padding;
  const width = rect.width + padding * 2;
  const height = rect.height + padding * 2;

  overlayElement.style.top = `${top}px`;
  overlayElement.style.left = `${left}px`;
  overlayElement.style.width = `${width}px`;
  overlayElement.style.height = `${height}px`;

  topOverlay.style.display = "block";
  topOverlay.style.left = "0px";
  topOverlay.style.top = "0px";
  topOverlay.style.width = `${window.innerWidth}px`;
  topOverlay.style.height = `${top}px`;

  leftOverlay.style.display = "block";
  leftOverlay.style.left = "0px";
  leftOverlay.style.top = `${top}px`;
  leftOverlay.style.width = `${left}px`;
  leftOverlay.style.height = `${height}px`;

  rightOverlay.style.left = `${left + width}px`;
  rightOverlay.style.top = `${top}px`;
  rightOverlay.style.width = `${window.innerWidth - (left + width)}px`;
  rightOverlay.style.height = `${height}px`;

  bottomOverlay.style.left = "0px";
    bottomOverlay.style.top = `${top + height}px`;
    bottomOverlay.style.width = `${window.innerWidth}px`;
    bottomOverlay.style.height =
        `${window.innerHeight - (top + height)}px`;


  showOverlay();
}
