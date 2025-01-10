import {
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/rtkHooks";
import { setRoomId } from "@/slices/lobby.slice";

export const Join = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("");
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  const handleJoin = () => {
    dispatch(setRoomId(value))
    setValue('')
    setPage('')
    push('/main')
  }

  return (
    <Paper elevation={6}>
      <Tooltip title="back">
        <IconButton
          sx={{ m: 0.5, position: "absolute" }}
          onClick={() => setPage("")}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Tooltip>
      <Typography m="20px 0" textAlign="center" variant="h4">
        Join
      </Typography>
      <Stack p={1} spacing={1}>
        <TextField
          onChange={(e) => setValue(e.target.value)}
          fullWidth
          variant="outlined"
          label="Enter room code"
        ></TextField>
        <Button onClick={() => handleJoin()} size="large" variant="outlined" fullWidth>
          Join
        </Button>
      </Stack>
    </Paper>
  );
};
