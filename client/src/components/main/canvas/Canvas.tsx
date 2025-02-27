"use client";

import React, { useContext, useEffect, useRef } from "react";
import styles from "./canvas.module.scss";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/rtkHooks";
import { CanvasContext } from "@/app/main/page";
import {
  loadCanvas,
  saveCanvas,
  selectToolParam,
} from "./functions/canvasFunctions";
import { pushToUndo } from "@/lib/slices/canvas.slice";
import { toast } from "react-toastify";
import { setLobbyUsers, setRoomId } from "@/lib/slices/lobby.slice";
import { useGetUserProfileQuery } from "@/lib/services/auth.service";

import {
  useLazyGetLobbyCanvasQuery,
  useSaveLobbyCanvasMutation,
} from "@/lib/services/lobby.service";
import { drawOnlineHandler } from "./functions/onlineCanvasFunction";
import { socket } from "@/lib/shared/utils/socket.utils";

export const Canvas = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { toolName, size, color } = useAppSelector((state) => state.tool);
  const { setValue } = useContext(CanvasContext);
  const roomId = useAppSelector((state) => state.lobby.roomId);
  const { data } = useGetUserProfileQuery();
  const [canvasToServer] = useSaveLobbyCanvasMutation();
  const [getLobbyCanvas] = useLazyGetLobbyCanvasQuery();

  const saveCanvasToServer = () => {
    if (roomId) {
      canvasRef.current!.toBlob(async (blob) => {
        const formData = new FormData();
        if (blob) {
          formData.append("canvas", blob, `${roomId}.png`);
        }
        await canvasToServer({ formData, roomId });
      }, "image/png");
    }
  };

  //Saving and loading canvasState
  useEffect(() => {
    setValue(canvasRef.current)
    loadCanvas(canvasRef, localStorage.getItem("canvasUrl")!);
  }, [setValue]);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d");
    if (roomId && data?.username) {
      socket.connect();
      socket.emit("join room", {
        roomId,
        userLogo: data.profileLogo,
        username: data.username,
        id: data.id,
      });
      
      socket.on("joinSuccess", async (res) => {
        localStorage.removeItem('canvasUrl')
        toast.success(res.message);
        await getLobbyCanvas(roomId)
          .unwrap()
          .then((res) => {
            if(res) {
              loadCanvas(canvasRef, res.filePath)
            } else {
              if(ctx) {
                ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
              }
            }
          });
      });

      socket.on("userJoining", (res) => {
        toast.info(`${res.username} had joined to the room!`);
      });

      socket.on("userLeaving", (res) => {
        toast.info(`${res.username} left the room.`);
      });

      socket.on("disconnect", () => {
        toast.success("You disconnected from the room!");
        localStorage.removeItem("roomId");
        dispatch(setRoomId(null));
      });

      socket.on("roomClosing", (res) => {
        toast.info(res.message);
      });

      socket.on("joinError", (res) => {
        localStorage.removeItem("roomId");
        dispatch(setRoomId(null));
        toast.error(res.message);
        socket.disconnect();
      });

      socket.on("updateUserList", (res) => {
        dispatch(setLobbyUsers(res));
      });

      socket.on("drawing", (res) => {
        drawOnlineHandler(res, canvasRef, roomId);
      });

      socket.on("finishDraw", () => {
        if (ctx) {
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.strokeStyle = color;
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch, getLobbyCanvas, roomId]);

  //Setting tool for painting
  useEffect(() => {
    selectToolParam(canvasRef, toolName, size, color, roomId);
  }, [dispatch, size, toolName, color, roomId]);

  const mouseDownHandler = () => {
    dispatch(pushToUndo(canvasRef.current?.toDataURL()));
  };

  const mouseUpHandler = () => {
    saveCanvasToServer()
    if(!roomId) {
      saveCanvas(canvasRef)
    }
  }

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
        onMouseUp={() => mouseUpHandler()}
        ref={canvasRef}
        className={styles.canvas}
        width={1920}
        height={1080}
      />
    </Box>
  );
};
