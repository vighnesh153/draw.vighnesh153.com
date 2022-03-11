export type Coordinates = {
  x: number;
  y: number;
};

export enum Color {
  Black = 'hsl(0, 0%, 0%)',
  Gray = 'hsl(0, 0%, 34%)',
  LightGray = 'hsl(0, 0%, 63%)',
  Purple = 'hsl(291, 64%, 42%)',
  LightBlue = 'hsl(229, 100%, 81%)',
  DarkBlue = 'hsl(229, 68%, 50%)',
  SkyBlue = 'hsl(180, 67%, 49%)',
  LightGreen = 'hsl(114, 39%, 63%)',
  Green = 'hsl(122, 39%, 49%)',
  LimeGreen = 'hsl(73, 100%, 50%)',
  Yellow = 'hsl(55, 100%, 60%)',
  Orange = 'hsl(28, 100%, 60%)',
  Peach = 'hsl(46, 51%, 82%)',
  Brown = 'hsl(28, 68%, 30%)',
  Pink = 'hsl(339, 81%, 85%)',
  Red = 'hsl(4, 90%, 58%)',
  DarkRed = 'hsl(0, 66%, 41%)',
  White = 'hsl(0, 0%, 100%)',
}
export enum BrushThickness {
  xs = 5,
  sm = 10,
  md = 15,
  lg = 20,
  xl = 25,
}

export enum EventModes {
  Draw = 'draw',
  Fill = 'fill',
}

export type ClickDrawEvent = {
  eventId: string;
  type: 'click';
  mode: EventModes.Draw;
  coordinates: Coordinates;
  color: Color;
  brushThickness: BrushThickness;
};

export type ClickFillEvent = {
  eventId: string;
  type: 'click';
  mode: EventModes.Fill;
  coordinates: Coordinates; // Where the fill should begin
  color: Color;
};

export type DragDrawEvent = {
  eventId: string;
  type: 'drag';
  mode: EventModes.Draw;
  allCoordinates: Coordinates[];
  color: Color;
  brushThickness: BrushThickness;
};

export type ScreenClearEvent = {
  eventId: string;
  type: 'screen-clear';
  color: Color;
};

export type DrawEvents = ClickDrawEvent | ClickFillEvent | DragDrawEvent | ScreenClearEvent;
