import { BannerBlock, CategorySlider } from "components/Home";
import Subscribe from "components/Subscribe";
import { PageWrapper, StyledCommonWrapper } from "styles/CommonStyled";

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
