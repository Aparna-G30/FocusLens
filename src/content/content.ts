console.log("📄 FocusLens content script loaded");

import{
    createOverlay,
    moveOverlay,
    hideOverlay,
} from "./overlay"

import{
    findReadingUnit
} from "./walker";

chrome.runtime.onMessage.addListener(handleMessage);

function updateFocus(target:Element): void{
    const readingUnit=findReadingUnit(target);

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

    document.addEventListener("mouseover",handleMouseOver)
    
}

initialize();