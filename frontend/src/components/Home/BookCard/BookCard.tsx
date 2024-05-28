import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../../assets/images";
import ReactStars from "react-rating-stars-component";
import Modal from "../../Modal";
import { instance } from "../../../utils/fetchInstance";
import FavoriteButton from "../../FavoriteButton/FavoriteButton";
import { StarsWrapper, StyledStarIcon } from "../../Slider/SimpleSlider.styled";
import {
  StyledItemCard,
  StyledItemImage,
  StyledTitle,
  StyledPrice,
  StyledNameAuthor,
  StyledFavoriteButton,
  Button,
} from "./BookCard.styled";
import Cart from "components/Cart";

interface IProps {
  _id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  rating: number;
  index: number;
}

interface CartItem {
  _id: string;
  orderItems: {
    _id: string;
    quantity: number;
    product: {
      _id: string;
      author: string;
      title: string;
    };
  }[];
}

const BookCard: React.FC<IProps> = ({
  _id,
  title,
  author,
  image,
  price,
  rating,
  index,
}) => {
  // console.log("_id", _id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  let navigate = useNavigate();

  const firstExample = {
    size: 20,
    count: 5,
    edit: false,
    emptyIcon: <StyledStarIcon $fillColor="#FFFBFF" />,
    filledIcon: <StyledStarIcon />,
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await instance.get("/api/orders");
        // console.log("response", response);
        // console.log(response.data);

        setCartItems(response.data);
        // console.log(cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    if (currentId) {
      const fetchData = async () => {
        try {
          await instance.post(`/api/orders/${currentId}`, {
            id: currentId,
          });
          setIsOpen(true);
        } catch (error) {
          console.error("Error making POST request:", error);
        }
      };

      fetchData();
    }
  }, [currentId]);

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

  const handleAddToCart = async () => {
    try {
      const bookExistsInCart = cartItems.some((cartItem) =>
        cartItem.orderItems.some((item) => item.product._id === _id)
      );

      if (bookExistsInCart) {
        setIsOpen(true);
      } else {
        await instance.post(`/api/orders/${_id}`);

        const response = await instance.get("/api/orders");
        setCartItems(response.data);
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <StyledItemCard>
        <StyledFavoriteButton>
          <FavoriteButton itemId={_id} />
        </StyledFavoriteButton>

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

        <Button onClick={handleAddToCart}>Купити</Button>

        {isOpen && (
          <Modal close={closeModal} showCloseButton={true}>
            <Cart closeCart={closeModal} />
          </Modal>
        )}
      </StyledItemCard>
    </>
  );
};

export default BookCard;
