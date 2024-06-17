import { IBookItem, useBooks } from "components/Book";
import Pagination from "components/Pagination";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import React, { ReactNode } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  FlexWrapper,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";

interface IPageLayoutProps {
  label?: string;
  books?: IBookItem[];
  book?: IBookItem;
  children: ReactNode;
}

const PageLayout: React.FC<IPageLayoutProps> = ({
  label,
  books,
  book,
  children,
}) => {
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, setCurrentPage, totalPages } = useBooks();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          {!!label && <Label>{label}</Label>}
          {!!books && (
            <>
              <BreadCrumbs>Каталог | {category} </BreadCrumbs>
              <Label> {link || subcategory || category || "Усі книги"} </Label>
            </>
          )}
          {!!book && (
            <>
              <BreadCrumbs>Каталог | {book.category} </BreadCrumbs>
              <Label> {book.title} </Label>
            </>
          )}

          <FlexWrapper
            style={{
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "2rem",
              position: "relative",
            }}
          >
            {children}
          </FlexWrapper>
          {!!books && !!books.length && (
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

export default PageLayout;
