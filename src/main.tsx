import * as React from 'react';
import * as ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/app';

import './main.scss';

ReactDOM.render(<Index/>, document.getElementById('app-root'));

function Index() {
  return (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  );
}