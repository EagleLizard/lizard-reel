import React, { useEffect, ChangeEvent, MouseEvent, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './setup-config.scss';
import { ReelConfig, ReelItem } from '../setup-service';
import { TextField, Button, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { REEL_PAGE } from '../../page-service';

export interface SetupConfigProps {
  onChange: (config: ReelConfig) => void;
  reelConfig: ReelConfig | undefined; 
}

export function SetupConfig(props: SetupConfigProps) {
  const [ reelConfig, setReelConfig ] = useState<ReelConfig>(props.reelConfig);
  const [ reelItems, setReelItems ] = useState<ReelItem[]>([]);
  const [ isValidReelNext, setIsValidReelNext ] = useState<boolean>(false);
  const history = useHistory();

  const onChange = props.onChange;

  const validateReelNext = (nextReelConfig: ReelConfig) => {
    let areReelItemsValid: boolean;
    areReelItemsValid = nextReelConfig.items.some(reelItem => {
      return reelItem.label && reelItem.label.length > 0;
    });
    setIsValidReelNext(areReelItemsValid);
  };

  const updateReelConfig = (nextReelItems: ReelItem[]) => {
    let nextReelConfig: ReelConfig;
    nextReelConfig = new ReelConfig(nextReelItems);
    validateReelNext(nextReelConfig);
    onChange(nextReelConfig);
  };

  const handleAddButtonClick = () => {
    let nextReelItems: ReelItem[];
    nextReelItems = reelItems.slice();
    nextReelItems.push(new ReelItem);
    setReelItems(nextReelItems);
    updateReelConfig(nextReelItems);
  };

  const handleDeleteButtonClick = (reelItemToDelete: ReelItem) => {
    let nextReelItems: ReelItem[], foundItemIdx: number;
    nextReelItems = reelItems.slice();
    foundItemIdx = reelItems.findIndex(reelItem => {
      return reelItem.key === reelItemToDelete.key;
    });
    if(foundItemIdx !== -1) {
      nextReelItems.splice(foundItemIdx, 1);
    }
    setReelItems(nextReelItems);
    updateReelConfig(nextReelItems);
  };

  const handleReelInputChange = (
    $e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    reelItem: ReelItem,
  ) => {
    let text: string,
      foundReelItemIdx: number,
      foundReelItem: ReelItem,
      nextReelItems: ReelItem[];
    nextReelItems = reelItems.slice();
    foundReelItemIdx = nextReelItems.findIndex(nextReelitem => {
      return nextReelitem.key === reelItem.key;
    });
    if(foundReelItemIdx !== -1) {
      foundReelItem = nextReelItems[foundReelItemIdx];
      text = $e && $e.target && $e.target.value;
      if(text !== undefined) {
        foundReelItem.label = text;
      }
    }
    setReelItems(nextReelItems);
    updateReelConfig(nextReelItems);
  };

  const handleSpinButtonClick = () => {
    if(isValidReelNext) {
      history.push(REEL_PAGE.route);
    }
  };

  useEffect(() => {
    let nextReelItems: ReelItem[];
    nextReelItems = (props.reelConfig === undefined)
      ? [ new ReelItem ]
      : props.reelConfig.items;
    setReelItems(nextReelItems);
    updateReelConfig(nextReelItems);;
  }, []);

  return (
    <div className="setup-config">
      <div className="reel-item-mapper">
        {
          reelItems.map(reelItem => {
            return (
              <div
                className="reel-item-input-container"
                key={reelItem.key}>
                <ReelInputItem
                  reelItem={reelItem}
                  onChange={$e => {
                    handleReelInputChange($e, reelItem);
                  }}
                />
                <div className="delete-button-container">
                  <IconButton
                    onClick={() => {
                      handleDeleteButtonClick(reelItem);
                    }}>
                    <HighlightOffIcon/>
                  </IconButton>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="add-reel-item-button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleAddButtonClick();
          }}
          disableElevation>
          <div className="item-button-content">
            <AddIcon/>
            <span className="item-button-label">
              Add Item
            </span>
          </div>
        </Button>
      </div>
      <div className="reel-next">
        <Button
          variant="outlined"
          disabled={!isValidReelNext}
          onClick={() => {
            handleSpinButtonClick();
          }}>
          SPIN
        </Button>
      </div>
    </div>
  );
}

interface ReelInputItemProps {
  reelItem: ReelItem,
  onChange: ($e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function ReelInputItem(props: ReelInputItemProps) {
  return (
    <div className="reel-item">
      <TextField
        label="Enter Reel Item Name"
        value={props.reelItem.label}
        onChange={props.onChange}
      />
    </div>
  );
}