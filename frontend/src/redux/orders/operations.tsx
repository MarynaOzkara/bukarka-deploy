import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../utils/fetchInstance";
import { useEffect } from "react";

export const fetchOrdersData = createAsyncThunk(
  "orders/fetchOrdersData",
  async (_, thunkAPI) => {
    const response = await instance.get(`/api/orders`);
    return response.data[1];
  },
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
    { rejectWithValue },
  ) => {
    try {
      const body = { quantity };
      const response = await instance.patch(
        `/api/orders/${orderItemId}/orderItems/${itemIdToDelete}`,
      );
      return response.data;
    } catch (error) {
      console.error((error as Error).message);
    }
  },
);

//deleteOrderItem - delete all items
export const deleteOrderItem = createAsyncThunk<string | undefined, string>(
  "orders/deleteOrderItem",
  async (orderItemId: string, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`/api/orders/${orderItemId}`);
      return orderItemId;
    } catch (error) {
      console.error((error as Error).message);
    }
  },
);

//deleteItem - delete one book from order

export const deleteItem = createAsyncThunk(
  "orders/deleteItem",
  async (itemIdToDelete: string, { rejectWithValue }) => {
    try {
      const response = await instance.delete(
        `/api/orders/orderItems/${itemIdToDelete}`,
      );
      return itemIdToDelete;
    } catch (error) {
      console.error((error as Error).message);
    }
  },
);

// useEffect(() => {
//     const deleteItem = async () => {
//         if (itemIdToDelete) {
//             try {
//                 await instance.delete(`/api/orders/orderItems/${itemIdToDelete}`);
//                 setDeleteStatus("Item deleted successfully.");
//                 // Optionally reset itemIdToDelete or perform other actions upon successful deletion
//             } catch (error) {
//                 console.error("Failed to delete item:", error);
//                 setDeleteStatus("Failed to delete item.");
//             }
//         }
//     };
//     deleteItem();
// }, [itemIdToDelete]);
