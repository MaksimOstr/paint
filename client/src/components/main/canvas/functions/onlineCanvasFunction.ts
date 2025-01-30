import { IWebSocketDrawingRes } from "@/lib/types/drawing.types";
import { Brush } from "../tools/Brush";
import { Square } from "../tools/Square";
import { Eraser } from "../tools/Eraser";
import { Rect } from "../tools/Rect";
import Line from "../tools/Line";
import Circle from "../tools/Circle";
import { socket } from "@/lib/shared/utils/socket.utils";

export const drawOnlineHandler = (msg: IWebSocketDrawingRes, canvasRef: React.RefObject<HTMLCanvasElement | null>, roomId: string) => {
    const figure = msg.figure;
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        switch (figure.type) {
          case "brush":
            Brush.staticDraw(ctx, figure.x, figure.y, figure.lineWidth, figure.color);
            break;
          case "square":
            Square.staticDraw(ctx, figure.x, figure.y, figure.sideLength!, figure.color)
            socket.emit('finishDrawing', { roomId })
            break
          case "clear":
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            break
          case "eraser":
            Eraser.staticDrawing(ctx, figure.x, figure.y, figure.lineWidth)
          break
          case "rect":
            Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
            socket.emit('finishDrawing', { roomId })
          break
          case "line":
            Line.staticDraw(ctx, figure.endX, figure.endY, figure.x, figure.y, figure.color, figure.lineWidth)
            socket.emit('finishDrawing', { roomId })
          break
          case "circle":
            Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.color)
            socket.emit('finishDrawing', { roomId })
          break
        }
      }
    }
  };
  