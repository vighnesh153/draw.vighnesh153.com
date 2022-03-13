/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';

import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';

export function App(): JSX.Element {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '1rem',
      }}
    >
      <Canvas />
      <Toolbar />
    </div>
  );
}
