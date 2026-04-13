import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk('orders/fetchAllOrders', async () => {
  const data = await getFeedsApi();
  return data;
});

type OrdersState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  errorMessage: string | null;
};

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  errorMessage: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message || 'Ошибка';
      });
  }
});
