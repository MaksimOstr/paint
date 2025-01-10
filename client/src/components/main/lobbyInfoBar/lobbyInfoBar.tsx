import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import InfoIcon from '@mui/icons-material/Info';
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { setRoomId } from "@/slices/lobby.slice";
import { useDeleteRoomMutation } from "@/services/room.service";
import { socket } from "../../../../shared/utils/socket.utils";
import { toast } from "react-toastify";


export const LobbyInfoBar = () => {
  const dispatch = useAppDispatch();
  const [deleteRoom] = useDeleteRoomMutation();
  const roomId = useAppSelector(state => state.lobby.roomId!)

  const handleLeaveLobby = () => {
    deleteRoom({ roomId });
    localStorage.removeItem("roomId");
    dispatch(setRoomId(null));
    socket.disconnect()
    toast.success('You disconnected from server!')
  };

  return (
    <Tooltip title="Leave from lobby">
      <IconButton
        onClick={() => handleLeaveLobby()}
        color="secondary"
        size="large"
        sx={{ position: "absolute", right: "30px", bottom: "30px" }}
      >
        <InfoIcon sx={{ fontSize: "40px" }} />
      </IconButton>
    </Tooltip>
  );
};
