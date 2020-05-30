
import * as React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import './home-page.scss';
import { Page } from '../page';
import { HOME_PAGE, SETUP_PAGE } from '../page-service';

export function HomePage() {
  const history = useHistory();
  const [ isRouting, setIsRouting ] = React.useState(false);
  const handleClick = ($e: any) => {
    if(isRouting) {
      return;
    }
    setIsRouting(true);
    setTimeout(() => {
      history.push(SETUP_PAGE.route);
    }, 300);
  };
  return (
    <Page>
      <div className="home-page">
        <div className="page-header">
          { HOME_PAGE.label }
        </div>
        <div className="page-content">
          <div className="page-section description-text">
            Welcome to the REEL, get ready to <em>spin that wheel</em>
          </div>
          <div className="page-section getting-started-container">
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={e => handleClick(e)}>
              <div className="getting-started-action">
                Get Started
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
}
