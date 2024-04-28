import React from "react";
import {
  StyledBasketItem,
  StyledBasketTitle,
  StyledAuthor,
  StyledItemPrice,
  StyledItemAbout,
  StyledPriceBlock,
  StyledBasketImage,
  StyledDescription,
  StyledBasketPricePrice,
  StyledCountBlock,
  StyledDeleteButton,
  StyledChangeButtons,
  StyledFavoriteButton,
  StyledButtonWrapper,
} from "./BasketItem.styled";
import { images } from "../../../assets/images";
import FavoriteButton from "../../FavoriteButton/FavoriteButton";
import { useAppDispatch } from "../../../redux/hooks";
import { deleteItem, fetchOrdersData } from "../../../redux/orders/operations";

interface IProps {
  id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  // rating: number;
  index: number;
  orderId: string | undefined;
  quantity: number;
}
const CartItem: React.FC<IProps> = ({
  id,
  title,
  author,
  image,
  price,
  index,
  orderId,
  quantity,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteClick = (id: string) => {
    dispatch(deleteItem(id)).then(() => {
      dispatch(fetchOrdersData());
    });
  };

  return (
    <>
      <StyledBasketItem>
        <StyledItemAbout>
          <StyledBasketImage id={id}>
            <img
              src={
                image ||
                (index === 0 && images.BookNetflix) ||
                (index === 2 && images.BookCover) ||
                images.BookDarkSide
              }
              alt=""
            />
          </StyledBasketImage>
          <StyledDescription>
            <StyledBasketTitle>
              <div id={id}>{title}</div>
            </StyledBasketTitle>
            <StyledAuthor>
              <div id={id}>{author}</div>
            </StyledAuthor>
            <StyledFavoriteButton>
              <FavoriteButton itemId={id} />
              <p>До обраного</p>
            </StyledFavoriteButton>
          </StyledDescription>
        </StyledItemAbout>
        <StyledPriceBlock>
          <StyledItemPrice>
            <StyledBasketPricePrice>{price} грн</StyledBasketPricePrice>
            <StyledCountBlock>
              <StyledChangeButtons>-</StyledChangeButtons>
              <input type="text" value={quantity} />
              <StyledChangeButtons>+</StyledChangeButtons>
            </StyledCountBlock>
            <StyledBasketPricePrice>{price} грн</StyledBasketPricePrice>
          </StyledItemPrice>
          <StyledButtonWrapper>
            <StyledDeleteButton onClick={() => handleDeleteClick(orderId!)}>
              Видалити
            </StyledDeleteButton>
          </StyledButtonWrapper>
        </StyledPriceBlock>
      </StyledBasketItem>
    </>
  );
};

export default CartItem;
