import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteItem,
  deleteOrderItem,
  fetchOrdersData,
  updateItemQuantity,
  updateQuantity,
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
        },
      )
      .addCase(fetchOrdersData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(updateItemQuantity.pending, (state) => {
        // Обновляем статус на "loading" в начале запроса
        state.status = "loading";
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        // Найти и обновить элемент с новым количеством
        const index = state.orders?.orderItems.findIndex(
          (item) => item._id === action.payload.id,
        );
        if (index !== -1) {
          Object.assign(state.orders.orderItems[index], action.payload);
          // state.orders.orderItems[index] = action.payload; // Предполагаем, что action.payload содержит обновленные данные элемента
        }
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        // Обработка ошибки
        state.status = "failed";
        state.error = action.payload as string; // Сохраняем сообщение об ошибке
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
