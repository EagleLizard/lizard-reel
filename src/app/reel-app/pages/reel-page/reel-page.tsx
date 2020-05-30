import * as React from 'react';

import './reel-page.scss';
import { Page } from '../page';
import { REEL_PAGE } from '../page-service';

export function ReelPage() {
  return (
    <Page>
      <div className="reel-app-page">
        <div className="page-header">
          {
            REEL_PAGE.label
          }
        </div>
      </div>
    </Page>
  );
}
