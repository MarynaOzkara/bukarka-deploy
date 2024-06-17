import { useBooks } from "components/Book";
import { PageLayout } from "components/Layout";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookContent from "./BookContent/BookContent";

const BookPage: React.FC = () => {
  const { book, fetchBookById } = useBooks();
  const { id } = useParams();

  useEffect(() => {
    const loadBook = async () => {
      await fetchBookById(id);
    };
    !!id && loadBook();
  }, [fetchBookById, id]);

  return (
    <PageLayout book={book}>
      {!!book ? <BookContent book={book} /> : <div>No book data</div>}
    </PageLayout>
  );
};

export default BookPage;
