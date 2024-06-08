import { useBooks } from "components/Book";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { BookCard, Pagination } from "components";
import {
  FlexWrapper,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";
import { Label } from "./CommonPages.styled";

const CatalogPage: React.FC = () => {
  const { books, fetchBooks, currentPage, setCurrentPage, totalPages } =
    useBooks();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    setCurrentPage(page);
  }, [searchParams, setCurrentPage]);

  useEffect(() => {
    fetchBooks(currentPage);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          <Label>Каталог</Label>
          <FlexWrapper
            style={{
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {books.length > 0 &&
              books.map((book, index) => <BookCard key={index} {...book} />)}
          </FlexWrapper>
          {books.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Wrapper>
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default CatalogPage;
