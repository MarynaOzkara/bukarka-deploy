import { useBooks } from "components/Book";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BookCard, Pagination } from "components";
import {
  FlexWrapper,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";
import { BreadCrumbs, Label } from "../CommonPages.styled";

const CatalogPage: React.FC = () => {
  const { books, fetchBooks, currentPage, setCurrentPage, totalPages } =
    useBooks();
  const [searchParams, setSearchParams] = useSearchParams();

  const { category, subcategory, link } = useParams();

  console.log(category);

  useEffect(() => {
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    } else {
      fetchBooks(page);
    }
  }, [searchParams, currentPage, setCurrentPage, fetchBooks]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          <BreadCrumbs>Каталог | {category} </BreadCrumbs>
          <Label> {link || subcategory || category || "Усі книги"} </Label>

          <FlexWrapper
            style={{
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {(books.length > 0 &&
              books.map((book, index) => (
                <BookCard key={index} {...book} />
              ))) || <div>No books in catalog</div>}
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
