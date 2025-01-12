import React from "react";
import {
  Popover,
  Box,
  Tooltip,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { setRoomId } from "@/slices/lobby.slice";
import { socket } from "../../../../shared/utils/socket.utils";
import { toast } from "react-toastify";
import { useGetUserProfileQuery } from "@/services/auth.service";

export const LobbyInfoBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const dispatch = useAppDispatch();
  const roomId = useAppSelector((state) => state.lobby.roomId);
  const { data } = useGetUserProfileQuery()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLeave = () => {
    socket.emit('left room', { roomId, username: data?.username })
    localStorage.removeItem("roomId");
    dispatch(setRoomId(null));
    socket.disconnect();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId!)
    .then(() => toast.success('Lobby code successfully copied!'))
  }

  const open = Boolean(anchorEl);
  const id = open ? "lobby-popover" : undefined;

  return (
    <Box position="absolute" right="40px" bottom="40px">
      <Tooltip title="Information about lobby.">
        <IconButton size="large" onClick={handleClick}>
          <InfoOutlinedIcon sx={{ fontSize: "45px", color: "#ff7043" }} />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack>
          <Typography variant="h5" textAlign="center">
            Lobby info
          </Typography>
          <Stack direction='row' display='flex' alignItems='center'>
            <Typography>Room id:</Typography>
            <Button onClick={handleCopy}>copy</Button>
          </Stack>
          <Button onClick={handleLeave}>Leave</Button>
        </Stack>
      </Popover>
    </Box>
  );
};
