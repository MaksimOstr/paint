import { Brush } from "../tools/Brush";
import Circle from "../tools/Circle";
import { Eraser } from "../tools/Eraser";
import Line from "../tools/Line";
import { Rect } from "../tools/Rect";
import { Square } from "../tools/Square";


export const loadCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  canvasData: string
) => {
  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext("2d");
    if (canvasData && ctx) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = canvasData;
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctx.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
      };
    }
  }
};

export const saveCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) => {
  if (canvasRef.current) {
    const dataURL = canvasRef.current.toDataURL();
    localStorage.setItem("canvasUrl", dataURL);
  }
};

export const selectToolParam = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  toolName: string,
  size: number,
  color: string,
  roomId: string | null
) => {
  let tool;
  if (canvasRef.current) {
    switch (toolName) {
      case "brush":
        tool = new Brush(canvasRef.current, roomId!);
        break;
      case "eraser":
        tool = new Eraser(canvasRef.current);
        break;
      case "rect":
        tool = new Rect(canvasRef.current);
        break;
      case "square":
        tool = new Square(canvasRef.current, roomId!);
        break;
      case "line":
        tool = new Line(canvasRef.current);
        break;
      case "circle":
        tool = new Circle(canvasRef.current)
        break
    }
  }

  if (tool && tool.ctx) {
    tool.lineSize = size;
    tool.fillColor = color;
  }
};
