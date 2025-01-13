import { Tool } from "./Tool";

export default class Line extends Tool {
  currentX: number = 0;
  currentY: number = 0;
  saved: string = "";

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler(e: MouseEvent) {
    this.ctx.lineWidth = 1
    const target = e.target as HTMLElement;
    this.mouseDown = true;
    this.currentX = e.pageX - target.offsetLeft;
    this.currentY = e.pageY - target.offsetTop;
    this.ctx.beginPath();
    this.ctx.moveTo(this.currentX, this.currentY);
    this.saved = this.canvas.toDataURL();
  }

  mouseUpHandler() {
    this.mouseDown = false;
  }

  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (this.mouseDown) {
      this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
    }
  }

  draw(x: number, y: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.currentX, this.currentY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }
}
