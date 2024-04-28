import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteItem, deleteOrderItem, fetchOrdersData } from "./operations";
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
        },
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
              (item) => item._id !== action.payload,
            );
          }
        },
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
              (item) => item._id !== action.payload,
            );
          }
        },
      )
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const orders = ordersSlice.reducer;
