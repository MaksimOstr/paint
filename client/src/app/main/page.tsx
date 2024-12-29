import { Canvas } from "@/components/main/canvas/Canvas";
import { ToolBar } from "@/components/main/toolBar/ToolBar";
import { Box } from "@mui/material";
import React from "react";

export const Page = () => {
  return (
    <Box
      gap={3}
      pt="20px"
      width="100%"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <ToolBar />
      <Canvas />
    </Box>
  );
};

export default Page;
