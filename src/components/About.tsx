/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';

export function About(): JSX.Element {
  return (
    <div style={{ padding: '1rem 3rem', textAlign: 'center' }}>
      <h1>A Drawing App</h1>
      <p>
        Made with ❤️ by{' '}
        <a href="https://vighnesh153.com" target="_blank" rel="noreferrer">
          Vighnesh Raut
        </a>
      </p>
    </div>
  );
}
