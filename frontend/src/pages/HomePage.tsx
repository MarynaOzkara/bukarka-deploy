import { BannerBlock, CategorySlider } from "components/Home";
import Subscribe from "components/Subscribe";
import { PageWrapper, StyledCommonWrapper } from "styles/CommonStyled";
import { ContentWrapper } from "./CommonPages.styled";

const HomePage: React.FC = () => {
  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <ContentWrapper>
          <BannerBlock />
          <CategorySlider />
        </ContentWrapper>
        <Subscribe />
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default HomePage;
