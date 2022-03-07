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

export type DrawEvents =
  | {
      eventId: string;
      type: "click";
      mode: "draw";
      coordinates: Coordinates;
      color: Color;
      brushThickness: BrushThickness;
    }
  | {
      eventId: string;
      type: "click";
      mode: "fill";
      coordinates: Coordinates; // Where the fill should begin
      color: Color;
    }
  | {
      eventId: string;
      type: "drag";
      mode: "draw";
      allCoordinates: Coordinates[];
      color: Color;
      brushThickness: BrushThickness;
    }
  | {
      eventId: string;
      type: "clear";
      color: Color;
    };
