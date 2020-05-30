
import * as React from 'react';

import './app.scss';
import './theme.scss';

import { TopNav } from './top-nav/top-nav';
import { ReelApp } from './reel-app/reel-app';

export function App() {
  return (
    <div className="lizard-reel-app">
      <div className="top-nav-container">
        <TopNav/>
      </div>
      <div className="app-content-container">
        <ReelApp/>
      </div>
    </div>
  );
}
