/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import { useState } from "react";
import { DrawEvents } from "../utils/events";

export const useCanvasHistory = () => {
  const [eventsPointer, setEventsPointer] = useState<number | null>(null);
  const [events, setEvents] = useState<DrawEvents[]>([]);

  // Hos no history
  const isUndoAvailable = () => (eventsPointer ?? 0) > 0;

  // Has at least 1 event to go forward to
  const isRedoAvailable = () => (eventsPointer ?? 0) < events.length - 1;

  // Undo changes
  const undo = () => {
    if (isUndoAvailable()) {
      setEventsPointer((p) => p! - 1);
    }
  };

  // Redo changes
  const redo = () => {
    if (isRedoAvailable()) {
      setEventsPointer((p) => p! + 1);
    }
  };

  return { eventsPointer, events, setEvents, isUndoAvailable, isRedoAvailable, undo, redo };
};
