import { configureStore } from '@reduxjs/toolkit'
import { globalApi } from './api/globalApi'
import authReducer from './slices/auth.slice'
import toolReducer from './slices/tool.slice'
import canvasReducer from './slices/canvas.slice'




export const makeStore = () => {
  return configureStore({
    reducer: {
        [globalApi.reducerPath]: globalApi.reducer,
        auth: authReducer,
        tool: toolReducer,
        canvas: canvasReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(globalApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']