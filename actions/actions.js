import AnalyticsManager from "../utils/analytics";

/*
 * action types
 */

export const SET_FONT_SIZE = "SET_FONT_SIZE";
export const SET_FONT_FACE = "SET_FONT_FACE";
export const TOGGLE_ROMANIZED = "TOGGLE_ROMANIZED";
export const TOGGLE_ENGLISH_TRANSLATIONS = "TOGGLE_ENGLISH_TRANSLATIONS";
export const TOGGLE_NIGHT_MODE = "TOGGLE_NIGHT_MODE";
export const TOGGLE_SCREEN_AWAKE = "TOGGLE_SCREEN_AWAKE";
export const TOGGLE_LARIVAAR = "TOGGLE_LARIVAAR";
export const TOGGLE_STATISTICS = "TOGGLE_STATISTICS";
export const SET_MERGED_BANI_DATA = "SET_MERGED_BANI_DATA";
export const SET_CURRENT_SHABAD = "SET_CURRENT_SHABAD";
export const SET_CURRENT_KIRTAN_FOLDER = "SET_CURRENT_KIRTAN_FOLDER";
export const TOGGLE_STATUS_BAR = "TOGGLE_STATUS_BAR";
export const TOGGLE_AUTO_SCROLL = "TOGGLE_AUTO_SCROLL";
export const SET_AUTO_SCROLL_SPEED = "SET_AUTO_SCROLL_SPEED";
export const TOGGLE_VISRAM = "TOGGLE_VISRAM";

/*
 * other constants
 */

export const FONT_SIZES = [
  "EXTRA_SMALL",
  "SMALL",
  "MEDIUM",
  "LARGE",
  "EXTRA_LARGE"
];

export const fontSizeNames = [
  "Extra Small",
  "Small (default)",
  "Medium",
  "Large",
  "Extra Large"
];

export const FONT_FACES = [
  "AnmolLipiSG",
  "GurbaniAkharSG",
  "GurbaniAkharHeavySG",
  "GurbaniAkharThickSG"
];

export const fontFaceNames = [
  "Anmol Lipi",
  "Gurbani Akhar (default)",
  "Gurbani Akhar Heavy",
  "Gurbani Akhar Thick"
];

/*
 * action creators
 */

export function setFontSize(size) {
  AnalyticsManager.getInstance().trackSettingsEvent("fontSize", size);
  return { type: SET_FONT_SIZE, size };
}

export function setFontFace(font) {
  AnalyticsManager.getInstance().trackSettingsEvent("fontFace", font);
  return { type: SET_FONT_FACE, font };
}

export function toggleRomanized(value) {
  AnalyticsManager.getInstance().trackSettingsEvent("romanized", value);
  return { type: TOGGLE_ROMANIZED, value };
}

export function toggleEnglishTranslations(value) {
  AnalyticsManager.getInstance().trackSettingsEvent("english", value);
  return { type: TOGGLE_ENGLISH_TRANSLATIONS, value };
}

export function toggleNightMode(value) {
  AnalyticsManager.getInstance().trackSettingsEvent("nightMode", value);
  return { type: TOGGLE_NIGHT_MODE, value };
}

export function toggleScreenAwake(value) {
  AnalyticsManager.getInstance().trackSettingsEvent("keepAwake", value);
  return { type: TOGGLE_SCREEN_AWAKE, value };
}

export function toggleLarivaar(value) {
  AnalyticsManager.getInstance().trackSettingsEvent("larivaar", value);
  return { type: TOGGLE_LARIVAAR, value };
}

export function toggleStatistics(value) {
  AnalyticsManager.getInstance().trackSettingsEvent("statistics", value);
  return { type: TOGGLE_STATISTICS, value };
}

export function toggleStatusBar(hidden) {
  AnalyticsManager.getInstance().trackSettingsEvent("statusBar", hidden);
  return { type: TOGGLE_STATUS_BAR, hidden };
}

export function setMergedBaniData(list) {
  return { type: SET_MERGED_BANI_DATA, list };
}

export function setCurrentKirtanFolder(headerId) {
  return { type: SET_CURRENT_KIRTAN_FOLDER, headerId };
}

export function setCurrentShabad(shabadId) {
  return { type: SET_CURRENT_SHABAD, shabadId };
}

export function toggleAutoScroll(value) {
  AnalyticsManager.getInstance().trackSettingsEvent("autoScroll", value);
  return { type: TOGGLE_AUTO_SCROLL, value };
}

export function setAutoScrollSpeed(speed) {
  return { type: SET_AUTO_SCROLL_SPEED, speed };
}

export function toggleVisram(value) {
  AnalyticsManager.getInstance().trackSettingsEvent("vishram", value);
  return { type: TOGGLE_VISRAM, value };
}
