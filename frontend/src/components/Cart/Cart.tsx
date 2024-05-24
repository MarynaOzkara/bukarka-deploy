import { useEffect } from "react";
import { fetchOrdersData } from "../../redux/orders/operations";
import { useAppDispatch } from "../../redux/hooks";

type Props = {};

const Cart = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const data = dispatch(fetchOrdersData());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return <div>Cart</div>;
};

export default Cart;
