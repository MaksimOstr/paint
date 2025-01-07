import { createSlice } from "@reduxjs/toolkit";

interface ToolState {
    undoStack: Array<string>;
    redoStack: Array<string>;
  }
  
  const initialState: ToolState = {
    undoStack: [],
    redoStack: [],
  };

export const canvasSlice = createSlice({
    name: "canvas",
    initialState,
    reducers: {
      pushToUndo(state, action) {
        state.undoStack.push(action.payload);
      },
      pushToRedo(state, action) {
        state.redoStack.push(action.payload);
      },
      setUndoEmpty(state) {
        state.undoStack = []
      },
      setRedoEmpty(state) {
        state.redoStack = []
      },
      Undo(state, action) {
        state.undoStack.pop();
        state.redoStack.push(action.payload);
      },
      Redo(state, action) {
        state.redoStack.pop();
        state.undoStack.push(action.payload);
      },
    },
})


export const {
  Undo,
  Redo,
  pushToUndo,
  pushToRedo,
  setRedoEmpty,
  setUndoEmpty
} = canvasSlice.actions;

export default canvasSlice.reducer;