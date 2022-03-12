/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';

import { Canvas, Toolbar } from './components';
import { useToolbar } from './hooks';

export function App(): JSX.Element {
  const { mode, color, brushThickness, updateMode, updateColor, updateBrushThickness } = useToolbar();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas />
      <Toolbar
        mode={mode}
        color={color}
        brushThickness={brushThickness}
        updateMode={updateMode}
        updateColor={updateColor}
        updateBrushThickness={updateBrushThickness}
      />
    </div>
  );
}
