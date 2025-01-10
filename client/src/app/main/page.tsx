'use client'

import { Canvas } from "@/components/main/canvas/Canvas";
import { CreateLobbyButton } from "@/components/main/createLobbyButton/createLobbyButton";
import { LobbyInfoBar } from "@/components/main/lobbyInfoBar/lobbyInfoBar";
import { ToolBar } from "@/components/main/toolBar/ToolBar";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { setRoomId } from "@/slices/lobby.slice";
import { Box } from "@mui/material";
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";


type MyContextType = {
  canvas: HTMLCanvasElement | null;
  setValue: Dispatch<SetStateAction<HTMLCanvasElement | null>>;
};

export const CanvasContext = createContext<MyContextType>({
  canvas: null,
  setValue: () => {},
});

export const Page = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const roomId = useAppSelector(state => state.lobby.roomId)

  useEffect(() => {
    if(localStorage.getItem('roomId')) {
      dispatch(setRoomId(localStorage.getItem('roomId')))
    }
    setIsLoading(false)
  }, [dispatch, roomId])

  const [canvas, setValue] = useState<HTMLCanvasElement | null>(null);

  return (
    <Box
      gap="30px"
      pt="20px"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <CanvasContext.Provider value={{ canvas, setValue }}>
        <ToolBar />
        <Canvas />
        {isLoading ? '' : roomId ? <LobbyInfoBar/> : <CreateLobbyButton/>}
      </CanvasContext.Provider>
    </Box>
  );
};

export default Page;
