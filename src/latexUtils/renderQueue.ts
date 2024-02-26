//This module implements protections against trying to use the engine while
//  it is initializing or already rendering something

//This promise doesn't get resolved until the engine has finished initializing.
//  Other functions in other files can await this to avoid running until engine
//  is ready
let resolveInitPromise: (value?: void) => void;

export const initializationPromise = new Promise((resolve) => {
  resolveInitPromise = resolve;
});

//This gets called in app.tsx right after the engine finishes initializing
export const notifyInitializationComplete = () => {
  resolveInitPromise();
};

//This class implements a queue which will expand if generatePdfBlobSafe is called multiple
//  times quickly. This way each call will wait its turn to use the engine
class RenderQueueManager {
  private queue: (() => Promise<any>)[] = [];
  private isProcessing = false;

  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  async enqueue<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push(() => task().then(resolve).catch(reject));
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const currentTask = this.queue.shift();
      if (currentTask != null) {
        await currentTask();
      }
    }

    this.isProcessing = false;
  }
}

// Export a singleton instance
export const renderQueueManager = new RenderQueueManager();
