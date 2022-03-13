/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { useRef } from 'react';

import { useCanvasMouseEventsHandlers, useEventProcessor } from '../hooks';

export function Canvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { onMouseDown, onMouseMove, onMouseUp } = useCanvasMouseEventsHandlers();

  /**
   * Processes the events ❤️ 😇 🥺
   */
  useEventProcessor({ canvasRef });

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{ border: '10px solid red', width: '100%', height: '100%' }}
    >
      Your browser doesn't seem to support canvas. Please update your browser or try opening in a different browser
    </canvas>
  );
}
