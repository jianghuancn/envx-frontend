// src/store/slices/clientsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientProfile } from '@/types';

interface ClientsState {
  items: ClientProfile[];
  selectedClientId: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientsState = {
  items: [],
  selectedClientId: null,
  loading: false,
  error: null
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSelectedClient: (state, action: PayloadAction<number | null>) => {
      state.selectedClientId = action.payload;
    },
    // Add other reducers as needed
  }
});

export const { setSelectedClient } = clientsSlice.actions;
export default clientsSlice.reducer;

// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from './slices/clientsSlice';

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    // Add other reducers
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;