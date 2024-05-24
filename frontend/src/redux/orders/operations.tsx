import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/fetchInstance";

export const fetchOrdersData = createAsyncThunk(
  "orders/fetchOrdersData",
  async (_, thunkAPI) => {
    const response = await instance.get(`/api/orders`);
    console.log(response.data[0]);
    return response.data[0];
  }
);

//quantity
export const updateItemQuantity = createAsyncThunk(
  "orders/updateItemQuantity",
  async (
    {
      orderItemId,
      itemIdToDelete,
      quantity,
    }: { orderItemId: string; itemIdToDelete: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const body = { quantity };
      const response = await instance.patch(
        `/api/orders/${orderItemId}/orderItems/${itemIdToDelete}`
      );
      return response.data;
    } catch (error) {
      console.error((error as Error).message);
    }
  }
);

export const deleteOrderItem = createAsyncThunk<string | undefined, string>(
  "orders/deleteOrderItem",
  async (orderItemId: string, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`/api/orders/${orderItemId}`);
      return orderItemId;
    } catch (error) {
      console.error((error as Error).message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "orders/deleteItem",
  async (itemIdToDelete: string, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/api/orders/orderItems/${itemIdToDelete}`
      );
      return itemIdToDelete;
    } catch (error) {
      console.error((error as Error).message);
    }
  }
);
