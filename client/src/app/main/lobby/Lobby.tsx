"use client";

import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useCreateRoomMutation } from "@/services/lobby.service";
import { useAppDispatch } from "@/hooks/rtkHooks";
import { setRoomId } from "@/slices/lobby.slice";
import { Join } from "./pages/join/join";



export const Lobby = () => {
  const [page, setPage] = useState("");
  const { push } = useRouter();
  const url = usePathname();
  const dispatch = useAppDispatch()

  const [ createRoom ] = useCreateRoomMutation()


  const handleCreateRoom = () => {
    createRoom()
    .unwrap()
    .then((res) => {
      dispatch(setRoomId(res.roomId))
      push('/main')
    })
  }

  return (
    <>
      <Modal
        open={url === "/main/lobby" ? true : false}
        onClose={() => push("/main")}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          {page === "join" ? (
            <Join setPage={setPage} />
          ) : (
            <Paper sx={{ p: "10px" }}>
              <Typography mb={2} variant="h4" align="center">
                Lobby
              </Typography>
              <Stack spacing={1} p={1}>
                <Button
                  onClick={() => setPage("join")}
                  variant="outlined"
                  size="large"
                >
                  <Typography variant="h6">Join</Typography>
                </Button>
                <Divider>or</Divider>
                <Button
                  onClick={() => handleCreateRoom()}
                  variant="outlined"
                  size="large"
                >
                  <Typography variant="h6">Create</Typography>
                </Button>
                <Button
                  onClick={() => push("/main")}
                  color="error"
                  variant="outlined"
                >
                  Back
                </Button>
              </Stack>
            </Paper>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Lobby;
