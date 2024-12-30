import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToolState {
  toolName: string;
  color: string;
  size: number;
}

const initialState: ToolState = {
  toolName: "brush",
  color: "#000000",
  size: 5,
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setTool(state, action: PayloadAction<string>) {
      state.toolName = action.payload
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
  },
});

export const { setTool, setColor, setSize } = canvasSlice.actions;
export default canvasSlice.reducer;
