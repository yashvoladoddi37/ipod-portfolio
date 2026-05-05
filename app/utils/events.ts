import { ScrollDirection } from "components/ClickWheel/sharedTypes";
import { playWheelTick, playButtonClick, playMenuClick, playPlayPauseClick, playNavClick } from "./sounds";

/** The click-wheel control associated with the particular event */
type BaseEventContext =
  | "wheel"
  | "center"
  | "forward"
  | "backward"
  | "menu"
  | "playpause";

export type SupportedKeyCode =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Escape"
  | "Enter"
  | " "
  | "Spacebar"
  | "["
  | "]";

/** The action that is taken on a click-wheel control */
type BaseEventAction = "click" | "longclick" | "scroll" | "longpress";

/** The custom events that are supported for the iPod */
export type IpodEvent = `${BaseEventContext}${BaseEventAction}` | `idle`;

/** Create a type-safe custom event for the iPod */
export const createIpodEvent = (eventName: IpodEvent) => new Event(eventName);

const backClickEvent = createIpodEvent("backwardclick");
const backwardScrollEvent = createIpodEvent("backwardscroll");
const centerClickEvent = createIpodEvent("centerclick");
const centerLongClickEvent = createIpodEvent("centerlongclick");
const forwardClickEvent = createIpodEvent("forwardclick");
const forwardScrollEvent = createIpodEvent("forwardscroll");
const idleEvent = createIpodEvent("idle");
const menuClickEvent = createIpodEvent("menuclick");
const menuLongPressEvent = createIpodEvent("menulongpress");
const playPauseClickEvent = createIpodEvent("playpauseclick");
const wheelClickEvent = createIpodEvent("wheelclick");

export const dispatchMenuClickEvent = () => {
  playMenuClick();
  window.dispatchEvent(menuClickEvent);
};

export const dispatchCenterClickEvent = () => {
  playButtonClick();
  window.dispatchEvent(centerClickEvent);
};

export const dispatchCenterLongClickEvent = () => {
  playButtonClick();
  window.dispatchEvent(centerLongClickEvent);
};

export const dispatchForwardScrollEvent = () => {
  playWheelTick();
  window.dispatchEvent(forwardScrollEvent);
};

export const dispatchBackwardScrollEvent = () => {
  playWheelTick();
  window.dispatchEvent(backwardScrollEvent);
};

export const dispatchScrollEvent = (direction: ScrollDirection) =>
  direction === "clockwise"
    ? dispatchForwardScrollEvent()
    : dispatchBackwardScrollEvent();

export const dispatchWheelClickEvent = () => {
  playButtonClick();
  window.dispatchEvent(wheelClickEvent);
};

export const dispatchMenuLongPressEvent = () => {
  playMenuClick();
  window.dispatchEvent(menuLongPressEvent);
};

export const dispatchBackClickEvent = () => {
  playMenuClick();
  window.dispatchEvent(backClickEvent);
};

export const dispatchForwardClickEvent = () => {
  playMenuClick();
  window.dispatchEvent(forwardClickEvent);
};

export const dispatchPlayPauseClickEvent = () => {
  playMenuClick();
  window.dispatchEvent(playPauseClickEvent);
};

export const dispatchIdleEvent = () => window.dispatchEvent(idleEvent);

export const dispatchKeyboardEvent = (key: string) => {
  switch (key) {
    case "ArrowUp":
    case "ArrowLeft":
      dispatchBackwardScrollEvent();
      break;
    case "ArrowDown":
    case "ArrowRight":
      dispatchForwardScrollEvent();
      break;
    case "Enter":
      dispatchCenterClickEvent();
      break;
    case " ":
    case "Spacebar":
      dispatchPlayPauseClickEvent();
      break;
    case "Escape":
      dispatchMenuClickEvent();
      break;
    case "]":
      dispatchForwardClickEvent();
      break;
    case "[":
      dispatchBackClickEvent();
      break;
  }
};

