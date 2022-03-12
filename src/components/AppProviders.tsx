/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';

import { ProcessingQueueProvider, ToolbarProvider } from '../contexts';

export function AppProviders({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <ProcessingQueueProvider>
      <ToolbarProvider>{children}</ToolbarProvider>
    </ProcessingQueueProvider>
  );
}
