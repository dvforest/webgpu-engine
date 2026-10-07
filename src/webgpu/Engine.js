export class Engine {
  constructor(canvas, device, context, format) {
    this.canvas = canvas;
    this.device = device;
    this.context = context;
    this.format = format;
  }

  static async create(canvas) {
    const adapter = await navigator.gpu?.requestAdapter();
    const device = await adapter?.requestDevice();
    if (!device) throw new Error('WebGPU not supported');

    const context = canvas.getContext('webgpu');
    const format = navigator.gpu.getPreferredCanvasFormat();

    context.configure({ device, format });

    return new Engine(canvas, device, context, format);
  }
}
