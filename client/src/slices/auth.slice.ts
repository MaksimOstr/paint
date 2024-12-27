import { AuthRequest } from "@/types/auth.types";
import { createSlice } from "@reduxjs/toolkit";



  const initialState: AuthRequest = {
    access_token: '',
  };


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

export const {} = authSlice.actions
export default authSlice.reducer