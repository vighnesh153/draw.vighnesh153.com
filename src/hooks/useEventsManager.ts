/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import { Queue } from '@vighnesh153/utils';

import { useCanvasHistory } from './useCanvasHistory';
import { DrawPointEvent, DrawLineEvent, FillEvent, ClearScreenEvent } from '../utils';
import { useProcessingQueueRef } from '../contexts';

export const useEventsManager = () => {
  const processingQueueRef = useProcessingQueueRef();
  const { triggerEvents, ...canvasHistoryOthers } = useCanvasHistory({
    resetTo: (updatedEvents) => (processingQueueRef.current = new Queue(...updatedEvents)),
    addNew: (newEvents) => processingQueueRef.current.pushRight(...newEvents),
  });

  const buildDrawPointEvent = (options: Omit<DrawPointEvent, 'type'>): DrawPointEvent => {
    return { type: 'point', ...options };
  };

  const buildFillEvent = (options: Omit<FillEvent, 'type'>): FillEvent => {
    return { type: 'fill', ...options };
  };

  const buildDrawLineEvent = (options: Omit<DrawLineEvent, 'type'>): DrawLineEvent => {
    return { type: 'line', ...options };
  };

  const buildClearScreenEvent = (options: Omit<ClearScreenEvent, 'type'>): ClearScreenEvent => {
    return { type: 'clear', ...options };
  };

  return {
    ...canvasHistoryOthers,
    buildDrawPointEvent,
    buildFillEvent,
    buildDrawLineEvent,
    buildClearScreenEvent,
    triggerEvents,
  };
};
