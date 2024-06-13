import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "utils/fetchInstance";
import { IOrders, UpdatedOrderPayload } from "types/Orders";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId: string, { rejectWithValue }) => {
    console.log(productId);
    try {
      const response = await instance.post(`/api/orders/${productId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchOrderById = createAsyncThunk<IOrders, string>(
  "orders/fetchOrderById",
  async (id: string) => {
    const response = await instance.get(`/api/orders/${id}`);
    return response.data;
  }
);

export const fetchOrdersData = createAsyncThunk(
  "orders/fetchOrdersData",
  async (_, thunkAPI) => {
    const response = await instance.get(`/api/orders`);
    return response.data[0];
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

export const updateOrderInfo = createAsyncThunk(
  "order/updateOrderInfo",
  async (payload:UpdatedOrderPayload, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/orders/checkout/${payload.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload.customerInfo),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);
