import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "components/Loader";
import CartList from "./CartList";
import { fetchOrdersData } from "../../redux/orders/operations";
import { useAppDispatch } from "../../redux/hooks";
import { IRootState } from "../../redux/store";
import {
  selectOrdersData,
  selectOrdersStatus,
} from "../../redux/orders/selectors";
import {
  Button,
  CartWrapper,
  EmptyWrapper,
  LoaderWrapper,
  Message,
  Title,
} from "./Cart.styled";

export interface CartData {
  _id: string;
  orderItems: { _id: string; name: string; price: number; quantity: number }[];
  totalPrice: number;
}

type Props = {
  closeCart: () => void;
};

const Cart: React.FC<Props> = ({ closeCart }) => {
  const dispatch = useAppDispatch();

  const cartData = useSelector(
    (state: IRootState) => selectOrdersData(state) as CartData | null
  );
  const status = useSelector((state: IRootState) => selectOrdersStatus(state));

  useEffect(() => {
    dispatch(fetchOrdersData());
  }, [dispatch]);

  return (
    <>
      {status === "loading" ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : !cartData ||
        (cartData &&
          cartData.orderItems &&
          cartData.orderItems.length === 0) ? (
        <EmptyWrapper>
          <Title>Кошик</Title>
          <Message>В вашому кошику ще немає товарів</Message>
          <Button onClick={closeCart}>
            <Link to="/">Продовжити покупки</Link>
          </Button>
        </EmptyWrapper>
      ) : (
        <CartWrapper>
          <Title>Кошик</Title>
          {cartData && <CartList cartData={cartData} closeCart={closeCart} />}
        </CartWrapper>
      )}
    </>
  );
};

export default Cart;
