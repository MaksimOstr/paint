import { createSlice } from "@reduxjs/toolkit";


interface ILobbyUser {
  username: string
  isCreator: boolean
  userLogo: string
}

interface LobbyState {
  roomId: string | null;
  connectedUsers: Array<ILobbyUser>
}

const initialState: LobbyState  = {
  roomId: null,
  connectedUsers: []
};

export const lobbySlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setRoomId(state, action) {
        state.roomId = action.payload
    },
    setLobbyUsers(state, action) {
      state.connectedUsers = action.payload
    }
  },
});

export const { setRoomId, setLobbyUsers } = lobbySlice.actions;
export default lobbySlice.reducer;
