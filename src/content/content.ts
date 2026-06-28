import { findReadingUnit } from "./walker";
import {
  attach,
  detach,
  highlight,
  setDimOpacity,
} from "./highlighter";

import { Settings, DEFAULT_SETTINGS } from "../types";

let settings: Settings = DEFAULT_SETTINGS;
let lastFocused: Element | null = null;
let armed = true;

async function loadSettings(): Promise<void> {
  const stored = await chrome.storage.sync.get();

  settings = {
    ...DEFAULT_SETTINGS,
    ...stored,
  };

  if (settings.enabled) {
    attach(settings.dimOpacity);
  } else {
    detach();
  }
}

function updateFocus(target: Element): void {
  if (!armed || !settings.enabled) {
    return;
  }

  const readingUnit = findReadingUnit(target);

  if (readingUnit === lastFocused) {
    return;
  }


  highlight(readingUnit);
  lastFocused = readingUnit;
}

function handleMouseOver(event: MouseEvent): void {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  updateFocus(target);
}

function handleFocusIn(event: FocusEvent): void {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  updateFocus(target);
}

function handleMessage(
  message: ContentMessage,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response?: unknown) => void
): void {
  switch (message.type) {
    case "TOGGLE":
      armed = !armed;

      if (armed && settings.enabled) {
        attach(settings.dimOpacity);
      } else {
        detach();
        lastFocused = null;
      }

      break;

    case "UPDATE_SETTINGS":
      settings = message.settings;

      if (settings.enabled && armed) {
        attach(settings.dimOpacity);
        setDimOpacity(settings.dimOpacity);
      } else {
        detach();
        lastFocused = null;
      }

      break;
  }

  sendResponse({ success: true });
}

type ContentMessage =
  | {
      type: "TOGGLE";
    }
  | {
      type: "UPDATE_SETTINGS";
      settings: Settings;
    };

chrome.runtime.onMessage.addListener(handleMessage);

async function initialize(): Promise<void> {
  await loadSettings();

  document.addEventListener("mouseover", handleMouseOver);

  document.addEventListener("focusin", handleFocusIn);

  chrome.runtime.onMessage.addListener(handleMessage);
}

initialize().catch((error) => {
  console.error("FocusLens failed to initialize:", error);
});