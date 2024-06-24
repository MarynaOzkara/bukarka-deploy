import { useBooks } from "components/Book";
import { PageLayout } from "components/Layout";
import SimpleSlider from "components/Slider/SimpleSlider";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextCenter } from "styles/CommonStyled";
import BookContent from "./BookContent/BookContent";

const BookPage: React.FC = () => {
  const { book, fetchBookById } = useBooks();
  const { id } = useParams();

  useEffect(() => {
    const loadBook = async () => {
      await fetchBookById(id);
    };
    id && loadBook();
  }, [fetchBookById, id]);

  const { books, fetchBooks } = useBooks();

  useEffect(() => {
    const loadData = async () => {
      await fetchBooks();
    };

    loadData();
  }, [fetchBooks]);

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
        {books && books.length > 0 && <SimpleSlider data={books} />}
      </TextCenter>
    </PageLayout>
  );
};

export default BookPage;
