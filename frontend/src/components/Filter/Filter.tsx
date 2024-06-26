import { useBooks } from "components/Book";
import BookRating from "components/BookRating";
import { bookLanguages, bookTypes } from "constants/filter";
import { useEffect } from "react";
import { ButtonYellow, Input, TextCenter } from "styles/CommonStyled";

import {
  FilterContent,
  FilterWrapper,
  SectionTitle,
  SubTitle,
} from "./Filter.styled";
import { Category, Subcategory } from "types/Books";

const Filter: React.FC = () => {
  const {
    categories,
    fetchCategories,
    authors,
    fetchAuthors,
    publishers,
    fetchPublishers,
  } = useBooks();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  useEffect(() => {
    fetchPublishers();
  }, [fetchPublishers]);

  const handleClickMore = () => {};

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
                  <label htmlFor={type.value}> {type.label} </label>
                </p>
              ))}
          </div>
        </section>
        <section>
          <SubTitle>Тематика</SubTitle>
          <Input type="text" placeholder="Пошук за тематикою" />
          <>
            {categories &&
              categories.length > 0 &&
              categories.map((category: Category) => {
                return (
                  category.subcategories &&
                  category.subcategories.length > 0 &&
                  category.subcategories.map((subcategory: Subcategory) => {
                    return (
                      subcategory &&
                      subcategory.links &&
                      subcategory.links.length > 0 &&
                      subcategory.links.map((link, index) => (
                        <p key={index}>
                          <input
                            type="checkbox"
                            id={link}
                            name="subcategory"
                            value={link}
                          />
                          <label htmlFor={link}> {link} </label>
                        </p>
                      ))
                    );
                  })
                );
              })}
          </>
          <TextCenter className="more" onClick={handleClickMore}>
            Показати більше
          </TextCenter>
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

          {authors &&
            authors.length > 0 &&
            authors.map((author, index) => (
              <p key={index}>
                <input
                  type="checkbox"
                  id={author.author}
                  name="author"
                  value={author.author}
                />
                <label htmlFor="languages">{author.author}</label>
              </p>
            ))}

          <TextCenter className="more">Показати більше</TextCenter>
        </section>
        <section>
          <SubTitle>Видавництво</SubTitle>

          <Input type="text" placeholder="Пошук видавництва" />
          {publishers &&
            publishers.length > 0 &&
            publishers.map(
              (publisher, index) =>
                !!publisher.publisher && (
                  <p key={index}>
                    <input
                      type="checkbox"
                      id={publisher.publisher}
                      name="publisher"
                      value={publisher.publisher}
                    />
                    <label htmlFor="languages">{publisher.publisher}</label>
                  </p>
                )
            )}
          <TextCenter className="more">Показати більше</TextCenter>
        </section>
        <section>
          <SubTitle>Ціна</SubTitle>
          <div className="price-range">
            <Input className="input-range" type="text" placeholder="Від" />

            <Input className="input-range" type="text" placeholder="До" />
          </div>
        </section>
        <ButtonYellow>Застосувати фільтр</ButtonYellow>
      </FilterContent>
    </FilterWrapper>
  );
};

export default Filter;
