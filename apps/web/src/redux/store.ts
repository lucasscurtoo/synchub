import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice'
import appSlice from './reducers/appSlice'
import { apiService } from './api/api'

export const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
