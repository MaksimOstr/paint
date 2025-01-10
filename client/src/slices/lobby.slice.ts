import { createSlice } from "@reduxjs/toolkit";

interface LobbyState {
  roomId: string | null;
  connectedUsers: Array<string>
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
    }
  },
});

export const { setRoomId } = lobbySlice.actions;
export default lobbySlice.reducer;
