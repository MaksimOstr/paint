import { socket } from "../../../../../shared/utils/socket.utils";
import { Brush } from "./Brush";

export class Eraser extends Brush {
  constructor(canvas: HTMLCanvasElement, id: string) {
    super(canvas, id);
  }

mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (this.mouseDown) {
      this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
      socket.emit('draw', {
        roomId: this.id,
        figure: {
          type: 'eraser',
          x: e.pageX - target.offsetLeft,
          y: e.pageY - target.offsetTop,
          lineWidth: this.localBrushWidth,
        }
      })
    }
  }
  
  draw(x: number, y: number) {
    this.ctx.strokeStyle = "white";
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  static staticDrawing(ctx: CanvasRenderingContext2D, x: number, y: number, width: number) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = width
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
