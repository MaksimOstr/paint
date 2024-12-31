import { RouterBar } from "@/components/profileLayout/RouterBar";
import { Box } from "@mui/material";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
      pt='20px'
    >
      <RouterBar />
      {children}
    </Box>
  );
}
