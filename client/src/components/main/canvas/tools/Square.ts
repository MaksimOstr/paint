import { Tool } from "./Tool";

export class Square extends Tool {
  private isDrawing: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private savedCanvas: string = "";

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  private listen() {
    this.canvas.onmousedown = this.onMouseDown.bind(this);
    this.canvas.onmousemove = this.onMouseMove.bind(this);
    this.canvas.onmouseup = this.onMouseUp.bind(this);
  }

  private onMouseDown(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.startX = event.clientX - rect.left;
    this.startY = event.clientY - rect.top;
    this.isDrawing = true;
    this.savedCanvas = this.canvas.toDataURL();
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.isDrawing) return;

    const rect = this.canvas.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    const sideLength = Math.max(
      Math.abs(currentX - this.startX),
      Math.abs(currentY - this.startY)
    );

    const adjustedX = currentX < this.startX ? this.startX - sideLength : this.startX;
    const adjustedY = currentY < this.startY ? this.startY - sideLength : this.startY;

    this.drawPreview(adjustedX, adjustedY, sideLength);
  }

  private onMouseUp() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
  }

  private drawPreview(x: number, y: number, sideLength: number) {
    const image = new Image();
    image.src = this.savedCanvas;

    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.draw(x, y, sideLength, true);
    };
  }

  public draw(x: number, y: number, sideLength: number, fill: boolean = true) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, sideLength, sideLength);
    if (fill) {
      this.ctx.fill();
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
