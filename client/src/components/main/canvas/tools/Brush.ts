import { socket } from "../../../../../shared/utils/socket.utils";
import { Tool } from "./Tool";

export class Brush extends Tool {

constructor(canvas: HTMLCanvasElement, id?: string) {
    super(canvas, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
}

  mouseUpHandler() {
    this.mouseDown = false;
    socket.emit('finishDrawing', { roomId: this.id })
  }

  mouseDownHandler(e: MouseEvent) {
    this.ctx?.beginPath();
    this.ctx.lineWidth = this.localBrushWidth
    this.ctx.strokeStyle = this.localBrushColor
    const target = e.target as HTMLElement;
    this.mouseDown = true;
    this.ctx?.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
  }

  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (this.mouseDown) {
      this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
      socket.emit('draw', {
        roomId: this.id,
        figure: {
          type: 'brush',
          x: e.pageX - target.offsetLeft,
          y: e.pageY - target.offsetTop,
          lineWidth: this.ctx.lineWidth,
          color: this.ctx.fillStyle
        }
      })
    }
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, lineWidth: number, color: string) {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
