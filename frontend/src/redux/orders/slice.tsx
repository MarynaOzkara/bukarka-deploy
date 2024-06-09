import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteItem,
  deleteOrderItem,
  fetchOrdersData,
  updateItemQuantity,
} from "./operations";
import { IOrders } from "../../types/Orders";

interface OrdersState {
  orders: IOrders | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrdersState = {
  orders: null,
  status: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchOrdersData.fulfilled,
        (state, action: PayloadAction<IOrders>) => {
          state.status = "succeeded";
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrdersData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(deleteOrderItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteOrderItem.fulfilled,
        (state, action: PayloadAction<string | undefined, string>) => {
          if (state.orders) {
            state.orders.orderItems = state.orders.orderItems.filter(
              (item) => item._id !== action.payload
            );
          }
        }
      )
      .addCase(deleteOrderItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      //deleteItem
      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteItem.fulfilled,
        (state, action: PayloadAction<string | undefined, string>) => {
          if (state.orders) {
            state.orders.orderItems = state.orders.orderItems.filter(
              (item) => item._id !== action.payload
            );
          }
        }
      )
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateItemQuantity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateItemQuantity.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (state.orders) {
            const index = state.orders.orderItems.findIndex(
              (item) => item._id === action.payload._id
            );
            if (index !== -1) {
              state.orders.orderItems[index] = action.payload;
            }
          }
          state.status = "succeeded";
        }
      )
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const orders = ordersSlice.reducer;
