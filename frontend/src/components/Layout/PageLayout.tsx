import { Label } from "pages/CommonPages.styled";
import React, { ReactNode } from "react";
import { StyledCommonWrapper } from "styles/CommonStyled";
import { IBookItem } from "types/Books";
import { PageLayoutWrapper } from "./PageLayout.styled";

interface IPageLayoutProps {
  children: ReactNode;
  label?: string;
  books?: IBookItem[];
}

const PageLayout: React.FC<IPageLayoutProps> = ({ children, label }) => {
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
