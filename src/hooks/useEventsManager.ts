/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import {
  BrushThickness,
  ClickDrawEvent,
  ClickFillEvent,
  Color,
  Coordinates,
  DragDrawEvent,
  DrawEvents,
  EventModes,
  ScreenClearEvent,
} from "../utils/events";
import { useCanvasHistory } from "./useCanvasHistory";
import { useEffect, useState } from "react";

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
  const { eventsPointer, events, addNewEvent, replaceEvent, ...canvasHistoryOthers } = useCanvasHistory();
  const [activeEvent, setActiveEvent] = useState<DrawEvents | null>(null);

  // Updates the current active event (which needs to be processed)
  useEffect(() => {
    if (eventsPointer === null) return;
    if (events.length === 0) return;
    setActiveEvent({ ...events[eventsPointer] });
  }, [events, eventsPointer]);

  /**
   * Draw the point where the user clicked
   *
   * @param options
   */
  const onClickDraw = (options: OnClickDrawOptions) => {
    const event: ClickDrawEvent = {
      type: "click",
      mode: EventModes.Draw,
      eventId: createEventId(),
      ...options,
    };
    addNewEvent(event);
  };

  /**
   * Fill from the point where the user clicked
   *
   * @param options
   */
  const onClickFill = (options: OnClickFillOptions) => {
    const event: ClickFillEvent = {
      type: "click",
      mode: EventModes.Fill,
      eventId: createEventId(),
      ...options,
    };
    addNewEvent(event);
  };

  /**
   * Draw the lines from where the user clicked
   *
   * @param options
   * @param eventId
   */
  const onDragDraw = (options: OnDragDrawOptions, eventId = createEventId()) => {
    const event: DragDrawEvent = {
      type: "drag",
      mode: EventModes.Draw,
      eventId,
      ...options,
    };

    // If this is the first event, push it directly to the list
    if (eventsPointer === null) {
      addNewEvent(event);
      return;
    }

    const previousEventIndex = eventsPointer;
    const previousEvent = events[previousEventIndex];

    // if previousEventId == currentEventId, replace it
    if (previousEvent.eventId === eventId) {
      replaceEvent(previousEventIndex, event);
      return;
    }

    // Else, if new event, push it directly
    addNewEvent(event);
  };

  /**
   * Clear the entire screen
   *
   * @param color
   */
  const onClear = (color: Color) => {
    const event: ScreenClearEvent = {
      eventId: createEventId(),
      type: "screen-clear",
      color,
    };
    addNewEvent(event);
  };

  return {
    activeEvent,
    onClickDraw,
    onClickFill,
    onDragDraw,
    onClear,
    ...canvasHistoryOthers,
  };
};
