
import React, { useEffect, useState, useCallback } from 'react';


import './setup-page.scss';
import { Page } from '../page';
import { SETUP_PAGE } from '../page-service';
import { ReelConfig, ReelItem } from './setup-service';
import { SetupConfig } from './setup-config/setup-config';


interface SetupPageProps {
  onChange: (config: ReelConfig) => void;
}

export function SetupPage(props: SetupPageProps) {
  const [ deferLoad, setDeferLoad ] = useState<object>();
  const forceUpdate = useCallback(() => {
    setDeferLoad({});
  }, [])
  useEffect(() => {
    setTimeout(forceUpdate);
  });
  return (
    <Page>
      <div className="setup-page">
        <div className="page-header">
            { SETUP_PAGE.label }
        </div>
        <div className="page-content">
          <div className="page-section description-text">
            Add the Items you want to spin below
          </div>
          {
            deferLoad && (
              <SetupConfig
                onChange={props.onChange}
              />
            )
          }
        </div>
      </div>
    </Page>
  );
}
