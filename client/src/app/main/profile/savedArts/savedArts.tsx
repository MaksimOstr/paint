"use client";

import {
  useDeleteDrawingMutation,
  useGetDrawingsQuery,
} from "@/services/drawing.service";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import { API_URL } from "../../../../../shared/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const SavedArts = () => {

  const { data, isLoading } = useGetDrawingsQuery();
  const [deleteDrawing] = useDeleteDrawingMutation();
  const { push } = useRouter()

  const selectDrawing = (url: string, title: string) => {
    toast.success(`You selected ${title}`)
    push(`/main/?image=${url}`)
  }

  return (
    <Box height="100%" p={2}>
      {isLoading ? (
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={100} />
        </Box>
      ) : data?.length !== 0 ? (
        <Grid2 width="100%" container spacing={2}>
          {data?.map((drawing, index) => (
            <Grid size={2.4} key={index}>
              <Paper sx={{ p: 2, borderRadius: "15px" }} elevation={6}>
                <Stack spacing={2}>
                  <Typography variant="h4">{drawing.title}</Typography>
                  <Box
                    bgcolor="white"
                    component="img"
                    src={`${API_URL}${drawing.imageData}`}
                  ></Box>
                  <Stack spacing={1} direction="row">
                  <Button
                    color='error'
                    onClick={() => deleteDrawing({ id: drawing.id })}
                    variant="outlined"
                  >
                    Delete
                  </Button>
                  <Button onClick={() => selectDrawing(drawing.imageData, drawing.title)} variant="outlined">Select</Button>
                </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid2>
      ) : (
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4">Here are no any saved drawings!</Typography>
        </Box>
      )}
    </Box>
  );
};
