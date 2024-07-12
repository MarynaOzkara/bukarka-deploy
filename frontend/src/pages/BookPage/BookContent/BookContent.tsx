import { useCallback, useEffect, useState } from "react";
import BookRating from "components/BookRating";
import Modal from "components/Modal";
import Cart from "components/Cart";
import FavoriteButton from "components/FavoriteButton";
import PictureViewer from "../PictureViewer/PictureViewer";
import { CartData } from "components/Cart/Cart";
import { IBookItem } from "types/Books";
import useCart from "hooks/useCart";
import { useAppDispatch } from "../../../redux/hooks";
import { images } from "assets/images";
import { fetchOrderById } from "../../../redux/orders/operations";
import {
  ButtonOrange,
  ButtonYellow,
  TextCenter,
  Wrapper,
} from "styles/CommonStyled";
import { Price, Separator } from "pages/CommonPages.styled";
import { BookImage, BookImageSet } from "../BookPage.styled";
import {
  BookContentWrapper,
  BookDescription,
  BookSubTitle,
  BookTitle,
  DescTable,
  Description,
  FavoriteButtonContainer,
  StyledButtonContainer,
} from "./BookContent.styled";

interface IBookContentProps {
  book: IBookItem;
}

const BookContent: React.FC<IBookContentProps> = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [cartData, setCartData] = useState<CartData | null>(null);

  const dispatch = useAppDispatch();
  const { handleCart } = useCart(book._id);

  const showModal = (content: string, img?: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const storedOrderId = localStorage.getItem("currentOrderId");
      if (storedOrderId) {
        const response = await dispatch(fetchOrderById(storedOrderId));
        if (response.meta.requestStatus === "fulfilled") {
          setCartData(response.payload as CartData);
        }
      }
    };

    fetchCartData();
  }, [dispatch]);

  const handleBuy = useCallback(async () => {
    if (!localStorage.getItem(`isBookAdded_${book._id}`)) {
      localStorage.setItem(`isBookAdded_${book._id}`, "true");

      await handleCart();
    }

    showModal("cart");
  }, [book._id, handleCart]);

  const handleAddToCart = useCallback(async () => {
    if (localStorage.getItem(`isBookAdded_${book._id}`)) {
      showModal("isBookAdded");
    } else {
      await handleCart();
    }
  }, [book._id, handleCart]);

  return (
    <>
      {book && (
        <BookContentWrapper>
          <BookImage id={book._id}>
            <div className="img-container">
              <img
                src={book.image || images.imagePlaceholder}
                alt={`${book.author} ${book.title} `}
                title={`${book.author} ${book.title} `}
                onClick={() => showModal("pic-viewer")}
              />
            </div>
            <FavoriteButtonContainer>
              <FavoriteButton itemId={book._id} />
            </FavoriteButtonContainer>
            <BookImageSet>
              {book.imagesUrls.length > 0 &&
                book.imagesUrls.map((img, index) => (
                  <img
                    key={index}
                    src={img || images.imagePlaceholder}
                    alt="img"
                    onClick={() => showModal("pic-viewer", img[index])}
                  />
                ))}
            </BookImageSet>
          </BookImage>

          <BookDescription>
            <BookTitle>{book.title}</BookTitle>
            <BookSubTitle>{book.author}</BookSubTitle>
            <BookRating rating={book.rating} />
            <Description>
              <p>{book.description}</p>
            </Description>
            <Separator />
            <DescTable>
              <li>
                <span>Мова книги</span>
                <span>{book.language}</span>
              </li>
              <li>
                <span>Жанр</span>
                <span>
                  {book.genre && book.genre.length > 0 ? (
                    book.genre.join(", ")
                  ) : (
                    <span>-</span>
                  )}
                </span>
              </li>

              <li>
                <span>Формат</span>
                <>{book.format}</>
              </li>
              <li>
                <span>Обкладинка</span>
                <span>{book.cover}</span>
              </li>
              <li>
                <span>Кількість сторінок</span>
                <span>{book.pages}</span>
              </li>
              <li>
                <span>Видавництво</span>
                <span>{book.publisher}</span>
              </li>
              <li>
                <span>Рік видання</span>
                <span>{book.year}</span>
              </li>
            </DescTable>
            <Separator />
            <Description>
              {book.description && <b>Про автора</b>}
              <p>{book.description}</p>
            </Description>
          </BookDescription>
          <StyledButtonContainer>
            <Price>
              {book.price}&nbsp;грн.<span></span>
            </Price>
            <ButtonOrange onClick={handleBuy}>Купити</ButtonOrange>
            <ButtonYellow onClick={handleAddToCart}>До кошика</ButtonYellow>
          </StyledButtonContainer>
          {isModalOpen && (
            <Modal close={closeModal} showCloseButton={true} animation="slide">
              {modalContent === "pic-viewer" && (
                <PictureViewer
                  imagesUrls={book.imagesUrls}
                  image={book.image}
                />
              )}
              {modalContent === "isBookAdded" && (
                <Wrapper>
                  <TextCenter>Книга вже є в кошику!</TextCenter>
                </Wrapper>
              )}
              {modalContent === "cart" && <Cart closeCart={closeModal} />}
            </Modal>
          )}
        </BookContentWrapper>
      )}
    </>
  );
};
export default BookContent;
