"use client";

import {
  Button,
  ClickAwayListener,
  Fade,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useSaveDrawingMutation } from "@/services/drawing.service";
import { toast } from "react-toastify";

export const SaveButton = ({ canvas }: { canvas: HTMLCanvasElement }) => {
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [saveDrawing] = useSaveDrawingMutation();

  const save = () => {
    saveDrawing({
      title,
      imageData: canvas!.toDataURL(),
    })
      .unwrap()
      .then((res) => {
        toast.success(`You successfully saved a drawing with the title ${title}`)
        setShowInput(false);
        setTitle('')
        console.log(res)
      });
  };

  return (
    <>
      <Tooltip title="Save">
        <IconButton onClick={() => setShowInput(true)}>
          <SaveOutlinedIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      {showInput ? (
        <ClickAwayListener onClickAway={() => setShowInput(false)}>
          <Fade in timeout={300}>
            <Paper
              elevation={6}
              sx={{ position: "absolute", top: "85px", width: "200px" }}
            >
              <Stack direction="row">
                <TextField
                  onChange={(e) => setTitle(e.target.value)}
                  size="small"
                  variant="outlined"
                  label="title"
                ></TextField>
                <Button onClick={() => save()} size="small" variant="outlined">
                  Save
                </Button>
              </Stack>
            </Paper>
          </Fade>
        </ClickAwayListener>
      ) : (
        ""
      )}
    </>
  );
};
