import { useBooks } from "components/Book";
import PageHeading from "components/PageHeading/PageHeading";
import Pagination from "components/Pagination";
import React, { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FlexWrapper,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";

interface IPageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<IPageLayoutProps> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { books, currentPage, setCurrentPage, totalPages } = useBooks();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          <PageHeading />
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
          {!!books.length && (
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
