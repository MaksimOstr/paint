"use client";

import React, { useEffect, useRef } from "react";
import styles from "./canvas.module.scss";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { Brush } from "./tools/Brush";
import { Eraser } from "./tools/Eraser";
import { Rect } from "./tools/Rect";
import { Square } from "./tools/Square";
import Line from "./tools/Line";

export const Canvas = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toolName, size, color } = useAppSelector((state) => state.canvas);

  useEffect(() => {
    console.log(toolName);
    let tool;
    if (canvasRef.current) {
      switch (toolName) {
        case "brush":
          tool = new Brush(canvasRef.current);
          break;
        case "eraser":
          tool = new Eraser(canvasRef.current);
          break;
        case "rect":
          tool = new Rect(canvasRef.current);
          break;
        case "square": 
          tool = new Square(canvasRef.current)
          break
        case "line":
          tool = new Line(canvasRef.current)
          break
      }
    }

    if (tool && tool.ctx) {
      tool.lineSize = size;
      tool.fillColor = color;
    }
  }, [dispatch, size, toolName, color]);

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      mb="30px"
    >
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={1920}
        height={1080}
      />
    </Box>
  );
};
