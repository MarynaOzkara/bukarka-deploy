import { images } from "assets/images";
import { IBookItem } from "types/Books";
import {
  DescTable,
  StyledBookDescription,
  StyledBookImage,
  StyledCartOperations,
} from "./BookContent.styled";
import BookRating from "components/BookRating";

interface IBookContentProps {
  book: IBookItem;
}

const BookContent: React.FC<IBookContentProps> = ({ book }) => {
  return (
    <>
      {!!book && (
        <>
          <StyledBookImage id={book._id}>
            <img
              src={book.image || images.imagePlaceholder}
              alt={`${book.author} ${book.title} `}
            />
          </StyledBookImage>
          <StyledBookDescription>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <BookRating rating={book.rating} />
            <DescTable>
              <li>
                <span>Мова книги</span>
                <span>{book.language}</span>
              </li>
              <li>
                <span>Жанр</span>
                <span>
                  {(!!book.genre &&
                    book.genre.map((genre) => <span>{genre}</span>)) || (
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
            <section>
              <h5>Про автора</h5>
              <p></p>
            </section>
          </StyledBookDescription>
          <StyledCartOperations></StyledCartOperations>
        </>
      )}
    </>
  );
};
export default BookContent;
