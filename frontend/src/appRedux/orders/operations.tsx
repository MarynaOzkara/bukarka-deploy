import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "utils/fetchInstance";
import { IOrders, UpdatedOrderPayload } from "types/Orders";

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { orderId, productId }: { orderId: string; productId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.post(
        `/api/orders/${orderId}/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchOrderById = createAsyncThunk<IOrders, string>(
  "orders/fetchOrderById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/api/orders/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchOrdersData = createAsyncThunk(
  "orders/fetchOrdersData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/api/orders`);
      return response.data[0];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  "orders/updateItemQuantity",
  async (
    {
      orderId,
      orderItemId,
      quantity,
    }: { orderId: string; orderItemId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.patch(
        `/api/orders/${orderId}/orderItems/${orderItemId}`,
        { quantity }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk<string | undefined, string>(
  "orders/deleteOrder",
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

export const updateOrderInfo = createAsyncThunk(
  "order/updateOrderInfo",
  async (payload: UpdatedOrderPayload, thunkAPI) => {
    try {
      const response = await instance.patch(
        `api/orders/checkout/${payload.id}`,
        payload.customerInfo
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);
