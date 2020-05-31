
let reelItemKeyCounter = 0;

export class ReelItem {
  constructor(
    public label?: string,
    public key?: string,
  ) {
    let parsedKey: number;
    if(key !== undefined) {
      parsedKey = +key;
      if(parsedKey > reelItemKeyCounter) {
        reelItemKeyCounter = parsedKey - 1;
      }
    }
    this.key = `${++reelItemKeyCounter}`
  }
}

export class ReelConfig {
  constructor(
    public items?: ReelItem[],
  ){
    if(items === undefined) {
      this.items = [];
    }
  }
}
