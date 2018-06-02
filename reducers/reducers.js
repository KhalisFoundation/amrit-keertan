import { combineReducers } from "redux";
import {
  SET_FONT_SIZE,
  SET_FONT_FACE,
  TOGGLE_ROMANIZED,
  TOGGLE_ENGLISH_TRANSLATIONS,
  TOGGLE_NIGHT_MODE,
  TOGGLE_SCREEN_AWAKE,
  TOGGLE_LARIVAAR,
  TOGGLE_STATISTICS,
  SET_MERGED_BANI_DATA,
  SET_CURRENT_SHABAD_INDEX,
  SET_CURRENT_KIRTAN_FOLDER,
  TOGGLE_STATUS_BAR,
  TOGGLE_AUTO_SCROLL,
  SET_AUTO_SCROLL_SPEED,
  TOGGLE_VISRAM
} from "../actions/actions";

function fontSize(state = "SMALL", action) {
  switch (action.type) {
    case SET_FONT_SIZE:
      return action.size;
    default:
      return state;
  }
}

function fontFace(state = "GurbaniAkharSG", action) {
  switch (action.type) {
    case SET_FONT_FACE:
      return action.font;
    default:
      return state;
  }
}

function romanized(state = false, action) {
  switch (action.type) {
    case TOGGLE_ROMANIZED:
      return action.value;
    default:
      return state;
  }
}

function englishTranslations(state = false, action) {
  switch (action.type) {
    case TOGGLE_ENGLISH_TRANSLATIONS:
      return action.value;
    default:
      return state;
  }
}

function nightMode(state = false, action) {
  switch (action.type) {
    case TOGGLE_NIGHT_MODE:
      return action.value;
    default:
      return state;
  }
}

function screenAwake(state = false, action) {
  switch (action.type) {
    case TOGGLE_SCREEN_AWAKE:
      return action.value;
    default:
      return state;
  }
}

function larivaar(state = false, action) {
  switch (action.type) {
    case TOGGLE_LARIVAAR:
      return action.value;
    default:
      return state;
  }
}

function statistics(state = true, action) {
  switch (action.type) {
    case TOGGLE_STATISTICS:
      return action.value;
    default:
      return state;
  }
}

function mergedBaniData(state = null, action) {
  switch (action.type) {
    case SET_MERGED_BANI_DATA:
      return action.list;
    default:
      return state;
  }
}

function currentShabadIndex(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_SHABAD_INDEX:
      return action.indexId;
    default:
      return state;
  }
}

function currentKirtanFolder(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_KIRTAN_FOLDER:
      return action.headerId;
    default:
      return state;
  }
}

function statusBar(state = true, action) {
  switch (action.type) {
    case TOGGLE_STATUS_BAR:
      return action.hidden;
    default:
      return state;
  }
}

function autoScroll(state = false, action) {
  switch (action.type) {
    case TOGGLE_AUTO_SCROLL:
      return action.value;
    default:
      return state;
  }
}

function autoScrollSpeed(state = 50, action) {
  switch (action.type) {
    case SET_AUTO_SCROLL_SPEED:
      return action.speed;
    default:
      return state;
  }
}

function visram(state = true, action) {
  switch (action.type) {
    case TOGGLE_VISRAM:
      return action.value;
    default:
      return state;
  }
}

// Combine all the reducers
const rootReducer = combineReducers({
  fontSize,
  fontFace,
  romanized,
  englishTranslations,
  nightMode,
  screenAwake,
  larivaar,
  statistics,
  mergedBaniData,
  currentShabadIndex,
  currentKirtanFolder,
  statusBar,
  autoScroll,
  autoScrollSpeed,
  visram
});

export default rootReducer;
