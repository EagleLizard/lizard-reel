
import store from 'store2';
import { ReelConfig, ReelItem } from '../pages/setup-page/setup-service';

const REEL_CONFIG_ITEMS_KEY = 'lzrd-reel-config-items';

export function setSavedReelConfig(reelConfig: ReelConfig) {
  store(REEL_CONFIG_ITEMS_KEY, reelConfig.items);
}

export function getSavedReelConfig(): ReelConfig {
  let reelItems: ReelItem[], reelConfig: ReelConfig;
  reelItems = store(REEL_CONFIG_ITEMS_KEY);
  if(!Array.isArray(reelItems)) {
    reelItems = [];
  }
  reelItems = reelItems.map(rawItem => {
    return new ReelItem(rawItem.label, rawItem.key);
  });
  reelConfig = new ReelConfig;
  reelConfig.items = reelItems;
  return reelConfig;
}
