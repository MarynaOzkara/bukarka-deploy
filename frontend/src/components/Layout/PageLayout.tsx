import { useBooks } from "components/Book";
import Pagination from "components/Pagination";
import { Label } from "pages/CommonPages.styled";
import React, { ReactNode } from "react";
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
  return (
    <StyledCommonWrapper>
      <PageLayoutWrapper>
        {label && <Label>{label}</Label>}

        {children}
      </PageLayoutWrapper>
    </StyledCommonWrapper>
  );
};

export default PageLayout;
