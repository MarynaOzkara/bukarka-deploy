import { images } from "assets/images";
import PageLayout from "components/Layout/PageLayout";
import Subscribe from "components/Subscribe";
import {
  GridPageWrapper,
  Image,
  Label,
  LeftPart,
  SubscribeWrapperGrid,
} from "pages/CommonPages.styled";
import { RightPartClub, SubTitle, Text, Title } from "./BookClubPage.styled";

const BookClubPage: React.FC = () => {
  return (
    <PageLayout>
      <GridPageWrapper>
        <LeftPart>
          <Label>Book Club</Label>
          <Image src={images.BookClub} width="336" height="459" />
        </LeftPart>
        <RightPartClub>
          <Title>Ласкаво просимо до Book Club!</Title>
          <Text>
            Book Club - це програма лояльності, створена спеціально для наших
            покупців. Ми цінуємо вашу вірність, тому пропонуємо вам унікальні
            можливості та переваги.
          </Text>

          <SubTitle>Як це працює?</SubTitle>
          <Text>
            Дуже просто! Щоразу, коли ви робите покупку в нашому онлайн-магазині
            на суму від 100 грн, ви отримуєте бонусні бали. Ці бали
            накопичуються у вашому обліковому записі і можуть бути використані
            для оплати нових замовлень. Кожні витрачені 100 гривень принесуть
            один бонусний бал.
          </Text>

          <SubTitle>Що ви отримуєте?</SubTitle>
          <Text>
            Перш за все, ви маєте можливість замовляти та отримувати нові
            видання книг у першу чергу. Ваш статус у нашому клубі надає вам
            пріоритетний доступ до найсвіжіших та найбільш очікуваних книжок.
          </Text>
          <Text>
            Крім того, ви можете використовувати накопичені бонусні бали для
            оплати частини або повної вартості вашого замовлення. Це чудовий
            спосіб економити на вашій улюбленій літературі та відкривати для
            себе ще більше нових авторів та жанрів.
          </Text>

          <SubTitle>Як приєднатися?</SubTitle>
          <Text>
            Для того щоб приєднатися до книжкового клубу, достатньо
            зареєструватися на нашому сайті та здійснити першу покупку на суму
            від 100 грн. Після цього ви автоматично стаєте учасником програми
            лояльності та починаєте збирати бонусні бали.
          </Text>
          <Text>
            Не пропустіть можливість отримати ще більше задоволення від книг з
            Book Club! Реєструйтеся вже сьогодні та почніть насолоджуватися
            усіма перевагами нашої програми лояльності. Дякуємо за ваш вибір та
            довіру!
          </Text>
        </RightPartClub>
        <SubscribeWrapperGrid>
          <Subscribe />
        </SubscribeWrapperGrid>
      </GridPageWrapper>
    </PageLayout>
  );
};

export default BookClubPage;
