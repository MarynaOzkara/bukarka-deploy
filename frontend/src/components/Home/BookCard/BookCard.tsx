import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Cart from "components/Cart";
import Modal from "components/Modal";
import { images } from "assets/images";
import { instance } from "utils/fetchInstance";
import { truncateString } from "utils/truncateString";
import FavoriteButton from "components/FavoriteButton/";
import {
  StarsWrapper,
  StyledStarIcon,
} from "components/Slider/SimpleSlider.styled";
import {
  StyledItemCard,
  StyledItemImage,
  StyledTitle,
  StyledPrice,
  StyledNameAuthor,
  StyledFavoriteButton,
  Button,
} from "./BookCard.styled";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  let navigate = useNavigate();

  const starsProps = {
    size: 20,
    count: 5,
    edit: false,
    color: "#fffbff",
    activeColor: "#ffd700",

    emptyIcon: <StyledStarIcon $fillColor= "var(--bukarka-white)" />,
    filledIcon: <StyledStarIcon $fillColor="var(--bukarka-yellow)"  />,
  };

  const fetchData = useCallback(async (currentId: string) => {
    try {
      await instance.post(`/api/orders/${currentId}`, {
        id: currentId,
      });
      setIsOpen(true);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  }, []);

  useEffect(() => {
    if (currentId) {
      fetchData(currentId);
    }
  }, [currentId, fetchData]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    navigate(`/books/${target.id}`);
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
            src={image || images.imagePlaceholder}
            alt={`${author} ${title} `}
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
          <ReactStars {...starsProps} value={rating} />
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
