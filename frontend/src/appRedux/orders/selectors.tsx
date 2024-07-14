import { IRootState } from "../store";

export const selectOrdersData = (state: IRootState) => state.orders.orders;
export const selectOrdersStatus = (state: IRootState) => state.orders.status;
export const selectOrdersError = (state: IRootState) => state.orders.error;
