"use client";

import React, { useContext, useEffect, useRef } from "react";
import styles from "./canvas.module.scss";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { Brush } from "./tools/Brush";
import { Eraser } from "./tools/Eraser";
import { Rect } from "./tools/Rect";
import { Square } from "./tools/Square";
import Line from "./tools/Line";
import { CanvasContext } from "@/app/main/page";
import { loadCanvas, saveCanvas } from "./functions/canvasFunctions";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL } from "../../../../shared/constants";
import { pushToUndo, setRedoEmpty, setUndoEmpty } from "@/slices/canvas.slice";

export const Canvas = () => {
  const urlParams = useSearchParams();
  const image = urlParams.get("image");
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { toolName, size, color } = useAppSelector((state) => state.tool);
  const { setValue } = useContext(CanvasContext);
  const { push } = useRouter()

  useEffect(() => {
    setValue(canvasRef.current);
    loadCanvas(canvasRef, localStorage.getItem('canvasUrl')!);
    window.addEventListener("beforeunload", () => saveCanvas(canvasRef));

    return () => {
      window.removeEventListener("beforeunload", () => saveCanvas(canvasRef));
    };
  }, []);

  useEffect(() => {
    console.log('test')
    if (image && canvasRef.current) {
      dispatch(setRedoEmpty())
      dispatch(setUndoEmpty())
      const path = `${API_URL}${image}`;
      loadCanvas(canvasRef, path)
      localStorage.setItem('canvasUrl', path)
      push('/main')
    }
  }, [dispatch, image, push]);

  useEffect(() => {
    console.log('test')
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
          tool = new Square(canvasRef.current);
          break;
        case "line":
          tool = new Line(canvasRef.current);
          break;
      }
    }

    if (tool && tool.ctx) {
      tool.lineSize = size;
      tool.fillColor = color;
    }
  }, [dispatch, size, toolName, color]);

  const mouseDownHandler = () => {
    dispatch(pushToUndo(canvasRef.current?.toDataURL()));
    localStorage.setItem("canvasUrl", canvasRef.current!.toDataURL());
  };

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
        onMouseDown={() => mouseDownHandler()}
        onMouseUp={() => saveCanvas(canvasRef)}
        ref={canvasRef}
        className={styles.canvas}
        width={1920}
        height={1080}
      />
    </Box>
  );
};
