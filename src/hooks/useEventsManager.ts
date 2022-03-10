/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import { useRef } from "react";

import {
  BrushThickness,
  ClickDrawEvent,
  ClickFillEvent,
  Color,
  Coordinates,
  DragDrawEvent,
  DrawEvents,
  ScreenClearEvent,
} from "../utils/events";

const createEventId = (): string => {
  return Math.random().toString();
};

export interface OnClickDrawOptions {
  color: Color;
  brushThickness: BrushThickness;
  coordinates: Coordinates;
}

export interface OnClickFillOptions {
  color: Color;
  coordinates: Coordinates;
}

export interface OnDragDrawOptions {
  color: Color;
  brushThickness: BrushThickness;
  allCoordinates: Coordinates[];
}

export const useEventsManager = () => {
  const eventsRef = useRef<DrawEvents[]>([]);

  /**
   * Draw the point where the user clicked
   *
   * @param options
   */
  const onClickDraw = (options: OnClickDrawOptions) => {
    const event: ClickDrawEvent = {
      type: "click",
      mode: "draw",
      eventId: createEventId(),
      ...options,
    };
    eventsRef.current.push(event);
  };

  /**
   * Fill from the point where the user clicked
   *
   * @param options
   */
  const onClickFill = (options: OnClickFillOptions) => {
    const event: ClickFillEvent = {
      type: "click",
      mode: "fill",
      eventId: createEventId(),
      ...options,
    };
    eventsRef.current.push(event);
  };

  /**
   * Draw the lines from where the user clicked
   *
   * @param options
   * @param eventId
   */
  const onDragDraw = (
    options: OnDragDrawOptions,
    eventId = createEventId()
  ) => {
    const event: DragDrawEvent = {
      type: "drag",
      mode: "draw",
      eventId,
      ...options,
    };

    // If this is the first event, push it directly to the list
    if (eventsRef.current.length === 0) {
      eventsRef.current.push(event);
      return;
    }

    const previousEventIndex = eventsRef.current.length - 1;
    const previousEvent = eventsRef.current[previousEventIndex];

    // if previousEventId == currentEventId, replace it
    if (previousEvent.eventId === eventId) {
      eventsRef.current[previousEventIndex] = event;
      return;
    }

    // Else, if new event, push it directly
    eventsRef.current.push(event);
  };

  /**
   * Clear the entire screen
   *
   * @param color
   */
  const onClear = (color: string) => {
    const event: ScreenClearEvent = {
      eventId: createEventId(),
      type: "screen-clear",
      color,
    };
    eventsRef.current.push(event);
  };

  return {
    onClickDraw,
    onClickFill,
    onDragDraw,
    onClear,
  };
};
