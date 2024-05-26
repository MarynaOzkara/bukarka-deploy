// type CartItem = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

import CartItem from "../CartItem";
import {
  deleteOrderItem,
  fetchOrdersData,
} from "../../../redux/orders/operations";
import { useAppDispatch } from "../../../redux/hooks";
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
import { CartData } from "../Cart";

type CartListProps = {
  cartData: CartData;
  closeCart: () => void;
};

const CartList: React.FC<CartListProps> = ({ cartData, closeCart }) => {
  const dispatch = useAppDispatch();

  console.log(cartData.orderItems);

  const ordersId = cartData?._id;

  const handleDelete = () => {
    dispatch(deleteOrderItem(ordersId!)).then(() => {
      dispatch(fetchOrdersData());
    });
  };

  return (
    <Wrapper>
      <CartHeader>
        <AmountOfBooks>{cartData?.orderItems.length} шт.</AmountOfBooks>
        <DeleteButton onClick={handleDelete}>Видалити все</DeleteButton>
      </CartHeader>

      <ListWrapper>
        {cartData.orderItems.map((item: any) => (
          <CartItem item={item} />
        ))}
      </ListWrapper>

      <PriceBlock>
        <PriceText>Всього</PriceText>
        <TotalPrice>{cartData?.totalPrice} грн</TotalPrice>
      </PriceBlock>

      <ButtonWrapper>
        <ContinueButton onClick={closeCart}>Продовжити покупки</ContinueButton>
        <CheckoutButton>Перейти до оформлення</CheckoutButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default CartList;
