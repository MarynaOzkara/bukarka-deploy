import { useBooks } from "components/Book";
import { PageLayout } from "components/Layout";
import SimpleSlider from "components/Slider/SimpleSlider";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextCenter } from "styles/CommonStyled";
import BookContent from "./BookContent/BookContent";
import { StyledBookPageSlider } from "./BookPage.styled";
import { hasData } from "utils/hasData";

const BookPage: React.FC = () => {
  const { book, fetchBookById, books, fetchBooks } = useBooks();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchBookById(id);
    }
  }, [fetchBookById, id]);

  useEffect(() => {
    fetchBooks({});
  }, [fetchBooks]);

  const hasBooks = hasData(books);

  return (
    <PageLayout>
      {book && (
        <>
          <BreadCrumbs>Каталог | {book.category} </BreadCrumbs>
          <Label> {book.subcategory} </Label>
        </>
      )}

      {book ? <BookContent book={book} /> : <div>No book data</div>}
      <Label>Вас може зацікавити</Label>
      <TextCenter>
        {hasBooks && (
          <StyledBookPageSlider>
            <SimpleSlider data={books} />
          </StyledBookPageSlider>
        )}
      </TextCenter>
    </PageLayout>
  );
};

export default BookPage;
