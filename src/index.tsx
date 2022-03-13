import React from 'react';
import ReactDOM from 'react-dom';

import { AppProviders, App } from './components';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
