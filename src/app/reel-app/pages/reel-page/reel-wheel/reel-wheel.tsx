
import React, { useEffect, useRef, ClassAttributes, LegacyRef, useState } from 'react';

import './reel-wheel.scss';
import { ReelConfig } from '../../setup-page/setup-service';
import { ReelRuntime } from './reel-service';

const WHEEL_CANVAS_WIDTH = 800;
const WHEEL_CANVAS_HEIGHT = 600;

export interface ReelWheelProps {
  reelConfig: ReelConfig;
}

export function ReelWheel(props: ReelWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [ context, setContext ] = useState<CanvasRenderingContext2D>();

  const runtime = new ReelRuntime((totalTime) => {
    console.log(`Total runtime: ${totalTime / 1000}s`);
  }, 60);

  useEffect(() => {
    console.log('useEffect in ReelWheel');
    setContext(canvasRef.current.getContext('2d'));
    runtime.start();
    return () => {
      runtime.stop();
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
