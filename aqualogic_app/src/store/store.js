import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alertasReducer from '../features/alertasSlice';

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['alertas'] // Solo persiste estos datos
};

const persistedReducer = persistReducer(persistConfig, alertasReducer);

// Creación del store
export const store = configureStore({
  reducer: {
    alertas: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Necesario para Redux Persist
    }),
});

export const persistor = persistStore(store);