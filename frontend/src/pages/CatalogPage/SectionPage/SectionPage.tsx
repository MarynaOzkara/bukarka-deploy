import { BookCard } from "components";
import { IBookItem } from "components/Book";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FlexWrapper } from "styles/CommonStyled";

const SectionPage = () => {
  const { books: initialBooks } = useOutletContext<{ books: IBookItem[] }>();
  const [books, setBooks] = useState(initialBooks);
  console.log(books);

  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);

  return (
    <>
      <FlexWrapper
        style={{
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {(books.length > 0 &&
          books.map((book, index) => <BookCard key={index} {...book} />)) || (
          <div>No books in catalog</div>
        )}
      </FlexWrapper>
    </>
  );
};

export default SectionPage;
