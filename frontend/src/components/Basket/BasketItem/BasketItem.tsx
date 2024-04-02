import React, { useEffect, useState } from "react";
import {
  StyledBasketItem,
  StyledBasketTitle,
  StyledAuthor,
  FormButton,
  StyledItemPrice,
  StyledItemAbout,
  StyledPriceBlock,
  StyledBasketImage,
  StyledDescription,
  StyledBasketPricePrice,
  StyledCountBlock,
  StyledDeleteButton,
  StyledChangeButtons,
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
  // rating,
  index,
  orderId,
  quantity,
}) => {
  const dispatch = useAppDispatch();

  const handleDecrease = () => {
    dispatch(
      decreaseItemQuantity({ orderId, quantity: Math.max(1, quantity - 1) }),
    );
  };

  const handleIncrease = () => {
    dispatch(
      decreaseItemQuantity({ orderId, quantity: Math.max(1, quantity - 1) }),
    );
  };

  const handleDeleteClick = (id: string) => {
    dispatch(deleteItem(id)).then(() => {
      dispatch(fetchOrdersData());
    });
  };

  return (
    <>
      <StyledBasketItem>
        <StyledItemAbout>
          <StyledBasketImage
            id={id}
            // onClick={handleClick}
          >
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
              <div
                id={id}
                // onClick={handleClick}
              >
                {title}
              </div>
            </StyledBasketTitle>
            <StyledAuthor>
              <div
                id={id}
                // onClick={handleClick}
              >
                {author}
              </div>
            </StyledAuthor>
            <div>
              <FavoriteButton itemId={id} />
              <p>До обраного</p>
            </div>
          </StyledDescription>
        </StyledItemAbout>
        <StyledPriceBlock>
          <StyledItemPrice>
            <StyledBasketPricePrice>{price} грн</StyledBasketPricePrice>
            <StyledCountBlock>
              <StyledChangeButtons onClick={handleDecrease}>
                -
              </StyledChangeButtons>
              {/*<StyledCountBooks></StyledCountBooks>*/}
              <input type="text" value={quantity} />
              <StyledChangeButtons onClick={handleIncrease}>
                +
              </StyledChangeButtons>
            </StyledCountBlock>
            <StyledBasketPricePrice>{price} грн</StyledBasketPricePrice>
          </StyledItemPrice>
          <StyledDeleteButton
            // id={orderId!}
            onClick={() => handleDeleteClick(orderId!)}
          >
            Видалити
          </StyledDeleteButton>
          {/*<div></div>*/}
        </StyledPriceBlock>
      </StyledBasketItem>
    </>
  );
};

export default CartItem;
