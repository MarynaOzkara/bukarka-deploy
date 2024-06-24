import { images } from "assets/images";
import Cart from "components/Cart";
import FavoriteButton from "components/FavoriteButton/";
import Modal from "components/Modal";
import {
  StarsWrapper,
  StyledStarIcon,
} from "components/Slider/SimpleSlider.styled";
import { useCallback, useMemo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { truncateString } from "utils/truncateString";
import { useAppDispatch } from "../../../redux/hooks";
import { addToCart, fetchOrdersData } from "../../../redux/orders/operations";
import {
  selectOrdersError,
  selectOrdersStatus,
} from "../../../redux/orders/selectors";
import {
  Button,
  StyledFavoriteButton,
  StyledItemCard,
  StyledItemImage,
  StyledNameAuthor,
  StyledPrice,
  StyledTitle,
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
    } else {
      await dispatch(addToCart(_id));
      await dispatch(fetchOrdersData());
      setIsOpen(true);
      setIsBookAdded(true);
      localStorage.setItem(`isBookAdded_${_id}`, "true");
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
