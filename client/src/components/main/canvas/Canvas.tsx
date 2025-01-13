"use client";

import React, { useContext, useEffect, useRef } from "react";
import styles from "./canvas.module.scss";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { Brush } from "./tools/Brush";
import { CanvasContext } from "@/app/main/page";
import { loadCanvas, saveCanvas, selectToolParam } from "./functions/canvasFunctions";
import { pushToUndo } from "@/slices/canvas.slice";
import { socket } from "../../../../shared/utils/socket.utils";
import { toast } from "react-toastify";
import { setLobbyUsers, setRoomId } from "@/slices/lobby.slice";
import { IWebSocketDrawingRes } from "@/types/drawing.types";
import { useGetUserProfileQuery } from "@/services/auth.service";
import { Square } from "./tools/Square";
import { setTool } from "@/slices/tool.slice";


export const Canvas = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { toolName, size, color } = useAppSelector((state) => state.tool);
  const { setValue } = useContext(CanvasContext);
  const roomId = useAppSelector((state) => state.lobby.roomId);
  const { data } = useGetUserProfileQuery()

  //Saving and loading canvasState
  useEffect(() => {
    setValue(canvasRef.current);
    loadCanvas(canvasRef, localStorage.getItem("canvasUrl")!);
    window.addEventListener("beforeunload", () => saveCanvas(canvasRef));

    return () => {
      window.removeEventListener("beforeunload", () => saveCanvas(canvasRef));
    };
  }, [setValue]);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d");
    if (roomId && data?.username) {
      socket.connect();
      socket.emit("join room", {roomId, username: data.username, id: data.id});
      dispatch(setTool('brush'))
      socket.on("joinSuccess", (res) => {
        toast.success(res.message);
      });

      socket.on('userJoining', (res) => {
        toast.info(`${res.username} had joined to the room!`)
      })

      socket.on('userLeaving', (res) => {
        toast.info(`${res.username} left the room.`)
      })

      socket.on('disconnect', () => {
        toast.success('You disconnected from the room!')
        localStorage.removeItem("roomId");
        dispatch(setRoomId(null));
      })

      socket.on('roomClosing', (res) => {
        toast.info(res.message)
      })
      
      socket.on("joinError", (res) => {
        localStorage.removeItem("roomId");
        dispatch(setRoomId(null));
        toast.error(res.message);
        socket.disconnect();
      });

      socket.on('updateUserList', (res) => {
        console.log(res)
        dispatch(setLobbyUsers(res))
      })

      socket.on("drawing", (res) => {
        drawHandler(res);
      });

      socket.on('finishDraw', () => {
        ctx!.beginPath()
      })
    }

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
  }, [data?.username, dispatch, roomId]);

//Setting tool for painting
  useEffect(() => {
    selectToolParam(canvasRef, toolName, size, color, roomId)
  }, [dispatch, size, toolName, color, roomId]);

  const drawHandler = (msg: IWebSocketDrawingRes) => {
    const figure = msg.figure;
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        switch (figure.type) {
          case "brush":
            Brush.staticDraw(ctx, figure.x, figure.y, figure.lineWidth, figure.color);
            break;
          case "square":
            Square.staticDraw(ctx, figure.x, figure.y, figure.sideLength!)
            break
          case "clear":
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            break;
        }
      }
    }
  };

  const mouseDownHandler = () => {
    dispatch(pushToUndo(canvasRef.current?.toDataURL()));
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
        ref={canvasRef}
        className={styles.canvas}
        width={1920}
        height={1080}
      />
    </Box>
  );
};
