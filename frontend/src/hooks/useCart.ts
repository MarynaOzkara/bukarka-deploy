import { useCallback } from "react";
import { useAppDispatch } from "appRedux/hooks";
import {
  addToCart,
  createCart,
  fetchOrderById,
} from "appRedux/orders/operations";

const useCart = (_id: string) => {
  const dispatch = useAppDispatch();

  const handleCart = useCallback(async () => {
    let orderId = localStorage.getItem("currentOrderId");

    if (!orderId) {
      const createCartResponse = await dispatch(createCart());
      if (createCartResponse.meta.requestStatus !== "fulfilled") {
        console.log("Помилка при створенні кошика.");
        return;
      }
      orderId = createCartResponse?.payload?.orderId;
      if (!orderId) {
        console.log("orderId не встановлений");
        return;
      }
      try {
        localStorage.setItem("currentOrderId", orderId);
      } catch (error) {
        console.error("Error setting currentOrderId in localStorage:", error);
        document.cookie = `currentOrderId=${orderId}; path=/`;
      }
    }

    const addToCartResponse = await dispatch(
      addToCart({ orderId, productId: _id })
    );
    if (addToCartResponse.meta.requestStatus === "fulfilled") {
      await dispatch(fetchOrderById(orderId));
      try {
        localStorage.setItem(`isBookAdded_${_id}`, "true");
      } catch (error) {
        console.error(
          `Error setting isBookAdded_${_id} in localStorage:`,
          error
        );
        document.cookie = `isBookAdded_${_id}=true; path=/`;
      }
    } else {
      console.log("Помилка при додаванні товару до кошика.");
    }
  }, [_id, dispatch]);

  return {
    handleCart,
  };
};

export default useCart;
