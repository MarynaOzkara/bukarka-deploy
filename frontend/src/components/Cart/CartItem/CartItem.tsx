import FavoriteButton from "components/FavoriteButton/FavoriteButton";
import { images } from "assets/images/";
import {
  deleteItem,
  fetchOrdersData,
  updateItemQuantity,
} from "../../../redux/orders/operations";
import { useAppDispatch } from "../../../redux/hooks";
import { truncateString } from "utils/truncateString";
import {
  Title,
  Author,
  BookInfo,
  ButtonWrapper,
  ChangeButton,
  DeleteButton,
  Description,
  FavoriteButtonWrapper,
  ImageWrapper,
  ItemPrice,
  Price,
  PriceBlock,
  Quantity,
  StyledCartItem,
  TotalPrice,
} from "./CartItem.styled";

type CartItemProps = {
  item: {
    _id: string;
    quantity: number;
    orderId: string;

    product: {
      _id: string;
      title: string;
      author: string;
      price: number;
      image: string | null;
    };
  };
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  // console.log(item.product);
  const { _id, quantity } = item;
  const { title, author, price, image } = item.product;
  const { imagePlaceholder } = images;
  const bookId = item.product._id;
  // console.log(bookId);
  // console.log(item, title, author, price, quantity);

  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteItem(id)).then(() => {
      dispatch(fetchOrdersData());
      localStorage.removeItem(`isBookAdded_${bookId}`);
    });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(
        updateItemQuantity({
          orderId: item.orderId,
          orderItemId: _id,
          quantity: quantity - 1,
        })
      ).then(() => {
        dispatch(fetchOrdersData());
      });
    }
  };

  const handleIncreaseQuantity = () => {
    dispatch(
      updateItemQuantity({
        orderId: item.orderId,
        orderItemId: _id,
        quantity: quantity + 1,
      })
    ).then(() => {
      dispatch(fetchOrdersData());
    });
  };

  return (
    <StyledCartItem>
      <BookInfo>
        <ImageWrapper id={_id}>
          <img src={image || imagePlaceholder} alt="" />
        </ImageWrapper>
        <Description>
          <Title>{truncateString(title, 36)}</Title>
          <Author>{truncateString(author, 36)}</Author>
          <FavoriteButtonWrapper>
            <FavoriteButton itemId={bookId} />
            <p>До обраного</p>
          </FavoriteButtonWrapper>
        </Description>
      </BookInfo>
      <PriceBlock>
        <ItemPrice>
          <Price>{price} грн</Price>
          <Quantity>
            <ChangeButton onClick={handleDecreaseQuantity}>-</ChangeButton>
            <input type="text" defaultValue={quantity} />
            <ChangeButton onClick={handleIncreaseQuantity}>+</ChangeButton>
          </Quantity>
          <TotalPrice>{price * quantity} грн</TotalPrice>
        </ItemPrice>
        <ButtonWrapper>
          <DeleteButton onClick={() => handleDelete(_id)}>
            Видалити
          </DeleteButton>
        </ButtonWrapper>
      </PriceBlock>
    </StyledCartItem>
  );
};

export default CartItem;
