
import React, { useEffect, useRef, ClassAttributes, LegacyRef, useState } from 'react';

import './reel-wheel.scss';
import { ReelConfig } from '../../setup-page/setup-service';
import { ReelRuntime } from './reel-runtime';
import { WheelDrawer } from './wheel-drawer';

const WHEEL_CANVAS_WIDTH = 800;
const WHEEL_CANVAS_HEIGHT = 600;

export interface ReelWheelProps {
  reelConfig: ReelConfig;
}

export function ReelWheel(props: ReelWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [ context, setContext ] = useState<CanvasRenderingContext2D>();
  const [ runtime, setRuntime ] = useState<ReelRuntime>();

  useEffect(() => {
    let nextRuntime: ReelRuntime, nextContext: CanvasRenderingContext2D;
    console.log('useEffect in ReelWheel');
    nextContext = canvasRef.current.getContext('2d');
    nextRuntime = new ReelRuntime((totalTime) => {
      console.log(`Total runtime: ${totalTime / 1000}s`);
      WheelDrawer.draw(props.reelConfig.items, nextContext);
    }, 60);
    nextRuntime.start();
    setContext(nextContext);
    setRuntime(nextRuntime);
    return () => {
      nextRuntime.stop();
    }
  }, []);

  return (
    <div className="reel-wheel">
      wheel
      <div className="reel-wheel-canvas-container">
        <canvas
          ref={canvasRef}
          width={WHEEL_CANVAS_WIDTH}
          height={WHEEL_CANVAS_HEIGHT}
        />
      </div>
    </div>
  );
}
