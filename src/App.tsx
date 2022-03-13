/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { useRef } from 'react';

import { Canvas, Toolbar } from './components';
import { useEventsManager } from './hooks';
import { Color } from './utils';

export function App(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    undo,
    redo,
    isUndoAvailable,
    isRedoAvailable,
    buildClearScreenEvent,
    buildDrawLineEvent,
    buildFillEvent,
    buildDrawPointEvent,
    triggerEvents,
  } = useEventsManager();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas
        canvasRef={canvasRef}
        buildDrawLineEvent={buildDrawLineEvent}
        buildFillEvent={buildFillEvent}
        buildDrawPointEvent={buildDrawPointEvent}
        triggerEvents={triggerEvents}
      />
      <Toolbar
        isUndoAvailable={isUndoAvailable}
        isRedoAvailable={isRedoAvailable}
        undo={undo}
        redo={redo}
        onClear={() => triggerEvents(buildClearScreenEvent({ color: Color.White }))}
      />
    </div>
  );
}
