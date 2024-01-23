import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice'
import { userApi } from './api/userApi'
import appSlice from './reducers/appSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    app: appSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
