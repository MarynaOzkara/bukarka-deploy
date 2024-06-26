import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import Cart from "components/Cart";
import Modal from "components/Modal";
import FavoriteButton from "components/FavoriteButton/";
import { images } from "assets/images";
import { truncateString } from "utils/truncateString";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addToCart,
  createCart,
  fetchOrderById,
} from "../../../redux/orders/operations";
import {
  selectOrdersError,
  selectOrdersStatus,
} from "../../../redux/orders/selectors";
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
  const [isBookAdded, setIsBookAdded] = useState<boolean>(
    localStorage.getItem(`isBookAdded_${_id}`) === "true"
  );

  const ordersStatus = useSelector(selectOrdersStatus);
  const ordersError = useSelector(selectOrdersError);

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const starsProps = useMemo(
    () => ({
      size: 20,
      count: 5,
      edit: false,
      color: "#fffbff",
      activeColor: "#ffd700",
      emptyIcon: <StyledStarIcon $fillColor="var(--bukarka-white)" />,
      filledIcon: <StyledStarIcon $fillColor="var(--bukarka-yellow)" />,
    }),
    []
  );

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.currentTarget as HTMLDivElement;
      navigate(`/books/${target.id}`);
    },
    [navigate]
  );

  const handleAddToCart = useCallback(async () => {
    if (isBookAdded) {
      console.log("Книга вже є в кошику!");
      setIsOpen(true);
      return;
    }

    let orderId = localStorage.getItem("currentOrderId");
    if (!orderId) {
      const createCartResponse = await dispatch(createCart());
      console.log(createCartResponse);
      if (createCartResponse.meta.requestStatus === "fulfilled") {
        orderId = createCartResponse?.payload?.orderId;
        orderId && localStorage.setItem("currentOrderId", orderId);
      } else {
        console.log("Помилка при створенні кошика.");
        return;
      }
    }

    if (!orderId) {
      console.log("orderId є нульовим або не встановлено");
      return;
    }

    const addToCartResponse = await dispatch(
      addToCart({ orderId, productId: _id })
    );
    if (addToCartResponse.meta.requestStatus === "fulfilled") {
      await dispatch(fetchOrderById(orderId));
      setIsOpen(true);
      setIsBookAdded(true);
      localStorage.setItem(`isBookAdded_${_id}`, "true");
    } else {
      console.log("Помилка при додаванні товару до кошика.");
    }
  }, [_id, dispatch, isBookAdded]);

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
      {ordersStatus === "failed" && console.log(ordersError)}
    </>
  );
};

export default BookCard;
