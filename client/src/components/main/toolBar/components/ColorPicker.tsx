"use client";

import React from "react";
import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/rtkHooks";
import { setColor } from "@/lib/slices/tool.slice";

export const ColorPicker = () => {
  const { color } = useAppSelector((state) => state.tool);
  const dispatch = useAppDispatch();
  
  const handleColorChange = debounce((value) => {
    dispatch(setColor(value));
  }, 100);

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
      onChange={(e) => handleColorChange(e.target.value)}
    />
  );
};
