import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi, TNewOrder } from '@api';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TNewOrder | null;
  orderInfo: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  orderInfo: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const res = await orderBurgerApi(ingredients);
      return res.order;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const res = await getOrderByNumberApi(number);
      return res.orders[0];
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // CreateOrder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // GetOrderByNumber
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderInfo = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});
