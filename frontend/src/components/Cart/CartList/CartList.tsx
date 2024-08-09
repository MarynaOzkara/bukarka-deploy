import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../CartItem";
import { deleteOrder, fetchOrderById } from "appRedux/orders/operations";
import { useAppDispatch } from "appRedux/hooks";
import { useOrderContext } from "components/Order/OrderContext";
import { selectOrdersData } from "appRedux/orders/selectors";
import {
  AmountOfBooks,
  ButtonWrapper,
  CartHeader,
  CheckoutButton,
  ContinueButton,
  DeleteButton,
  ListWrapper,
  PriceBlock,
  PriceText,
  TotalPrice,
  Wrapper,
} from "./CartList.styled";
import { Button, Message } from "../Cart.styled";

type CartListProps = {
  closeCart: () => void;
};

const CartList: React.FC<CartListProps> = ({ closeCart }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartData = useSelector(selectOrdersData);
  const { orderId, setOrderId } = useOrderContext();

  const ordersId = cartData?._id;

  const clearLocalStorage = () => {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes("isBookAdded_")) {
        keysToRemove.push(key);
      }
    }
  };

  const handleDelete = async () => {
    clearLocalStorage();

    await dispatch(deleteOrder(ordersId!)).then(() => {
      dispatch(fetchOrderById(ordersId!)).then(() => {
        setOrderId(null);
        closeCart();
      });
    });
  };

  const totalBooks = cartData?.orderItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCheckout = () => {
    closeCart();
    navigate(`/order/${ordersId}`);
  };

  const handleContinue = () => {
    closeCart();
    navigate(`/`);
  };

  if (!cartData) {
    return (
      <div style={{ textAlign: "center" }}>
        <Message>В вашому кошику ще немає товарів</Message>
        <Button onClick={closeCart}>
          <Link to="/">Продовжити покупки</Link>
        </Button>
      </div>
    );
  }

  return (
    <Wrapper>
      <CartHeader>
        <AmountOfBooks>{totalBooks} шт.</AmountOfBooks>
        <DeleteButton onClick={handleDelete}>Видалити все</DeleteButton>
      </CartHeader>

      <ListWrapper>
        {cartData &&
          cartData.orderItems.map((item: any) => (
            <CartItem item={item} key={item._id} />
          ))}
      </ListWrapper>

      <PriceBlock>
        <PriceText>Всього</PriceText>
        <TotalPrice>{cartData?.totalPrice} грн</TotalPrice>
      </PriceBlock>

      <ButtonWrapper>
        <ContinueButton onClick={handleContinue}>
          Продовжити покупки
        </ContinueButton>
        <CheckoutButton onClick={handleCheckout}>
          Перейти до оформлення
        </CheckoutButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default CartList;
