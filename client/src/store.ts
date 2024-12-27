import { configureStore } from '@reduxjs/toolkit'
import { globalApi } from './api/globalApi'
import authReducer from './slices/auth.slice'




export const makeStore = () => {
  return configureStore({
    reducer: {
        [globalApi.reducerPath]: globalApi.reducer,
        auth: authReducer,
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