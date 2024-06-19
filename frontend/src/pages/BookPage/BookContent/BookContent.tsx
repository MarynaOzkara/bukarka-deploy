import { images } from "assets/images";
import BookRating from "components/BookRating";
import Modal from "components/Modal";
import { Price } from "pages/CommonPages.styled";
import { useState } from "react";
import { ButtonOrange, ButtonYellow } from "styles/CommonStyled";
import { IBookItem } from "types/Books";
import { BookImage } from "../BookPage.styled";
import PictureViewer from "../PictureViewer/PictureViewer";
import {
  BookContentWrapper,
  BookDescription,
  BookSubTitle,
  BookTitle,
  ButtonContainer,
  DescTable,
  Description,
  Separator,
} from "./BookContent.styled";

interface IBookContentProps {
  book: IBookItem;
}

const BookContent: React.FC<IBookContentProps> = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const showModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent("");
    setIsModalOpen(false);
  };
  return (
    <>
      {!!book && (
        <BookContentWrapper>
          <BookImage id={book._id} onClick={() => showModal("pic-viewer")}>
            <img
              src={book.image || images.imagePlaceholder}
              alt={`${book.author} ${book.title} `}
              title={`${book.author} ${book.title} `}
            />
            {!!book.imagesUrls && (
              <div>
                {book.imagesUrls.map((img) => (
                  <img src={img || images.imagePlaceholder} alt="img" />
                ))}
              </div>
            )}
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
                  {(!!book.genre &&
                    book.genre.map((genre) => <> {genre} </>)) || (
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
              {!!book.description && <b>Про автора</b>}
              <p>{book.description}</p>
            </Description>
          </BookDescription>
          <ButtonContainer>
            <Price>
              {book.price}&nbsp;грн.<span></span>
            </Price>
            <ButtonOrange style={{ width: "296px" }}>Купити</ButtonOrange>
            <ButtonYellow style={{ width: "296px" }}>До кошика</ButtonYellow>
          </ButtonContainer>
          {isModalOpen && (
            <Modal close={closeModal} showCloseButton={true} animation="slide">
              {modalContent === "pic-viewer" && <PictureViewer book={book} />}
            </Modal>
          )}
        </BookContentWrapper>
      )}
    </>
  );
};
export default BookContent;
