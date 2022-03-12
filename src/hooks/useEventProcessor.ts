/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import { useEffect } from 'react';
import { not } from '@vighnesh153/utils';

import { CanvasHelper } from '../utils';
import { useProcessingQueueRef } from '../contexts';

export interface UseEventProcessorProps {
  canvasHelper: React.MutableRefObject<CanvasHelper | undefined>;
}

export const useEventProcessor = ({ canvasHelper }: UseEventProcessorProps) => {
  const processingQueueRef = useProcessingQueueRef();

  useEffect(() => {
    let mounted = true;

    const processEventsFromQueue = () => {
      const canvasCtx = canvasHelper.current;
      const queue = processingQueueRef.current;

      if (not(mounted)) return;

      while (not(queue.isEmpty)) {
        const event = queue.popLeft()!;

        switch (event.type) {
          case 'point': {
            const { color, coordinates, brushThickness } = event;
            canvasCtx?.drawFilledCircle(coordinates.x, coordinates.y, brushThickness / 2, color);
            break;
          }
          case 'line': {
            const { color, brushThickness, coordinate1: c1, coordinate2: c2 } = event;
            canvasCtx?.drawLine(c1.x, c1.y, c2.x, c2.y, brushThickness, color);
            break;
          }
          case 'fill':
            break;
          case 'clear': {
            const { color } = event;
            canvasCtx?.drawFilledRect(0, 0, canvasCtx?.width, canvasCtx?.height, color);
            break;
          }
        }
      }

      requestAnimationFrame(processEventsFromQueue);
    };

    processEventsFromQueue();
    return () => {
      mounted = false;
    };
  }, []);
};
