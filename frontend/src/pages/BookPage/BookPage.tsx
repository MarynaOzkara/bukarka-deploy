import { BookCard } from "components";
import { IBookItem } from "components/Book";
import { PageLayout } from "components/Layout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../utils/fetchInstance";

const BookPage: React.FC = () => {
  const [book, setBook] = useState<IBookItem>();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <PageLayout book={book}>
      {!!book ? <BookCard {...book} /> : <div>No book data</div>}
    </PageLayout>
  );
};

export default BookPage;
