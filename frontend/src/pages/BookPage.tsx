import { IBookItem } from "components/Book";
import Loader from "components/Loader";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FlexWrapper,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";
import { instance } from "../utils/fetchInstance";
import { Label } from "./CommonPages.styled";
import { BookCard } from "components";

const BookPage: React.FC = () => {
  const [book, setBook] = useState<IBookItem>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          <Label>Book page</Label>
          <FlexWrapper style={{ justifyContent: "center" }}>
            {book ? <BookCard {...book} /> : <div>No book data</div>}
          </FlexWrapper>
        </Wrapper>
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default BookPage;
