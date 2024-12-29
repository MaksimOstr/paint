"use client";

import React, { useState } from "react";
import { TextField } from "@mui/material";

export const ColorPicker = () => {
  const [color, setColor] = useState("#000000");

  const handleColorChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setColor(event.target.value);
  };

  return (
    <TextField
      sx={{
        "& input[type=color]": {
          padding: '3px',
          width: '30px',
          height: '27px',
        },
      }}
      type="color"
      value={color}
      onChange={handleColorChange}
    />
  );
};
