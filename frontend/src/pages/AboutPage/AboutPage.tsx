import SocialList from "components/SocialList";
import Subscribe from "components/Subscribe";
import { images } from "assets/images";
import { StyledCommonWrapper } from "styles/CommonStyled";
import {
  GridPageWrapper,
  Image,
  Label,
  LeftPart,
  RightPart,
  SubscribeWrapperGrid,
} from "pages/CommonPages.styled";
import { Description, Socials, SubTitle, Title } from "./AboutPage.styled";

const AboutPage: React.FC = () => {
  return (
    <StyledCommonWrapper>
      <GridPageWrapper>
        <LeftPart>
          <Label>Про магазин</Label>
          <Image src={images.AboutImage} width="336" height="459" />
        </LeftPart>
        <RightPart>
          <Title>Букарка</Title>
          <SubTitle>онлайн-книгарня</SubTitle>
          <Description>
            <p>
              Ласкаво просимо до нашого книжкового онлайн-магазину, де ми
              пропонуємо широкий вибір книг на будь-який смак і інтерес.
              Заснований сім'єю з Києва в 2024 році, наш магазин вже став
              надійним джерелом якісної літератури для читачів у всій країні.
            </p>
            <p>
              Наші цінності - це кращий сервіс і швидкість обслуговування. Ми
              розуміємо, наскільки важливо для вас отримати замовлення швидко і
              безпечно, тому ми докладаємо всіх зусиль, щоб забезпечити
              оперативну доставку книг до ваших дверей. Наша команда завжди
              готова вам допомогти з будь-якими питаннями або запитами, щоб
              зробити ваше перебування в нашому магазині максимально комфортним.
            </p>
            <p>
              У нас ви знайдете книги на будь-яку тематику - від класики до
              сучасної літератури, від наукових праць до художніх романів, від
              дитячої літератури до науково-популярних видань. Ми працюємо з
              найкращими видавництвами та авторами, щоб забезпечити вам доступ
              до найактуальніших та найцікавіших видань.
            </p>
            <p>
              У нашому магазині ви також знайдете різноманітні акції та знижки,
              які дозволять вам економити при покупці улюблених книг. Ми завжди
              прагнемо зробити ваше перебування в нашому магазині приємним та
              корисним досвідом.
            </p>
            <p>
              Не сумнівайтеся - вибирайте найкращі книги від нас, і ми
              гарантуємо вам високу якість обслуговування та задоволення від
              покупки. Дякуємо, що обрали нас!
            </p>
          </Description>
          <Socials>
            <span>Ми в соцмережах</span>
            <SocialList />
          </Socials>
        </RightPart>
        <SubscribeWrapperGrid>
          <Subscribe />
        </SubscribeWrapperGrid>
      </GridPageWrapper>
    </StyledCommonWrapper>
  );
};

export default AboutPage;
