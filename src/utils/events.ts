import React from "react";

export type Coordinates = {
  x: number;
  y: number;
};

export type Color = React.CSSProperties["color"];
export enum BrushThickness {
  xs = 5,
  sm = 10,
  md = 15,
  lg = 20,
  xl = 25,
}

export type ClickDrawEvent = {
  eventId: string;
  type: "click";
  mode: "draw";
  coordinates: Coordinates;
  color: Color;
  brushThickness: BrushThickness;
};

export type ClickFillEvent = {
  eventId: string;
  type: "click";
  mode: "fill";
  coordinates: Coordinates; // Where the fill should begin
  color: Color;
};

export type DragDrawEvent = {
  eventId: string;
  type: "drag";
  mode: "draw";
  allCoordinates: Coordinates[];
  color: Color;
  brushThickness: BrushThickness;
};

export type ScreenClearEvent = {
  eventId: string;
  type: "screen-clear";
  color: Color;
};

export type DrawEvents =
  | ClickDrawEvent
  | ClickFillEvent
  | DragDrawEvent
  | ScreenClearEvent;
