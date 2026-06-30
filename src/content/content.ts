console.log("📄 FocusLens content script loaded");

let armed=true;

let lastFocused: Element | null = null;

import{
    createOverlay,
    moveOverlay,
    hideOverlay,
} from "./overlay"

import{
    findReadingUnit
} from "./walker";

chrome.runtime.onMessage.addListener(handleMessage);

function updateFocus(target: Element): void {

    if (!armed) {
        return;
    }

    const readingUnit = findReadingUnit(target);

    lastFocused = readingUnit;

    moveOverlay(readingUnit);
}

function handleMouseOver(event: MouseEvent): void{
    const target=event.target;

    if(!(target instanceof Element))
    {
        return;
    }

    updateFocus(target);
}

function handleMessage(message: any){
    console.log("Content script received:",message);
}

async function initialize(): Promise<void> {

    createOverlay();

    const result = await chrome.storage.sync.get("enabled");

    armed = (result.enabled as boolean) ?? true;

    if (!armed) {
        hideOverlay();
    }

    document.addEventListener("mouseover", handleMouseOver);

}

initialize();
chrome.storage.onChanged.addListener(handleStorageChange);

function handleStorageChange(
    changes: { [key: string]: chrome.storage.StorageChange },
    areaName: string
): void {

    if (areaName !== "sync") {
        return;
    }

    if (!changes.enabled) {
        return;
    }

    const enabled = changes.enabled.newValue as boolean;

    armed = enabled;

    if (enabled) {

        if (lastFocused) {
            moveOverlay(lastFocused);
        }

    } else {

        hideOverlay();

    }

}