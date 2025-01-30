import { socket } from "@/lib/shared/utils/socket.utils";
import { Tool } from "./Tool";

export class Square extends Tool {
  private startX: number = 0;
  private startY: number = 0;
  private savedCanvas: string = "";
  adjustedX: number = 0
  adjustedY: number = 0
  sideLength: number = 0

  constructor(canvas: HTMLCanvasElement, id?: string) {
    super(canvas, id);
    this.listen();
  }

  private listen() {
    this.canvas.onmousedown = this.onMouseDown.bind(this);
    this.canvas.onmousemove = this.onMouseMove.bind(this);
    this.canvas.onmouseup = this.onMouseUp.bind(this);
  }

  private onMouseDown(e: MouseEvent) {
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = this.localColor
    this.ctx.fillStyle = this.localColor
    this.ctx.beginPath()
    const rect = this.canvas.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
    this.mouseDown = true;
    this.savedCanvas = this.canvas.toDataURL();
  }

  private onMouseMove(e: MouseEvent) {
    if (!this.mouseDown) return;
    const rect = this.canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    this.sideLength = Math.max(
      Math.abs(currentX - this.startX),
      Math.abs(currentY - this.startY)
    );

    this.adjustedX =
      currentX < this.startX ? this.startX - this.sideLength : this.startX;
    this.adjustedY =
      currentY < this.startY ? this.startY - this.sideLength : this.startY;

    this.drawPreview(this.adjustedX, this.adjustedY, this.sideLength);
  }

  private onMouseUp() {
    this.mouseDown = false;
    socket.emit("draw", {
      roomId: this.id,
      figure: {
        type: "square",
        x: this.adjustedX,
        y: this.adjustedY,
        sideLength: this.sideLength,
        color: this.localColor
      },
    });
  }

  private drawPreview(x: number, y: number, sideLength: number) {
    const image = new Image();
    image.src = this.savedCanvas;

    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.draw(x, y, sideLength);
    };
  }

  public draw(x: number, y: number, sideLength: number) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, sideLength, sideLength);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    sideLength: number,
    color: string
  ) {
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.beginPath();
    ctx.rect(x, y, sideLength, sideLength);
    ctx.fill();
    ctx.stroke();
  }
}
