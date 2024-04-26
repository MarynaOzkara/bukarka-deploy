import { StyledCommonWrapper } from "styles/CommonStyled";

import {
  AboutDelivery,
  AccentText,
  Delivery,
  DeliveryInfoWrapper,
  DeliveryPageWrapper,
  Description,
  HiddenSubTitle,
  HiddenTitle,
  Label,
  Line,
  Payment,
  Return,
  ReturnDescription,
  ShiftRight,
  SmallSubTitle,
  SubTitle,
  WarningText,
  WarningTitle,
  Wrapper,
} from "./DeliveryPage.styled";
import Subscribe from "components/Subscribe";

const DeliveryPage: React.FC = () => {
  return (
    <StyledCommonWrapper>
      <DeliveryPageWrapper>
        <Label>Доставка, оплата і повернення</Label>
        <DeliveryInfoWrapper>
          <AboutDelivery>
            <HiddenTitle>Умови доставки оплати і повернення</HiddenTitle>
            <AccentText>
              Доставка замовлень на суму 500 грн та вище &mdash; безкоштовна!
            </AccentText>

            <SubTitle>Доставка</SubTitle>
            <HiddenSubTitle>Способи отримання замовлення</HiddenSubTitle>

            <Delivery>
              <li>
                <h4>Самовивіз з відділення Укрпошти</h4>
              </li>
              <li>
                <h4>Самовивіз з відділення Нової Пошти</h4>
              </li>
              <li>
                <h4>Самовивіз з поштомату Нової Пошти</h4>
              </li>
              <li>
                <h4>Доставка кур'єром Нової Пошти</h4>
              </li>
            </Delivery>

            <Line />

            <SubTitle>Оплата</SubTitle>
            <HiddenSubTitle>
              способи оплати при різних методах доставки
            </HiddenSubTitle>

            <Payment>
              <li>
                <h4>Онлайн оплата карткою</h4>
              </li>
              <li>
                <h4>Післяплата</h4>
              </li>
              <li>
                <h4>За реквізитами</h4>
              </li>
            </Payment>

            <WarningTitle>Зверніть увагу:</WarningTitle>
            <WarningText>
              При доставці у відділення Укрпошти, Нової Пошти та кур’єром Нової
              Пошти вам будуть доступні всі способи оплати.
            </WarningText>
            <WarningText>
              При доставці у поштомат Нової Пошти доступна онлайн оплата
              карткою.{" "}
            </WarningText>

            <Line />

            <SubTitle>Повернення</SubTitle>

            <Description>
              Ми розуміємо, що іноді можуть виникати ситуації, коли вам потрібно
              повернути придбаний товар. У нашому книжковому онлайн магазині ми
              пропонуємо прості та прозорі умови повернення товару, щоб зробити
              цей процес максимально зручним для вас.
            </Description>

            <ShiftRight>
              <SmallSubTitle>Основні умови</SmallSubTitle>
              <Return>
                <li>
                  <h4>Повернення протягом 14 днів</h4>
                  <p>
                    Ви маєте право повернути товар в належному вигляді протягом
                    14 днів з моменту його отримання без зазначення причини
                    повернення.
                  </p>
                </li>
                <li>
                  <h4>
                    Товар повинен бути в стані, придатному для повторного
                    продажу:
                  </h4>
                  <p>
                    Для повернення товар повинен бути без пошкоджень та слідів
                    використання.
                  </p>
                </li>
                <li>
                  <h4>Вартість повернення</h4>
                  <p>
                    Покупець сплачує вартість повернення, якщо причина
                    повернення не пов'язана з дефектами товару.
                  </p>
                </li>
              </Return>
            </ShiftRight>
            <ShiftRight>
              <SmallSubTitle>Процес повернення</SmallSubTitle>
              <Return>
                <li>
                  <h4>Зв'яжіться з нами:</h4>
                  <p>
                    Перш ніж повертати товар, будь ласка, зв'яжіться з нашим
                    сервісним центром для отримання інструкцій.
                  </p>
                </li>
                <li>
                  <h4>Підготуйте товар:</h4>
                  <p>
                    Перед відправленням товару нам переконайтеся, що він
                    відповідає умовам повернення.
                  </p>
                </li>
                <li>
                  <h4>Повернення коштів:</h4>
                  <p>
                    Після отримання та перевірки поверненого товару ми повернемо
                    кошти на рахунок, з якого була здійснена оплата, протягом
                    3-х банківських днів.
                  </p>
                </li>
              </Return>
            </ShiftRight>
            <ReturnDescription>
              Ми цінуємо кожного нашого клієнта і робимо все можливе, щоб
              забезпечити вам приємний досвід покупок у нашому магазині. Якщо у
              вас виникли будь-які питання щодо повернення товару, будь ласка,
              зв'яжіться з нашою службою підтримки, і ми з радістю вам
              допоможемо.
            </ReturnDescription>
          </AboutDelivery>
        </DeliveryInfoWrapper>

        <Wrapper>
          <Subscribe />
        </Wrapper>
      </DeliveryPageWrapper>
    </StyledCommonWrapper>
  );
};

export default DeliveryPage;
