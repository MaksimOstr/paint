export class Tool {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  id: string | undefined
  mouseDown = false
  localBrushWidth = 0
  localColor = ''

  constructor(canvas: HTMLCanvasElement, id?: string) {
    this.canvas = canvas;
    this.id = id
    this.ctx = canvas.getContext('2d')!
    this.destroyEvents()
  }


  set lineSize(size: number) {
    if(this.ctx) {
      this.ctx.lineWidth = size 
      this.localBrushWidth = size
    }
  }

  set fillColor(color: string) {
    if(this.ctx) {
      this.ctx.strokeStyle = color
      this.ctx.fillStyle = color
      this.localColor = color
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
