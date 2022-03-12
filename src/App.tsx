/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';

import { Canvas, Toolbar } from './components';
import { useEventsManager, useToolbar } from './hooks';

export function App(): JSX.Element {
  const { updateMode, updateColor, updateBrushThickness, ...others } = useToolbar();
  const { isUndoAvailable, undo, isRedoAvailable, redo, onClickFill, onClickDraw, onDragDraw, onClear, activeEvent } =
    useEventsManager();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas {...others} onClickDraw={onClickDraw} onClickFill={onClickFill} onDragDraw={onDragDraw} />
      <Toolbar
        {...others}
        isUndoAvailable={isUndoAvailable}
        isRedoAvailable={isRedoAvailable}
        updateMode={updateMode}
        updateColor={updateColor}
        updateBrushThickness={updateBrushThickness}
        undo={undo}
        redo={redo}
        onClear={onClear}
      />
    </div>
  );
}
