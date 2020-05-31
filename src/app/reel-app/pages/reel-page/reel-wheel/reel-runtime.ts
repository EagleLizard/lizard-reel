
export class ReelRuntime {
  private interval: number;
  private startMs: number;
  private paused: boolean;
  constructor(
    private executor: (totalTime: number) => unknown,
    private fps: number,
  ) {
    this.interval = 1000 / fps;
    this.paused = false;
  }

  start() {
    const self = this;
    self.startMs = Date.now();
    loop();
    function loop() {
      setTimeout(() => {
        const totalTime = Date.now() - self.startMs;
        self.executor(totalTime);
        if(!self.paused) {
          loop();
        }
      }, self.interval);
    }
  }

  stop() {
    this.paused = true;
  }
}
