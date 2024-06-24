import { useEffect, useState } from "react";
import { images } from "assets/images";
import { PageWrapper, StyledCommonWrapper } from "styles/CommonStyled";
import {
  Image,
  Main,
  NotFoundInfo,
  StyledLink,
  Text,
  Title,
} from "./NotFoundPage.styled";

const NotFoundPage: React.FC = () => {
  const [isFirstIcon, setIsFirstIcon] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstIcon((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Main>
          <NotFoundInfo>
            <Title>Сторінка не знайдена.</Title>
            <Text>
              Спробуйте знайти потрібний вам товар за допомогою рядка пошука або
              в каталозі. Ви також можете зв’язатися з нами на сторінці Контакти
              і зворотний зв’язок.
            </Text>

            <StyledLink to="/">Головна</StyledLink>
            <StyledLink to="/contacts">Контакти</StyledLink>
          </NotFoundInfo>
          <Image
            src={isFirstIcon ? images.NotFoundImage1 : images.NotFoundImage2}
            alt="Букарка - онлайн-книгарня. Сторінка не знайдена"
          />
        </Main>
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default NotFoundPage;
