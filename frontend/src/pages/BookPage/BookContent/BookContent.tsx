import { images } from "assets/images";
import { IBookItem } from "types/Books";
import {
  DescTable,
  StyledBookDescription,
  StyledBookImage,
  StyledCartOperations,
} from "./BookContent.styled";

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

            <DescTable>
              <li>Мова книги</li>
              <li>Жанр</li>
              <li>Серія</li>
              <li>Формат</li>
              <li>Обкладинка</li>
              <li>Кількість сторінок</li>
              <li>Видавництво</li>
              <li>Рік видання</li>
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
