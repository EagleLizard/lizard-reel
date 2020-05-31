import React, { useEffect, useCallback, useState } from 'react';

import './reel-page.scss';
import { Page } from '../page';
import { REEL_PAGE } from '../page-service';
import { ReelWheel, ReelWheelProps } from './reel-wheel/reel-wheel';

interface ReelPageProps extends ReelWheelProps {

}

export function ReelPage(props: ReelPageProps) {
  const [ deferLoad, setDeferLoad ] = useState<object>();
  const forceUpdate = useCallback(() => {
    setDeferLoad({});
  }, [])
  useEffect(() => {
    setTimeout(forceUpdate);
  }, []);

  return (
    <Page>
      <div className="reel-app-page">
        <div className="page-header">
          { REEL_PAGE.label }
        </div>
        <div className="reel-wheel-container">
          <ReelWheel
            reelConfig={props.reelConfig}
          />
        </div>
      </div>
    </Page>
  );
}
