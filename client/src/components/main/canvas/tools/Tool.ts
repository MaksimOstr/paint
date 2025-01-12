export class Tool {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  id: string | undefined

  constructor(canvas: HTMLCanvasElement, id?: string) {
    this.canvas = canvas;
    this.id = id
    this.ctx = canvas.getContext('2d')!
    this.destroyEvents()
  }


  set lineSize(size: number) {
    if(this.ctx) {
      this.ctx.lineWidth = size 
    }
  }

  set fillColor(color: string) {
    if(this.ctx) {
      this.ctx.strokeStyle = color
      this.ctx.fillStyle = color
    }
  }

  destroyEvents() {
    if (this.canvas) {
      this.canvas.onmousedown = null
      this.canvas.onmousemove = null
      this.canvas.onmouseup = null
    }
  }
}
