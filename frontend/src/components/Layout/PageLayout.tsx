import { useBooks } from "components/Book";
import Pagination from "components/Pagination";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import React, { ReactNode } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  FlexWrap,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";
import { IBookItem } from "types/Books";

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
    if (page !== currentPage) {
      setCurrentPage(page);
    }
    const keyword = searchParams.get("keyword") || "";

    setSearchParams({
      keyword,
      page: page.toString(),
    });
  };

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          {label ? (
            <Label>{label}</Label>
          ) : (
            !!books && (
              <>
                <BreadCrumbs>Каталог | {category} </BreadCrumbs>
                <Label>{link || subcategory || category || "Усі книги"}</Label>
              </>
            )
          )}
          {!!book && (
            <>
              <BreadCrumbs>Каталог | {book.category} </BreadCrumbs>
              <Label> {book.subcategory} </Label>
            </>
          )}
          <FlexWrap> {children} </FlexWrap>
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
