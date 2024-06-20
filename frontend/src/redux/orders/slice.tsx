import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItem,
  deleteOrder,
  fetchOrderById,
  fetchOrdersData,
  updateItemQuantity,
  updateOrderInfo,
} from "./operations";
import { IOrders } from "types/Orders";

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
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
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

      .addCase(fetchOrderById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<string | undefined, string>) => {
          if (state.orders) {
            state.orders.orderItems = state.orders.orderItems.filter(
              (item) => item._id !== action.payload
            );
          }
        }
      )
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

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
      })
      
      .addCase(updateOrderInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(updateOrderInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      
      
      ;
  },
});

export const orders = ordersSlice.reducer;
