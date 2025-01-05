'use client'

import { Canvas } from "@/components/main/canvas/Canvas";
import { ToolBar } from "@/components/main/toolBar/ToolBar";
import { Box } from "@mui/material";
import React, { createContext, Dispatch, SetStateAction, useState } from "react";


type MyContextType = {
  canvas: HTMLCanvasElement | null;
  setValue: Dispatch<SetStateAction<HTMLCanvasElement | null>>;
};

export const CanvasContext = createContext<MyContextType>({
  canvas: null,
  setValue: () => {},
});

export const Page = () => {

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
      </CanvasContext.Provider>
    </Box>
  );
};

export default Page;
