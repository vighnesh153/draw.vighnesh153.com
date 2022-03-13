/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';

import { Canvas, Toolbar } from './components';

export function App(): JSX.Element {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas />
      <Toolbar />
    </div>
  );
}
