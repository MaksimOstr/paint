import { Box, IconButton, Paper, Stack, Tooltip } from "@mui/material";
import React from "react";
import BrushIcon from "@mui/icons-material/Brush";
import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp";
import ChangeHistorySharpIcon from "@mui/icons-material/ChangeHistorySharp";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { DiagonalLineIcon } from "./components/DiagonalLineIcon";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import { ColorPicker } from "./components/ColorPicker";
import { EraserIcon } from "./components/EraserIcon";

export const ToolBar = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Paper elevation={6} sx={{ borderRadius: "100px" }}>
        <Stack direction="row" spacing={22}>
          <Stack spacing={7} display="flex" direction="row" alignItems="center">
            <Stack spacing={3} direction="row" alignItems="center">
              <Stack direction='row' spacing={1}>
                <IconButton>
                  <BrushIcon fontSize="large" />
                </IconButton>
                <IconButton>
                  <EraserIcon />
                </IconButton>
              </Stack>
              <ColorPicker />
            </Stack>
            <Stack direction="row" spacing={1}>
              <IconButton size="small">
                <CheckBoxOutlineBlankSharpIcon fontSize="medium" />
              </IconButton>
              <IconButton size="small">
                <RectangleOutlinedIcon fontSize="medium" />
              </IconButton>
              <IconButton size="small">
                <RadioButtonUncheckedSharpIcon fontSize="medium" />
              </IconButton>
              <IconButton size="small">
                <ChangeHistorySharpIcon fontSize="medium" />
              </IconButton>
              <IconButton size="small">
                <DiagonalLineIcon />
              </IconButton>
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
