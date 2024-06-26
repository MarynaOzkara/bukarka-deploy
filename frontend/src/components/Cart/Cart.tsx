import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "components/Loader";
import CartList from "./CartList";
import { fetchOrderById, fetchOrdersData } from "../../redux/orders/operations";
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
  status: string;
}

type Props = {
  closeCart: () => void;
};

const Cart: React.FC<Props> = ({ closeCart }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isConfirmationPage = location.pathname.includes("/confirmation/");

  const cartWrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState<number | null>(null);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [cartOrderId, setCartOrderId] = useState<string | null>(null);

  const status = useSelector((state: IRootState) => selectOrdersStatus(state));
  console.log(cartData?._id);

  useEffect(() => {
    const storedOrderId = localStorage.getItem("cartOrderId");
    setCartOrderId(storedOrderId);
    if (storedOrderId) {
      dispatch(fetchOrderById(storedOrderId))
        .then((response: any) => {
          if (response.meta.requestStatus !== "rejected") {
            setCartData(response.payload as CartData);
          } else {
            console.error("Error fetching order data");
          }
        })
        .catch((error) => {
          console.error("Error fetching order data:", error);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    if (cartWrapperRef.current) {
      setWrapperHeight(cartWrapperRef.current.offsetHeight);
    }
  }, [cartData]);

  if (isConfirmationPage) {
    return (
      <EmptyWrapper>
        <Title>Кошик</Title>
        <Message>Ваше замовлення оформлене</Message>
        <Button onClick={closeCart}>
          <Link to="/">Продовжити покупки</Link>
        </Button>
      </EmptyWrapper>
    );
  }

  return (
    <>
      {status === "loading" ? (
        <LoaderWrapper height={wrapperHeight}>
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
        <CartWrapper ref={cartWrapperRef}>
          <Title>Кошик</Title>
          {cartData && <CartList closeCart={closeCart} />}
        </CartWrapper>
      )}
    </>
  );
};

export default Cart;
