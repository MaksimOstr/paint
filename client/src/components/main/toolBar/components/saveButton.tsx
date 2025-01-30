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
import { useSaveDrawingMutation } from "@/lib/services/drawing.service";
import { toast } from "react-toastify";


export const SaveButton = ({ canvas }: { canvas: HTMLCanvasElement }) => {
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [saveDrawing] = useSaveDrawingMutation();

  const save = () => {
    canvas.toBlob((blob) => {
      const formData = new FormData();
      if(blob) {
        formData.append('file', blob, 'canvas.png');
        formData.append('title', title)
      }

      saveDrawing(formData)
        .unwrap()
        .then(() => {
            setTitle('')
            setShowInput(false)
            toast.success("You successfully saved the drawing!")
        })
        .catch((err) => {
          console.error(err);
        });
    }, "image/png");
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
