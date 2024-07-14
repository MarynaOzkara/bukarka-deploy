import { configureStore } from "@reduxjs/toolkit";
import { books } from "./books/slice";
import { orders } from "./orders/slice";

export const store = configureStore({
  reducer: {
    books,
    orders,
  },
});

export type IAppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
