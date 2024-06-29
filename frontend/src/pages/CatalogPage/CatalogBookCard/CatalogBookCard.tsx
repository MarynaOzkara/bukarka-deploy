import { images } from "assets/images";
import Cart from "components/Cart";
import FavoriteButton from "components/FavoriteButton/";
import Modal from "components/Modal";

import { useCallback, useMemo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { truncateString } from "utils/truncateString";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addToCart,
  createCart,
  fetchOrderById,
  fetchOrdersData,
} from "../../../redux/orders/operations";

import {
  ButtonOrange,
  ButtonYellow,
  TextCenter,
  Wrapper,
} from "styles/CommonStyled";
import {
  StyledButtonContainer,
  StyledFavoriteButton,
  StyledItemCard,
  StyledItemImage,
  StyledNameAuthor,
  StyledPrice,
  StyledStarsWrapper,
  StyledTitle,
} from "./CatalogBookCard.styled";

import { StyledStarIcon } from "components/BookRating/BookRating.styled";

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
}) => {
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const showModal = (content: string, img?: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent("");
    setIsModalOpen(false);
  };

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.currentTarget as HTMLDivElement;
      navigate(`/books/${target.id}`);
    },
    [navigate]
  );

  const handleBuy = useCallback(async () => {
    if (!localStorage.getItem(`isBookAdded_${_id}`)) {
      localStorage.setItem(`isBookAdded_${_id}`, "true");

      let orderId = localStorage.getItem("currentOrderId");

      if (!orderId) {
        const createCartResponse = await dispatch(createCart());
        console.log(createCartResponse);
        if (createCartResponse.meta.requestStatus === "fulfilled") {
          orderId = createCartResponse?.payload?.orderId;
          if (orderId) {
            localStorage.setItem("currentOrderId", orderId);
          } else {
            console.log("orderId не встановлений");
            return;
          }
        } else {
          console.log("Помилка при створенні кошика.");
          return;
        }
      }
      const addToCartResponse = await dispatch(
        addToCart({ orderId, productId: _id })
      );
      if (addToCartResponse.meta.requestStatus === "fulfilled") {
        await dispatch(fetchOrderById(orderId));
        localStorage.setItem(`isBookAdded_${_id}`, "true");
      } else {
        console.log("Помилка при додаванні товару до кошика.");
      }
    }

    showModal("cart");
  }, [_id, dispatch]);


  const handleAddToCart = useCallback(async () => {
    if (localStorage.getItem(`isBookAdded_${_id}`)) {
      showModal("isBookAdded");
    } else {
      // await dispatch(addToCart(_id));
      await dispatch(fetchOrdersData());
      localStorage.setItem(`isBookAdded_${_id}`, "true");
    }
  }, [_id, dispatch]);

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

        <StyledStarsWrapper>
          <ReactStars {...starsProps} value={rating} />
        </StyledStarsWrapper>

        <StyledPrice>{price} грн</StyledPrice>

        <StyledButtonContainer>
          <ButtonOrange onClick={handleBuy}>Купити</ButtonOrange>
          <ButtonYellow onClick={handleAddToCart}>До кошика</ButtonYellow>
        </StyledButtonContainer>

        {isModalOpen && (
          <Modal close={closeModal} showCloseButton={true}>
            {modalContent === "isBookAdded" && (
              <Wrapper>
                <TextCenter>Книга вже є в кошику!</TextCenter>
              </Wrapper>
            )}
            {modalContent === "cart" && <Cart closeCart={closeModal} />}
          </Modal>
        )}
      </StyledItemCard>
    </>
  );
};

export default BookCard;
