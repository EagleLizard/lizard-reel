import { ReelItem } from "../../setup-page/setup-service";

interface WheelDrawerParams {
  reelItems: ReelItem[];
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
}

export class WheelDrawer {
  static draw(options: WheelDrawerParams) {
    let itemSize: number, centerX: number, centerY: number;
    const { reelItems, ctx, canvasWidth, canvasHeight } = options;
    itemSize = 1 / reelItems.length;
    centerX = canvasWidth / 2;
    centerY = canvasHeight / 2;
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, canvasHeight / 2, Math.PI, Math.PI * 1.25);
    ctx.fill();
  }
}
