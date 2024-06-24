import { ButtonYellow, Input } from "styles/CommonStyled";
import {
  FilterContent,
  FilterWrapper,
  SectionTitle,
  SubTitle,
} from "./Filter.styled";
import BookRating from "components/BookRating";
import { bookLanguages, bookTypes } from "constants/filter";

const Filter = () => {
  return (
    <FilterWrapper>
      <SectionTitle>Фильтр</SectionTitle>
      <FilterContent>
        <section>
          <SubTitle>Добірка</SubTitle>
          <div>
            {bookTypes &&
              bookTypes.map((type, index) => (
                <p key={index}>
                  <input
                    type="checkbox"
                    id={type.value}
                    name="type"
                    value={type.value}
                  />
                  <label htmlFor="new"> {type.label} </label>
                </p>
              ))}
          </div>
        </section>
        <section>
          <SubTitle>Тематика</SubTitle>

          <Input type="text" placeholder="Пошук за тематикою" />
        </section>
        <section>
          <SubTitle>Мова</SubTitle>
          <div>
            {bookLanguages &&
              bookLanguages.map((lang, index) => (
                <p key={index}>
                  <input
                    type="checkbox"
                    id={lang}
                    name="language"
                    value={lang}
                  />
                  <label htmlFor="languages">{lang}</label>
                </p>
              ))}
          </div>
        </section>
        <section>
          <SubTitle>Рейтинг</SubTitle>
          <div className="rating-range">
            <div>
              <span>Від</span>

              <BookRating rating={0} />
            </div>
            <div>
              <span>До</span>
              <BookRating rating={5} />
            </div>
          </div>
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
