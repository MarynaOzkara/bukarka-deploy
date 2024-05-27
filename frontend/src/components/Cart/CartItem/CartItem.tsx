import FavoriteButton from "components/FavoriteButton/FavoriteButton";
import { images } from "../../../assets/images/";
import {
  deleteItem,
  fetchOrdersData,
  updateItemQuantity,
} from "../../../redux/orders/operations";
import { useAppDispatch } from "../../../redux/hooks";
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

  // console.log(item, title, author, price, quantity);

  const dispatch = useAppDispatch();

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";

    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleDelete = (id: string) => {
    dispatch(deleteItem(id)).then(() => {
      dispatch(fetchOrdersData());
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
          <Title>{truncateText(title, 40)}</Title>
          <Author>{truncateText(author, 40)}</Author>
          <FavoriteButtonWrapper>
            <FavoriteButton itemId={_id} />
            <p>До обраного</p>
          </FavoriteButtonWrapper>
        </Description>
      </BookInfo>
      <PriceBlock>
        <ItemPrice>
          <Price>{price} грн</Price>
          <Quantity>
            <ChangeButton onClick={handleDecreaseQuantity}>-</ChangeButton>
            <input type="text" value={quantity} />
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
