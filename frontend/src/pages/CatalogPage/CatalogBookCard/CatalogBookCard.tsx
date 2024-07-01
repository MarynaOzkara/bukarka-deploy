import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import Cart from "components/Cart";
import FavoriteButton from "components/FavoriteButton/";
import Modal from "components/Modal";
import useCart from "hooks/useCart";
import { truncateString } from "utils/truncateString";
import { images } from "assets/images";
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

  let navigate = useNavigate();
  const { handleCart } = useCart(_id);

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

      await handleCart();
    }

    showModal("cart");
  }, [_id, handleCart]);

  const handleAddToCart = useCallback(async () => {
    if (localStorage.getItem(`isBookAdded_${_id}`)) {
      showModal("isBookAdded");
    } else {
      await handleCart();
    }
  }, [_id, handleCart]);

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
