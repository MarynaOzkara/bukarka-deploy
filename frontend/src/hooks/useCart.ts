import { useCallback } from "react";
import { useAppDispatch } from "appRedux/hooks";
import { useOrderContext } from "components/Order/OrderContext";
import {
  addToCart,
  createCart,
  fetchOrderById,
} from "appRedux/orders/operations";

const useCart = (_id: string) => {
  const dispatch = useAppDispatch();
  const { orderId, setOrderId } = useOrderContext();

  const handleCart = useCallback(async () => {
    let currentOrderId = orderId;

    if (!currentOrderId) {
      const createCartResponse = await dispatch(createCart());
      if (createCartResponse.meta.requestStatus !== "fulfilled") {
        console.log("Помилка при створенні кошика.");
        return;
      }
      currentOrderId = createCartResponse?.payload?.orderId;
      if (!currentOrderId) {
        console.log("orderId не встановлений");
        return;
      }
      setOrderId(currentOrderId);
    }

    const addToCartResponse = await dispatch(
      addToCart({ orderId: currentOrderId, productId: _id })
    );
    if (addToCartResponse.meta.requestStatus === "fulfilled") {
      await dispatch(fetchOrderById(currentOrderId));
    } else {
      console.log("Помилка при додаванні товару до кошика.");
    }
  }, [_id, dispatch, orderId, setOrderId]);

  return {
    handleCart,
  };
};

export default useCart;
