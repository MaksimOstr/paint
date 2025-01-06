"use client";

import { Box, IconButton, Paper, Slider, Stack, Tooltip } from "@mui/material";
import React, { useContext } from "react";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { ColorPicker } from "./components/ColorPicker";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { tools } from "./components/tools";
import { Redo, Undo, setSize, setTool } from "@/slices/canvas.slice";
import { CanvasContext } from "@/app/main/page";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export const ToolBar = () => {
  const { toolName, size, undoStack, redoStack } = useAppSelector((state) => state.canvas);
  const dispatch = useAppDispatch();
  const { canvas } = useContext(CanvasContext);

  const clearCanvas = () => {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSettingTool = (toolId: string) => {
    dispatch(setTool(toolId));
  };

  const undo = () => {
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      if (undoStack.length > 0) {
        console.log('undo')
        console.log(...undoStack)
        const lastState = undoStack[undoStack.length - 1];
        dispatch(Undo(canvas.toDataURL()));
        const img = new Image();
        img.src = lastState;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  };

  const redo = () => {
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      if (redoStack.length > 0) {
        const lastState = redoStack[redoStack.length - 1];
        dispatch(Redo(canvas.toDataURL()));
        const img = new Image();
        img.src = lastState;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  };

  const getButtonStyle = (toolId: string) => ({
    color: toolName === toolId ? "red" : "",
  });

  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={6} sx={{ borderRadius: "100px" }}>
        <Stack direction="row" spacing={22}>
          <Stack spacing={7} display="flex" direction="row" alignItems="center">
            <Stack spacing={5} direction="row" alignItems="center">
              <Stack direction="row" spacing={1}>
                {tools.slice(0, 2).map((tool, key) => (
                  <Tooltip key={key} title={tool.tooltip}>
                    <IconButton
                      onClick={() => handleSettingTool(tool.id)}
                      size="large"
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={getButtonStyle(tool.id)}
                      >
                        {tool.icon}
                      </Box>
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
              <Stack
                width="250px"
                spacing={2}
                direction="row"
                alignItems="center"
              >
                <ColorPicker />
                <Slider
                  value={size}
                  min={1}
                  max={50}
                  step={1}
                  onChange={(e, value) => dispatch(setSize(value))}
                  aria-labelledby="brush-size-slider"
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
              {tools.slice(2, tools.length).map((tool, key) => (
                <Tooltip key={key} title={tool.tooltip}>
                  <IconButton
                    onClick={() => handleSettingTool(tool.id)}
                    size="medium"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={getButtonStyle(tool.id)}
                    >
                      {tool.icon}
                    </Box>
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Stack>

          <Stack
            direction="row"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Tooltip title="Undo">
              <IconButton onClick={() => undo()} size="small">
                <UndoIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip onClick={() => redo()} title="Redo">
              <IconButton size="small">
                <RedoIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip sx={{ ml: 1 }} title="Clear canvas">
              <IconButton onClick={() => clearCanvas()}>
                <DeleteOutlineOutlinedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton>
                <SaveOutlinedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
