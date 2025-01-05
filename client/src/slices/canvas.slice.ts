import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToolState {
  toolName: string;
  color: string;
  size: number;
  undoStack: Array<string>;
  redoStack: Array<string>;
}

const initialState: ToolState = {
  toolName: "brush",
  color: "#000000",
  size: 5,
  undoStack: [],
  redoStack: [],
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setTool(state, action: PayloadAction<string>) {
      state.toolName = action.payload;
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    pushToUndo(state, action) {
      state.undoStack.push(action.payload);
    },
    pushToRedo(state, action) {
      state.redoStack.push(action.payload);
    },
    Undo(state) {
      const lastState = state.undoStack.pop()!;
      state.redoStack.push(lastState);
    },
    Redo(state, action) {
      
    },
  },
});

export const {
  setTool,
  setColor,
  setSize,
  Undo,
  Redo,
  pushToUndo,
  pushToRedo,
} = canvasSlice.actions;
export default canvasSlice.reducer;
