/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';

import { ProcessingQueueProvider, ToolbarProvider, EventsManagerProvider } from '../contexts';

export function AppProviders({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <ProcessingQueueProvider>
      <ToolbarProvider>
        <EventsManagerProvider>{children}</EventsManagerProvider>
      </ToolbarProvider>
    </ProcessingQueueProvider>
  );
}
