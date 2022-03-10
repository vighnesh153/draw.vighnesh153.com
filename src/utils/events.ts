import React from "react";

export type Coordinates = {
  x: number;
  y: number;
};

export enum Color {
  Black = "black",
  White = "white",
}
export enum BrushThickness {
  xs = 5,
  sm = 10,
  md = 15,
  lg = 20,
  xl = 25,
}

export enum EventModes {
  Draw = "draw",
  Fill = "fill",
}

export type ClickDrawEvent = {
  eventId: string;
  type: "click";
  mode: EventModes.Draw;
  coordinates: Coordinates;
  color: Color;
  brushThickness: BrushThickness;
};

export type ClickFillEvent = {
  eventId: string;
  type: "click";
  mode: EventModes.Fill;
  coordinates: Coordinates; // Where the fill should begin
  color: Color;
};

export type DragDrawEvent = {
  eventId: string;
  type: "drag";
  mode: EventModes.Draw;
  allCoordinates: Coordinates[];
  color: Color;
  brushThickness: BrushThickness;
};

export type ScreenClearEvent = {
  eventId: string;
  type: "screen-clear";
  color: Color;
};

export type DrawEvents = ClickDrawEvent | ClickFillEvent | DragDrawEvent | ScreenClearEvent;
