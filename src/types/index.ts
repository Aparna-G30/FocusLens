export interface Settings {
  enabled: boolean;

  dimOpacity: number;

  focusUnit: "paragraph" | "sentence" | "line";

  domainOverrides: Record<string, boolean>;
}

export const DEFAULT_SETTINGS: Settings = {
  enabled: true,

  dimOpacity: 0.2,

  focusUnit: "paragraph",

  domainOverrides: {}
};