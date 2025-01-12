import { socket } from "../../../../../shared/utils/socket.utils";
import { Tool } from "./Tool";

export class Brush extends Tool {
  mouseDown = false;

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
    socket.emit('draw', {
      roomId: this.id,
      figure: {
        type: 'finish'
      }
    })
    this.ctx.beginPath()
  }

  mouseDownHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    this.mouseDown = true;
    this.ctx?.beginPath();
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
          y: e.pageY - target.offsetTop
        }
      })
    }
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
