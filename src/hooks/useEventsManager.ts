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
} from '../utils';
import { useCanvasHistory } from './useCanvasHistory';
import { useEffect, useState } from 'react';

export const createEventId = (): string => {
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
  replacePreviousDragEvent?: boolean;
}

export const useEventsManager = () => {
  const { eventsPointer, events, addNewEvent, replaceEvent, ...canvasHistoryOthers } = useCanvasHistory();
  const [{ activeEvent, previousEventIds }, setDerivedState] = useState<{
    activeEvent: DrawEvents | null;
    previousEventIds: Set<string>;
  }>({ activeEvent: null, previousEventIds: new Set() });

  // Updates the current active event (which needs to be processed)
  useEffect(() => {
    if (eventsPointer === null) return;
    if (events.length === 0) return;
    setDerivedState({
      activeEvent: events[eventsPointer],
      previousEventIds: new Set(events.slice(0, eventsPointer + 1).map((event) => event.eventId)),
    });
  }, [events, eventsPointer]);

  /**
   * Draw the point where the user clicked
   *
   * @param options
   */
  const onClickDraw = (options: OnClickDrawOptions) => {
    const event: ClickDrawEvent = {
      type: 'click',
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
      type: 'click',
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
   * @param replacePreviousDragEvent
   */
  const onDragDraw = (options: OnDragDrawOptions) => {
    const event: DragDrawEvent = {
      type: 'drag',
      mode: EventModes.Draw,
      eventId: createEventId(),
      ...options,
    };

    // If this is the first event, push it directly to the list
    if (eventsPointer === null) {
      addNewEvent(event);
      return;
    }

    const previousEvent = events[eventsPointer];
    if (previousEvent.type === 'drag' && options.replacePreviousDragEvent) {
      event.eventId = previousEvent.eventId;
      replaceEvent(eventsPointer, event);
    }

    // Else, push it directly
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
      type: 'screen-clear',
      color,
    };
    addNewEvent(event);
  };

  return {
    activeEvent,
    previousEventIds,
    onClickDraw,
    onClickFill,
    onDragDraw,
    onClear,
    ...canvasHistoryOthers,
  };
};
