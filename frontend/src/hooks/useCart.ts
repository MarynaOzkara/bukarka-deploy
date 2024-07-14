import { useCallback } from "react";
import { useAppDispatch } from "appRedux/hooks";
import { addToCart, createCart, fetchOrderById } from "appRedux/orders/operations";

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
      localStorage.setItem("currentOrderId", orderId);
    }

    const addToCartResponse = await dispatch(
      addToCart({ orderId, productId: _id })
    );
    if (addToCartResponse.meta.requestStatus === "fulfilled") {
      await dispatch(fetchOrderById(orderId));
      localStorage.setItem(`isBookAdded_${_id}`, "true");
    } else {
      console.log("Помилка при додаванні товару до кошика.");
    }
  }, [_id, dispatch]);

  return {
    handleCart,
  };
};

export default useCart;
