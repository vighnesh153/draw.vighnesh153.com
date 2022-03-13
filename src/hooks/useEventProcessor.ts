/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import { useEffect } from 'react';
import { not } from '@vighnesh153/utils';

import { CanvasHelper, colorToRgba, RGBA } from '../utils';
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

      requestAnimationFrame(processEventsFromQueue);
      if (not(mounted)) return;
      if (not(canvasCtx)) return;

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
          case 'clear': {
            const { color } = event;
            canvasCtx?.drawFilledRect(0, 0, canvasCtx?.width, canvasCtx?.height, color);
            break;
          }
          case 'fill': {
            const { coordinates: c, color } = event;
            const canvasWidth = canvasCtx!.width;

            // Initial pixel information for the entire canvas. Doing it this way because invoking
            // getImageData several times is expensive than just doing it once
            const canvasPixelData = canvasCtx!.getImageData(0, 0, canvasCtx!.width, canvasCtx!.height);

            // returns the indices for the r,g,b,a components of the colors of the provided pixel coordinates
            const getColorIndicesForPixel = (
              x: number,
              y: number
            ): { rIndex: number; gIndex: number; bIndex: number; aIndex: number } => {
              const rIndex = y * (canvasWidth * 4) + x * 4;
              const [gIndex, bIndex, aIndex] = [rIndex + 1, rIndex + 2, rIndex + 3];

              return { rIndex, gIndex, bIndex, aIndex };
            };

            const getColorForPixel = (x: number, y: number) => {
              const { rIndex, gIndex, bIndex, aIndex } = getColorIndicesForPixel(x, y);
              const r = canvasPixelData.data[rIndex];
              const g = canvasPixelData.data[gIndex];
              const b = canvasPixelData.data[bIndex];
              const a = canvasPixelData.data[aIndex];
              return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
            };

            // Color of the starting pixel
            const initialColor = getColorForPixel(c.x, c.y);

            // set of all the nodes that are already visited
            const visitedNodes = new Set<string>();
            console.log('reached here');

            // Implementation of BFS algorithm for filling colors in
            // the region
            const colorFillAlgo = (x: number, y: number, newColor: RGBA) => {
              const pixelIndices = getColorIndicesForPixel(x, y);

              console.log('filling', x, y);

              // if index out of bounds, return
              if (x < 0 || x >= canvasCtx!.width || y < 0 || y >= canvasCtx!.height) return;

              // if color is not same as initial color, return
              if (getColorForPixel(x, y) !== initialColor) return;

              // if already visited, return
              if (visitedNodes.has(`${[x, y]}`)) return;

              // Add to visited nodes
              visitedNodes.add(`${[x, y]}`);

              // update the color in pixel data
              canvasPixelData.data[pixelIndices.rIndex] = newColor.r;
              canvasPixelData.data[pixelIndices.gIndex] = newColor.g;
              canvasPixelData.data[pixelIndices.bIndex] = newColor.b;
              canvasPixelData.data[pixelIndices.aIndex] = Math.floor(newColor.a * 255);

              // fill the surrounding nodes
              colorFillAlgo(x + 1, y, newColor);
              colorFillAlgo(x - 1, y, newColor);
              colorFillAlgo(x, y + 1, newColor);
              colorFillAlgo(x, y - 1, newColor);
            };

            // start the algorithm from starting point
            colorFillAlgo(c.x, c.y, colorToRgba(color));

            // update the canvas with the new color values
            canvasCtx!.putImageData(canvasPixelData, 0, 0);

            break;
          }
          default: {
            throw new Error(`Invalid event: ${event}`);
          }
        }
      }
    };

    processEventsFromQueue();
    return () => {
      mounted = false;
    };
  }, []);
};
