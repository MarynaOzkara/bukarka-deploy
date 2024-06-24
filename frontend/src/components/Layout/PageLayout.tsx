import { useBooks } from "components/Book";
import Pagination from "components/Pagination";
import { Label } from "pages/CommonPages.styled";
import React, { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { StyledCommonWrapper } from "styles/CommonStyled";
import { IBookItem } from "types/Books";
import { PageLayoutWrapper } from "./PageLayout.styled";

interface IPageLayoutProps {
  label?: string;
  books?: IBookItem[];
  children: ReactNode;
}

const PageLayout: React.FC<IPageLayoutProps> = ({ label, books, children }) => {
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
      <PageLayoutWrapper>
        {label && <Label>{label}</Label>}

        {children}

        {books && books.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </PageLayoutWrapper>
    </StyledCommonWrapper>
  );
};

export default PageLayout;
