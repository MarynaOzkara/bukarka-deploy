import { useBooks } from "components/Book";
import BookRating from "components/BookRating";
import { bookTypes } from "constants/filter";
import { useCallback, useEffect, useState } from "react";
import { ButtonYellow } from "styles/CommonStyled";

import { FilterData } from "types/Filter";
import {
  FilterContent,
  FilterWrapper,
  PriceRangeInput,
  SectionTitle,
  SubTitle,
} from "./Filter.styled";
import PublishersSection from "./PublishersSection";
import AuthorsSection from "./filterParts/AuthorsSection";
import CategoriesSection from "./filterParts/CategoriesSection";

const Filter: React.FC = () => {
  const { fetchFilterData } = useBooks();

  const [filterData, setFilterData] = useState<FilterData>({
    authors: [],
    publishers: [],
    categories: [],
    price: { minPrice: 0, maxPrice: 0 },
    rating: { minRating: 0, maxRating: 0 },
    languages: [],
  });

  const { authors, publishers, categories, price, rating, languages } =
    filterData;

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchFilterData();
      setFilterData(data);
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
            {languages.length &&
              languages.map(({ language }, index) => (
                <p key={index}>
                  <input
                    type="checkbox"
                    id={language}
                    name="language"
                    value={language}
                  />
                  <label htmlFor={language}>{language}</label>
                </p>
              ))}
          </div>
        </section>
        <section>
          <SubTitle>Рейтинг</SubTitle>
          <div className="rating-range">
            <div>
              <span>Від</span>

              {rating.minRating && (
                <BookRating rating={rating.minRating || 0} />
              )}
            </div>
            <div>
              <span>До</span>
              {rating.maxRating && (
                <BookRating rating={rating.maxRating || 5} />
              )}
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
