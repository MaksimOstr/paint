"use client";

import React from "react";
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { setColor } from "@/slices/canvas.slice";

export const ColorPicker = () => {

  const {color} = useAppSelector((state) => state.canvas);
  const dispatch = useAppDispatch();


  return (
    <TextField
      sx={{
        "& input[type=color]": {
          padding: "3px",
          width: "60px",
          height: "35px",
        },
      }}
      type="color"
      value={color}
      onChange={(e) => dispatch(setColor(e.target.value))}
    />
  );
};
