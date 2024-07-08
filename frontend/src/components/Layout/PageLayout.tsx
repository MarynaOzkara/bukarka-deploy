import { useBooks } from "components/Book";
import Pagination from "components/Pagination";
import { Label } from "pages/CommonPages.styled";
import React, { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StyledCommonWrapper } from "styles/CommonStyled";
import { IBookItem } from "types/Books";
import { PageLayoutWrapper } from "./PageLayout.styled";

interface IPageLayoutProps {
  children: ReactNode;
  label?: string;
  books?: IBookItem[];
}

const PageLayout: React.FC<IPageLayoutProps> = ({ children, label, books }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, setCurrentPage, totalPages } = useBooks();

  const [isMobile, setIsMobile] = useState<boolean>(true);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
        {isMobile && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {label && <Label>{label}</Label>}

        {children}

        {totalPages > 1 && (
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
