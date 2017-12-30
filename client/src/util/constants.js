import { EditorState, ContentState } from "draft-js";

export const Urls = {
  ApiBase: `http://${window.location.host}/api`,
};

export const Typefaces = ["Source Sans Pro"];

export const appFont =
  // eslint-disable-next-line quotes
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Helvetica, sans-serif';

export const colors = [
  "#fff",
  "#f5f5f5",
  "#e0e0e0",
  "#bdbdbd",
  "#9e9e9e",
  "#757575",
  "#616161",
  "#424242",
  "#212121",
  "#000",
  "#d50000",
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#ba68c8",
  "#7e57c2",
  "#3f51b5",
  "#2196f3",
  "#90caf9",
  "#03A9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#aeea00",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
];

export const Keys = {
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
};

export const breakpointLg = "min-width: 768px";

const _sidePanelWidth = 25;
export const sidePanelWidth = `${_sidePanelWidth}vw`;
export const contentPanelWidthFull = "100vw";
export const contentPanelWidthPartial = `${100 - _sidePanelWidth}vw`;

export const AppColors = {
  Active: "#727172",
  ActiveDark: "#626162",
  ActiveLight: "#685ffd",
  LightGray: "#f5f5f5",
  Border: "#aaa",
  MediumGray: "#f0f0f0",
  Gray: "#e5e5e5",
  MidTextGray: "#7a7b7a",
  DarkGray: "#263238",
  DisabledGray: "#aaa",
  LightActive: "#e9e8f5",
  IconColor: "#444",
  White: "#fefefe",
  Gray20: "#c0bfc0",
  Gray30: "#9fa3a3",
  Gray40: "#8c9090",
  Gray50: "#6f7878",
  Gray60: "#535a5a",
  Gray80: "#343334",
  White4: "#f3f3f3",
  Highlight: "#3c6df0",
  HighlightDark: "#3151b7",
};

export const baseRequestHeaders = {
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const newDocument = {
  name: "Untitled Document",
  width: 8.5,
  height: 11,
  shapes: [],
  new: true,
};

export const Shapes = {
  Rectangle: {
    type: "rect",
    x: 0.25,
    y: 0.25,
    r: 0,
    angle: 0,
    width: 1,
    height: 1,
    fill: "#609eeb",
    stroke: "#4e8bda",
    strokeWidth: 1,
    strokeOpacity: 1.0,
    fillOpacity: 1.0,
  },
  Ellipse: {
    type: "ellipse",
    x: 0.25,
    y: 0.25,
    r: 0,
    angle: 0,
    width: 1,
    height: 1,
    fill: "#609eeb",
    stroke: "#4e8bda",
    strokeWidth: 1,
    strokeOpacity: 1.0,
    fillOpacity: 1.0,
  },
  Text: {
    type: "text",
    x: 0.25,
    y: 0.25,
    r: 0,
    text: "",
    editorState: EditorState.createWithContent(
      ContentState.createFromText("Double click to insert text")
    ),
    fontFamily: "Source Sans Pro",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    angle: 0,
    width: 2,
    height: 1,
    strokeWidth: 0,
    color: "#434a54",
    opacity: 1.0,
    textAlign: "left",
  },
};