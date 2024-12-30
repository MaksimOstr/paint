"use client";

import { Box, IconButton, Paper, Slider, Stack, Tooltip } from "@mui/material";
import React from "react";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { ColorPicker } from "./components/ColorPicker";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { tools } from "./components/tools";
import { setSize, setTool } from "@/slices/canvas.slice";

export const ToolBar = () => {


  const { toolName, size } = useAppSelector((state) => state.canvas);
  const dispatch = useAppDispatch();


  const handleSettingTool = (toolId: string) => {
    dispatch(setTool(toolId));
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
              <Stack width='250px' spacing={2} direction='row' alignItems='center'>
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
              <IconButton size="small">
                <UndoIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Redo">
              <IconButton size="small">
                <RedoIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip sx={{ ml: 1 }} title="Save">
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
