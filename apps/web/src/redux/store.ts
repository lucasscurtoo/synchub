import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import userSlice from './reducers/userSlice'
import appSlice from './reducers/appSlice'
import { apiService } from './api/api'

const persistConfig = {
  key: 'app',
  version: 1,
  storage,
  whitelist: ['app'], // Only persists app reducer
}

const rootReducer = combineReducers({
  user: userSlice,
  app: appSlice,
  apiService: apiService.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
