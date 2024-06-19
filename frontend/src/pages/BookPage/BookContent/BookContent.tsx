import { images } from "assets/images";
import BookRating from "components/BookRating";
import { StyledPrice } from "pages/CommonPages.styled";
import { ButtonOrange, ButtonYellow } from "styles/CommonStyled";
import { IBookItem } from "types/Books";
import {
  BookContentWrapper,
  BookSubTitle,
  BookTitle,
  DescTable,
  Description,
  Separator,
  StyledBookDescription,
  StyledButtonContainer,
} from "./BookContent.styled";
import { useState } from "react";
import Modal from "components/Modal";
import { StyledBookImage } from "../BookPage.styled";
import PictureViewer from "../PictureViewer/PictureViewer";

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
          <StyledBookImage
            id={book._id}
            onClick={() => showModal("pic-viewer")}
          >
            <img
              src={book.image || images.imagePlaceholder}
              alt={`${book.author} ${book.title} `}
            />
          </StyledBookImage>
          <StyledBookDescription>
            <BookTitle>{book.title}</BookTitle>
            <BookSubTitle>{book.author}</BookSubTitle>
            <BookRating rating={book.rating} />
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
          </StyledBookDescription>
          <StyledButtonContainer>
            <StyledPrice>
              {book.price}&nbsp;грн.<span></span>
            </StyledPrice>
            <ButtonOrange style={{ width: "296px" }}>Купити</ButtonOrange>
            <ButtonYellow style={{ width: "296px" }}>До кошика</ButtonYellow>
          </StyledButtonContainer>
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
