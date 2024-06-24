import { ButtonYellow, Input } from "styles/CommonStyled";
import {
  FilterContent,
  FilterWrapper,
  SectionTitle,
  SubTitle,
} from "./Filter.styled";

const Filter = () => {
  return (
    <FilterWrapper>
      <SectionTitle>Фильтр</SectionTitle>
      <FilterContent>
        <section>
          <SubTitle>Добірка</SubTitle>
        </section>
        <section>
          <SubTitle>Тематика</SubTitle>

          <Input type="text" placeholder="Пошук за тематикою" />
        </section>
        <section>
          <SubTitle>Мова</SubTitle>
        </section>
        <section>
          <SubTitle>Рейтинг</SubTitle>
        </section>
        <section>
          <SubTitle>Автор</SubTitle>

          <Input type="text" placeholder="Пошук автора" />
        </section>
        <section>
          <SubTitle>Видавництво</SubTitle>

          <Input type="text" placeholder="Пошук видавництва" />
        </section>
        <section>
          <SubTitle>Ціна</SubTitle>
          <div className="price-range">
            <Input className="input-range" type="text" placeholder="Від" />
            <span> </span>

            <Input className="input-range" type="text" placeholder="До" />
          </div>
        </section>
        <ButtonYellow>Застосувати фільтр</ButtonYellow>
      </FilterContent>
    </FilterWrapper>
  );
};

export default Filter;
