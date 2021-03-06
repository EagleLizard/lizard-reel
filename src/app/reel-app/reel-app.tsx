
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './reel-app.scss';
import { HOME_PAGE, SETUP_PAGE, REEL_PAGE } from './pages/page-service';
import { HomePage } from './pages/home-page/home-page';
import { SetupPage } from './pages/setup-page/setup-page';
import { ReelPage } from './pages/reel-page/reel-page';
import { ReelConfig } from './pages/setup-page/setup-service';
import { getSavedReelConfig, setSavedReelConfig } from './local-store/local-store';

export function ReelApp() {
  const [ reelConfig, setReelConfig ] = useState<ReelConfig>();

  const handleReelConfigChange = (reelConfig: ReelConfig) => {
    setSavedReelConfig(reelConfig);
    setReelConfig(reelConfig);
  }

  useEffect(() => {
    let foundReelConfig: ReelConfig;
    foundReelConfig = getSavedReelConfig();
    setReelConfig(foundReelConfig);
  }, []);
  return (
    <div className="reel-app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={HOME_PAGE.route}/>
          </Route>
          <Route path={HOME_PAGE.route}>
            <HomePage/>
          </Route>
          <Route path={SETUP_PAGE.route}>
            <SetupPage
              onChange={handleReelConfigChange}
              reelConfig={reelConfig}
            />
          </Route>
          <Route path={REEL_PAGE.route}>
            <ReelPage
              reelConfig={reelConfig}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
