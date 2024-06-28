import { useBooks } from "components/Book";
import BookRating from "components/BookRating";
import { bookLanguages, bookTypes } from "constants/filter";
import { useCallback, useEffect, useState } from "react";
import { ButtonYellow } from "styles/CommonStyled";

import { Author, Category, Publisher } from "types/Books";
import AuthorsSection from "./filterParts/AuthorsSection";
import CategoriesSection from "./filterParts/CategoriesSection";
import {
  FilterContent,
  FilterWrapper,
  PriceRangeInput,
  SectionTitle,
  SubTitle,
} from "./Filter.styled";
import PublishersSection from "./PublishersSection";

const Filter: React.FC = () => {
  const { fetchFilterData } = useBooks();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [price, setPrice] = useState({ minPrice: 0, maxPrice: 0 });

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchFilterData();
      setAuthors(data.authors);
      setPublishers(data.publishers);
      setCategories(data.categories);
      setPrice(data.price);
    } catch (error) {
      console.error("Error fetching filter data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        {categories && categories.length > 0 && (
          <CategoriesSection categories={categories} />
        )}
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
                  <label htmlFor={lang}>{lang}</label>
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
        {authors && authors.length > 0 && <AuthorsSection authors={authors} />}

        {publishers && publishers.length > 0 && (
          <PublishersSection publishers={publishers} />
        )}
        <section>
          <SubTitle>Ціна</SubTitle>
          <div className="price-range">
            <PriceRangeInput
              className="input-range"
              type="number"
              min={price.minPrice}
              max={price.maxPrice}
              placeholder="Від"
            />

            <PriceRangeInput
              className="input-range"
              type="number"
              min={price.minPrice}
              max={price.maxPrice}
              placeholder="До"
            />
          </div>
        </section>
        <ButtonYellow>Застосувати фільтр</ButtonYellow>
      </FilterContent>
    </FilterWrapper>
  );
};

export default Filter;
