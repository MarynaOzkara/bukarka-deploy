import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "components/Loader";
import { fetchOrdersData } from "../../redux/orders/operations";
import { useAppDispatch } from "../../redux/hooks";
import {
  selectOrdersData,
  selectOrdersStatus,
} from "../../redux/orders/selectors";
import { IRootState } from "../../redux/store";
import {
  Button,
  CartWrapper,
  EmptyWrapper,
  LoaderWrapper,
  Message,
  Title,
} from "./Cart.styled";
import CartList from "./CartList";

type Props = {
  closeCart: () => void;
};

const Cart: React.FC<Props> = ({ closeCart }) => {
  const dispatch = useAppDispatch();

  const cartData = useSelector((state: IRootState) => selectOrdersData(state));
  const status = useSelector((state: IRootState) => selectOrdersStatus(state));

  useEffect(() => {
    dispatch(fetchOrdersData());
  }, [dispatch]);

  console.log(status);

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
          <Button onClick={closeCart}>Продовжити покупки</Button>
        </EmptyWrapper>
      ) : (
        <CartWrapper>
          <Title>Кошик</Title>
          {cartData && <CartList cartData={cartData} />}
        </CartWrapper>
      )}
    </>
  );
};

export default Cart;
