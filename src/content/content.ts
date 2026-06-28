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

  lastFocused = readingUnit;
  highlight(readingUnit);
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

