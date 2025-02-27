import { socket } from "@/lib/shared/utils/socket.utils";
import { Tool } from "./Tool";

export class Rect extends Tool {
  startX: number = 0;
  startY: number = 0;
  saved: string = ''
  height: number | undefined
  width: number | undefined
  constructor(canvas: HTMLCanvasElement, id: string) {
    super(canvas, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
    socket.emit('draw', {
      roomId: this.id, 
      figure: {
        type: 'rect',
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
        color: this.localColor
      }
    })
  }

  mouseDownHandler(e: MouseEvent) {
    this.ctx.lineWidth = 1
    const target = e.target as HTMLElement;
    this.mouseDown = true;
    this.ctx.strokeStyle = this.localColor
    this.ctx.fillStyle = this.localColor
    this.ctx?.beginPath();
    this.startX = e.pageX - target.offsetLeft;
    this.startY = e.pageY - target.offsetTop;
    this.saved = this.canvas?.toDataURL();
  }

  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (this.mouseDown) {
      const currentX = e.pageX - target.offsetLeft;
      const currentY = e.pageY - target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx.beginPath()
        this.ctx.rect(x, y, w, h)
        this.ctx.fill()
        this.ctx.stroke()
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
    ctx.fillStyle = color
    ctx.strokeStyle = color
    
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
}
}
