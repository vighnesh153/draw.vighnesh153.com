/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import { useReducer, useState } from "react";
import { DrawEvents } from "../utils/events";

export interface CanvasHistoryState {
  events: DrawEvents[];
  eventsPointer: number | null;
}

const reducer = (state: CanvasHistoryState, updates: Partial<CanvasHistoryState>): CanvasHistoryState => {
  return { ...state, ...updates };
};

export const useCanvasHistory = () => {
  const [{ events, eventsPointer }, setState] = useReducer(reducer, {
    events: [],
    eventsPointer: null,
  });

  // Hos no history
  const isUndoAvailable = () => (eventsPointer ?? 0) > 0;

  // Has at least 1 event to go forward to
  const isRedoAvailable = () => (eventsPointer ?? 0) < events.length - 1;

  // Undo changes
  const undo = () => {
    if (isUndoAvailable()) {
      setState({ eventsPointer: eventsPointer! - 1 });
    }
  };

  // Redo changes
  const redo = () => {
    if (isRedoAvailable()) {
      setState({ eventsPointer: eventsPointer! + 1 });
    }
  };

  // Adds new event and deletes all the future events
  const addNewEvent = (event: DrawEvents) => {
    // First event
    if (eventsPointer === null) {
      setState({ eventsPointer: 0, events: [event] });
      return;
    }

    const previousEvents = events.slice(0, (eventsPointer ?? 0) + 1);
    setState({ eventsPointer: eventsPointer! + 1, events: [...previousEvents, event] });
  };

  const replaceEvent = (index: number, event: DrawEvents) => {
    const newEvents = events.slice().splice(index, 1, event);
    setState({ events: newEvents });
  };

  return { eventsPointer, events, addNewEvent, replaceEvent, isUndoAvailable, isRedoAvailable, undo, redo };
};
