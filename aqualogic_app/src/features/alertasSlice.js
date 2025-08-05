import { createSlice } from '@reduxjs/toolkit';

export const alertasSlice = createSlice({
  name: 'alertas',
  initialState: [],
  reducers: {
    addAlerta: (state, action) => {
      state.unshift(action.payload); // Añade al inicio del array
    },
    loadAlertas: (state, action) => {
      return action.payload; // Sobrescribe todo el estado
    },
  },
});

export const { addAlerta, loadAlertas } = alertasSlice.actions;
export default alertasSlice.reducer;