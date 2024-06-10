import React from "react";
import { Outlet } from "react-router-dom";
import { PageWrapper, StyledCommonWrapper } from "styles/CommonStyled";

const CatalogPage: React.FC = () => {
  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default CatalogPage;
