import { socket } from "@/lib/shared/utils/socket.utils";
import { Tool } from "./Tool";

export default class Circle extends Tool {
  startX: number = 0;
  startY: number = 0;
  saved: string = "";
  r: number = 0
  constructor(canvas: HTMLCanvasElement, id: string) {
    super(canvas, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseDownHandler(e: MouseEvent) {
    this.ctx.lineWidth = 1
    const target = e.target as HTMLElement;
    this.mouseDown = true;
    this.ctx.strokeStyle = this.localColor
    this.ctx.fillStyle = this.localColor
    const canvasData = this.canvas.toDataURL();
    this.ctx.beginPath();
    this.startX = e.pageX - target.offsetLeft;
    this.startY = e.pageY - target.offsetTop;
    this.saved = canvasData;
  }

  mouseUpHandler() {
    this.mouseDown = false;
    socket.emit('draw', {
          roomId: this.id, 
          figure: {
            type: 'circle',
            x: this.startX,
            y: this.startY,
            r: this.r,
            color: this.localColor
          }
        })
  }

  mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (this.mouseDown) {
      const curentX = e.pageX - target.offsetLeft;
      const curentY = e.pageY - target.offsetTop;
      const width = curentX - this.startX;
      const height = curentY - this.startY;
       this.r = Math.sqrt(width ** 2 + height ** 2);
      this.draw(this.startX, this.startY, this.r);
    }
  }

  draw(x: number, y: number, r: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = async () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}
