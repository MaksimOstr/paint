"use client";

import { Box, IconButton, Paper, Slider, Stack, Tooltip } from "@mui/material";
import React, { useContext } from "react";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { ColorPicker } from "./components/ColorPicker";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { tools } from "./components/tools";
import { setSize, setTool } from "@/slices/tool.slice";
import { CanvasContext } from "@/app/main/page";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { SaveButton } from "./components/saveButton";
import { pushToUndo, Redo, Undo } from "@/slices/canvas.slice";

export const ToolBar = () => {
  const { toolName, size } = useAppSelector((state) => state.tool);
  const { redoStack, undoStack } = useAppSelector((state) => state.canvas)
  const dispatch = useAppDispatch();
  const { canvas } = useContext(CanvasContext);
 
  const clearCanvas = () => {
    if (canvas) {
      dispatch(pushToUndo(canvas.toDataURL()));
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    localStorage.removeItem('canvasUrl')
  };

  const handleSettingTool = (toolId: string) => {
    dispatch(setTool(toolId));
  };

  const undo = () => {
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      if (undoStack.length > 0) {
        console.log(undoStack + 'testeste')
        const lastState = undoStack[undoStack.length - 1];
        dispatch(Undo(canvas.toDataURL()));
        const img = new Image();
        img.src = lastState;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        localStorage.setItem('canvasUrl', lastState)
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
        localStorage.setItem('canvasUrl', lastState)
      }
    }
  };

  const getButtonStyle = (toolId: string) => ({
    color: toolName === toolId ? "#ff7043" : "",
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
                  valueLabelDisplay="auto"
                  defaultValue={5}
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
            <SaveButton canvas={canvas!}/>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
