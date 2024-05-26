import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import userSlice from './reducers/userSlice'
import appSlice from './reducers/appSlice'
import { apiService } from './api/api'
import chatSlice from './reducers/chatSlice'
import messagesSlice from './reducers/messagesSlice'

const persistConfig = {
  key: 'app',
  version: 1,
  storage,
  whitelist: ['app'], // Only persists app reducer
}

const rootReducer = combineReducers({
  app: appSlice,
})

const persistedAppReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    persistedAppReducer,
    apiService: apiService.reducer,
    user: userSlice,
    chat: chatSlice,
    messages: messagesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(apiService.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

