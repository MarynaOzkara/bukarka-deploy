import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../CartItem";
import { deleteOrder, fetchOrdersData } from "../../../redux/orders/operations";
import { useAppDispatch } from "../../../redux/hooks";
import { selectOrdersData } from "../../../redux/orders/selectors";
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

type CartListProps = {
  closeCart: () => void;
};

const CartList: React.FC<CartListProps> = ({ closeCart }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartData = useSelector(selectOrdersData);

  const ordersId = cartData?._id;
  console.log(cartData);
  
  const clearLocalStorage = () => {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes("isBookAdded_")) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  };

  const handleDelete = () => {
    clearLocalStorage();

    dispatch(deleteOrder(ordersId!)).then(() => {
      dispatch(fetchOrdersData());
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
