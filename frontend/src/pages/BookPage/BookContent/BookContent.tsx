import { images } from "assets/images";
import BookRating from "components/BookRating";
import Modal from "components/Modal";
import { Price } from "pages/CommonPages.styled";
import { useCallback, useState } from "react";
import {
  ButtonOrange,
  ButtonYellow,
  TextCenter,
  Wrapper,
} from "styles/CommonStyled";
import { IBookItem } from "types/Books";
import { BookImage, BookImageSet } from "../BookPage.styled";
import PictureViewer from "../PictureViewer/PictureViewer";
import {
  BookContentWrapper,
  BookDescription,
  BookSubTitle,
  BookTitle,
  ButtonContainer,
  DescTable,
  Description,
  FavoriteButtonContainer,
  Separator,
} from "./BookContent.styled";

import Cart from "components/Cart";
import FavoriteButton from "components/FavoriteButton";
import { useAppDispatch } from "../../../redux/hooks";
import { addToCart, fetchOrdersData } from "../../../redux/orders/operations";

interface IBookContentProps {
  book: IBookItem;
}

const BookContent: React.FC<IBookContentProps> = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const dispatch = useAppDispatch();

  const showModal = (content: string, img?: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent("");
    setIsModalOpen(false);
  };

  const handleBuy = useCallback(async () => {
    if (!localStorage.getItem(`isBookAdded_${book._id}`)) {
      localStorage.setItem(`isBookAdded_${book._id}`, "true");
      await dispatch(addToCart(book._id));
      await dispatch(fetchOrdersData());
    }
    showModal("cart");
  }, [book._id, dispatch]);

  const handleAddToCart = useCallback(async () => {
    if (localStorage.getItem(`isBookAdded_${book._id}`)) {
      showModal("isBookAdded");
    } else {
      await dispatch(addToCart(book._id));
      await dispatch(fetchOrdersData());
      localStorage.setItem(`isBookAdded_${book._id}`, "true");
    }
  }, [book._id, dispatch]);

  return (
    <>
      {book && (
        <BookContentWrapper>
          <BookImage id={book._id}>
            <img
              src={book.image || images.imagePlaceholder}
              alt={`${book.author} ${book.title} `}
              title={`${book.author} ${book.title} `}
              onClick={() => showModal("pic-viewer")}
            />
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
                  {(book.genre &&
                    book.genre.map((genre, ind) => (
                      <span key={ind}> {genre} </span>
                    ))) || <span>-</span>}
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
          <ButtonContainer>
            <Price>
              {book.price}&nbsp;грн.<span></span>
            </Price>
            <ButtonOrange style={{ width: "296px" }} onClick={handleBuy}>
              Купити
            </ButtonOrange>
            <ButtonYellow style={{ width: "296px" }} onClick={handleAddToCart}>
              До кошика
            </ButtonYellow>
          </ButtonContainer>
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
