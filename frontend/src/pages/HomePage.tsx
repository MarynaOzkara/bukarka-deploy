import { PageWrapper, StyledCommonWrapper } from "styles/CommonStyled";
import CategorySlider from "../components/Home/CategorySlider/CategorySlider";
import React from "react";
import BannerBlock from "components/Home/BannerBlock/BannerBlock";

const HomePage: React.FC = () => {
  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <BannerBlock />
        <CategorySlider />
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default HomePage;
