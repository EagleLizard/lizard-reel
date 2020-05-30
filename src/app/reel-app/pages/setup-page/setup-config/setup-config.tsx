import React, { useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import './setup-config.scss';
import { ReelConfig, ReelItem } from '../setup-service';
import { TextField, Button } from '@material-ui/core';

interface SetupConfigProps {
  onChange: (config: ReelConfig) => void;
}

export function SetupConfig(props: SetupConfigProps) {
  const [ reelConfig, setReelConfig ] = React.useState<ReelConfig>();
  const [ reelItems, setReelItems ] = React.useState<ReelItem[]>([]);
  const onChange = props.onChange;

  useEffect(() => {
    let nextReelItems: ReelItem[],
      nextReelConfig: ReelConfig;
    nextReelItems = [
      new ReelItem(),
    ];
    console.log('nextReelItems');
    console.log(nextReelItems);
    nextReelConfig = new ReelConfig(nextReelItems);
    setReelItems(nextReelItems);
    setReelConfig(nextReelConfig);
  }, []);
  return (
    <div className="setup-config">
      <div className="reel-item-mapper">
        {
          reelItems.map(reelItem => {
            return (
              <div className="reel-item" key={reelItem.key}>
                <TextField
                  label="Enter Reel Item Name"
                  onChange={$e => {
                    let text: string;
                    text = $e && $e.target && $e.target.value;
                    if(text) {
                      reelItem.label = text;
                    }
                  }}
                />
              </div>
            );
          })
        }
      </div>
      <div className="add-reel-item-button">
        <Button
          variant="contained"
          color="primary"
          disableElevation>
          <div className="item-button-content">
            <AddIcon/>
            <span className="item-button-label">
              Add Item
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
}