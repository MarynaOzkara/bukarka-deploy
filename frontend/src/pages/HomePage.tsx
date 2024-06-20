import { PageWrapper, StyledCommonWrapper } from "styles/CommonStyled";
import CategorySlider from "../components/Home/CategorySlider/CategorySlider";
import React from "react";
import BannerBlock from "components/Home/BannerBlock/BannerBlock";
import Subscribe from "components/Subscribe";

const HomePage: React.FC = () => {
  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <BannerBlock />
        <CategorySlider />
        <Subscribe />
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default HomePage;
