import React from "react";
import styles from "./canvas.module.scss";
import { Box } from "@mui/material";

export const Canvas = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      mb='30px'
    >
      <canvas className={styles.canvas} />
    </Box>
  );
};
