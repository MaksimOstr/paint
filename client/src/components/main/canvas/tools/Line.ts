import { socket } from "../../../../../shared/utils/socket.utils";
import { Tool } from "./Tool";

export default class Line extends Tool {
  currentX: number = 0;
  currentY: number = 0;
  saved: string = "";
  endX: number | undefined
  endY: number | undefined

  constructor(canvas: HTMLCanvasElement, id: string) {
    super(canvas, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    this.mouseDown = true;
    this.ctx.strokeStyle = this.localColor
    this.ctx.lineWidth = this.localBrushWidth
    this.currentX = e.pageX - target.offsetLeft;
    this.currentY = e.pageY - target.offsetTop;
    this.ctx.beginPath();
    this.ctx.moveTo(this.currentX, this.currentY);
    this.saved = this.canvas.toDataURL();
  }

  mouseUpHandler() {
    this.mouseDown = false;
    socket.emit("draw", {
          roomId: this.id,
          figure: {
            type: "line",
            x: this.currentX,
            y: this.currentY,
            endX: this.endX,
            endY: this.endY,
            color: this.localColor,
            lineWidth: this.localBrushWidth
          },
    });
  }

  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;

    if (this.mouseDown) {
      this.endX = e.pageX - target.offsetLeft
      this.endY = e.pageY - target.offsetTop
      this.draw(this.endX, this.endY);
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

  static staticDraw(ctx: CanvasRenderingContext2D, endX: number, endY: number, currentX: number, currentY: number, color: string, lineWidth: number) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}
