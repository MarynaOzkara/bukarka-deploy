import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../CartItem";
import {
  deleteOrderItem,
  fetchOrdersData,
} from "../../../redux/orders/operations";
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
  const cartData = useSelector(selectOrdersData);

  const ordersId = cartData?._id;

  const handleDelete = () => {
    dispatch(deleteOrderItem(ordersId!)).then(() => {
      dispatch(fetchOrdersData());
    });
  };

  const totalBooks = cartData?.orderItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
        <ContinueButton onClick={closeCart}>
          <Link to="/">Продовжити покупки</Link>
        </ContinueButton>
        <CheckoutButton onClick={closeCart}>
          <Link to={`/order/${ordersId}`}>Перейти до оформлення</Link>
        </CheckoutButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default CartList;
