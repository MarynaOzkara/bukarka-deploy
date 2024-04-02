import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarsWrapper, StyledStarIcon } from "../../Slider/SimpleSlider.styled";
import {
  StyledItemCart,
  StyledItemImage,
  StyledTitle,
  StyledPrice,
  StyledNameAuthor,
  FormButton,
} from "./CartItem.styled";
import { images } from "../../../assets/images";
import ReactStars from "react-rating-stars-component";
import Modal from "../../Modal";
import FavoriteButton from "../../FavoriteButton/FavoriteButton";
// import {
//   StyledAmountOfBooks,
//   StyledAuthor,
//   StyledBasketHeader,
//   StyledBasketImage,
//   StyledBasketItem,
//   StyledBasketPricePrice,
//   StyledBasketTitle,
//   StyledBasketWrapper,
//   StyledChangeButtons,
//   StyledCountBlock,
//   StyledDelete,
//   StyledDescription,
//   StyledItemAbout,
//   StyledMainTitle,
//   StyledPriceBlock,
// } from "../../Basket/BasketItem/BasketItem.styled";
import axios from "axios";
import { BasketList } from "../../Basket/BasketList/BasketList";
import { instance } from "../../../utils/fetchInstance";
import { useAppDispatch } from "../../../redux/hooks";

interface IProps {
  _id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  rating: number;
  index: number;
}
const CartItem: React.FC<IProps> = ({
  _id,
  title,
  author,
  image,
  price,
  rating,
  index,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  let navigate = useNavigate();
  const firstExample = {
    size: 20,
    count: 5,
    edit: false,
    emptyIcon: <StyledStarIcon fillColor="#FFFBFF" />,
    filledIcon: <StyledStarIcon />,
  };

  useEffect(() => {
    if (currentId) {
      // Only perform the request if currentId is not null

      const fetchData = async () => {
        try {
          const response = await instance.post(`/api/orders/${currentId}`, {
            id: currentId,
          });
          console.log("Response:", response.data);
          setIsOpen(true);
          // Handle the response data as needed
        } catch (error) {
          console.error("Error making POST request:", error);
          // Handle the error as needed
        }
      };

      fetchData();
    }
  }, [currentId]); // Dependency array includes currentId, so the effect runs when currentId changes

  // const toggleModal = () => {
  //   setIsOpen(!isOpen);
  // };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    navigate(`/books/${target.id}`);
  };
  const truncateString = (str: string, num: number) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <>
      <StyledItemCart>
        <FavoriteButton itemId={_id} />
        <StyledItemImage id={_id} onClick={handleClick}>
          <img
            src={
              image ||
              (index === 0 && images.BookNetflix) ||
              (index === 2 && images.BookCover) ||
              images.BookDarkSide
            }
            alt=""
          />
        </StyledItemImage>
        <StyledTitle style={{ width: "192px" }}>
          <div
            id={_id}
            onClick={handleClick}
            title={`${title.length > 25 ? title : ""}`}
          >
            {truncateString(title, 25)}
          </div>
        </StyledTitle>
        <StyledNameAuthor>
          <div title={`${author.length > 25 ? author : ""}`}>
            {truncateString(author, 25)}
          </div>
        </StyledNameAuthor>
        <StarsWrapper>
          <ReactStars {...firstExample} value={index === 0 ? 5 : rating} />
        </StarsWrapper>
        <StyledPrice>{price} грн</StyledPrice>
        {/*dispatch*/}

        <FormButton id={_id} onClick={() => setCurrentId(_id)}>
          Купити
        </FormButton>

        {/*<FormButton id={_id} onClick={() => setCurrentId(_id)}>*/}
        {/*  Купити*/}
        {/*</FormButton>*/}

        {isOpen && (
          <Modal close={closeModal} showCloseButton={true}>
            <BasketList
              id={_id}
              title={title}
              index={index}
              image={image}
              author={author}
              price={price}
              // isOpen={true}
              // setIsOpen={() => setIsOpen(isOpen)}
            ></BasketList>
          </Modal>
        )}
      </StyledItemCart>
    </>
  );
};

export default CartItem;
