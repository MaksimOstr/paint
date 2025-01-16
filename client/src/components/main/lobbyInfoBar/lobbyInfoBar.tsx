import React from "react";
import {
  Popover,
  Box,
  Tooltip,
  IconButton,
  Stack,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAppSelector } from "@/hooks/rtkHooks";
import { socket } from "../../../../shared/utils/socket.utils";
import { toast } from "react-toastify";
import { useGetUserProfileQuery } from "@/services/auth.service";
import GroupsIcon from "@mui/icons-material/Groups";


export const LobbyInfoBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { roomId, connectedUsers } = useAppSelector((state) => state.lobby);
  const { data } = useGetUserProfileQuery();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLeave = () => {
    socket.emit("left room", {
      roomId,
      username: data?.username,
      id: data?.id,
    });
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(roomId!)
      .then(() => toast.success("Lobby code successfully copied!"));
  };

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
        <Stack p={2} spacing={2}>
          <Typography variant="h5" textAlign="center">
            Lobby info
          </Typography>
          <Stack spacing={1} direction="row" display="flex" alignItems="center">
            <Typography>Room id:</Typography>
            <Button size="small" variant="outlined" onClick={handleCopy}>
              copy
            </Button>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="h6">Lobby users:</Typography>
            <Stack spacing={2}>
              {connectedUsers.map((user, index) => (
                <Box key={index}>
                  <Stack alignItems="center" spacing={1} direction="row">
                    {user.userLogo ? (
                      <Avatar
                        src={user.userLogo}
                        sx={{ width: "40px", height: "40px" }}
                      />
                    ) : (
                      <Avatar sx={{ width: "40px", height: "40px" }}>
                        {user.username[0]}
                      </Avatar>
                    )}
                    <Stack direction="row" spacing={1}>
                      <Typography>{user.username}</Typography>
                      {user.isCreator ? <GroupsIcon fontSize="small" /> : ""}
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
          <Button color="error" onClick={handleLeave}>
            Leave
          </Button>
        </Stack>
      </Popover>
    </Box>
  );
};
