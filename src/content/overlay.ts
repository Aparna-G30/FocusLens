let overlayElement: HTMLDivElement | null = null;

let spotlightSvg: SVGSVGElement | null = null;

let spotlightHole: SVGRectElement | null = null;

export function createOverlay(): void {
 
  console.log("creating overlay..");

  if (overlayElement) {
    return;
  }
  
  overlayElement = document.createElement("div");
  console.log(overlayElement);

  overlayElement.id = "focuslens-overlay";

  overlayElement.style.position = "fixed";
  overlayElement.style.left = "0px";
  overlayElement.style.top = "0px";
  overlayElement.style.transform = "translate(0px, 0px)";
  overlayElement.style.willChange =
    "transform, width, height";
  overlayElement.style.border = "2px solid #fbbf24";
  overlayElement.style.backgroundColor = "rgba(245,158,11,0.08)";
  overlayElement.style.borderRadius = "8px";
  overlayElement.style.pointerEvents = "none";
  overlayElement.style.zIndex = "999999";
  overlayElement.style.display = "none";
  overlayElement.style.boxShadow =
    "0 0 0 1px rgba(245,158,11,0.15), 0 8px 24px rgba(245,158,11,0.18)";
  overlayElement.style.transition =
    "transform 180ms cubic-bezier(0.22,1,0.36,1)," +
    // "left 180ms cubic-bezier(0.22, 1, 0.36, 1), " +
    // "top 180ms cubic-bezier(0.22, 1, 0.36, 1), " +
    "width 180ms cubic-bezier(0.22, 1, 0.36, 1), " +
    "height 180ms cubic-bezier(0.22, 1, 0.36, 1)";

  
  document.body.appendChild(overlayElement);
  console.log(document.getElementById("focuslens-overlay"));
}

export function showOverlay(): void {

    if (!overlayElement ){
        return;
    }

    if (overlayElement.style.display !== "block") {
        overlayElement.style.display = "block";
    }
}

export function hideOverlay(): void {

    if (!overlayElement ) {
        return;
    }

    overlayElement.style.display = "none";

}

export function removeOverlay(): void {
  if (!overlayElement ) {
    return;
  }

  overlayElement.remove();
  overlayElement = null;
}
export function moveOverlay(element: Element): void {
  if (!overlayElement ) {
    return;
  }

  
  console.log("Moving overlay to:", element.tagName);
  const rect = element.getBoundingClientRect();

const paddingTop = 4;
const paddingBottom = 4;
const paddingRight = 8;
const paddingLeft = 14;     

// overlayElement.style.top =
//     `${rect.top - paddingTop}px`;

// overlayElement.style.left =
//     `${rect.left - paddingLeft}px`;

overlayElement.style.transform =
    `translate(${rect.left - paddingLeft}px, ${rect.top - paddingTop}px)`;

overlayElement.style.width =
    `${rect.width + paddingLeft + paddingRight}px`;

overlayElement.style.height =
    `${rect.height + paddingTop + paddingBottom}px`;

  showOverlay();
}
