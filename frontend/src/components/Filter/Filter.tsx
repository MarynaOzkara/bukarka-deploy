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

import AuthorsSection from "./filterParts/AuthorsSection";
import CategoriesSection from "./filterParts/CategoriesSection";
import PublishersSection from "./filterParts/PublishersSection";

const Filter: React.FC = () => {
  const { fetchFilterData, applyFilter } = useBooks();

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

  const [selectedTypes, setSelectedTypes] = useState<{
    new: boolean;
    promotions: boolean;
    bestsellers: boolean;
  }>({
    new: false,
    promotions: false,
    bestsellers: false,
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<{
    minRating: number;
    maxRating: number;
  }>({ minRating: 0, maxRating: 5 });
  const [selectedPrice, setSelectedPrice] = useState<{
    minPrice: number;
    maxPrice: number;
  }>({ minPrice: 0, maxPrice: 0 });

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

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  const handlePublisherChange = (publisher: string) => {
    setSelectedPublishers((prev) =>
      prev.includes(publisher)
        ? prev.filter((p) => p !== publisher)
        : [...prev, publisher]
    );
  };

  const handleRatingChange = (min: number, max: number) => {
    setSelectedRating({ minRating: min, maxRating: max });
  };

  const handlePriceChange = (min: number, max: number) => {
    if (min && max && min > max) min = max;

    setSelectedPrice({
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleSubmitFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterQuery = {
      new: selectedTypes.new,
      promotions: selectedTypes.promotions,
      bestsellers: selectedTypes.bestsellers,
      categories: selectedCategories,
      languages: selectedLanguages,
      authors: selectedAuthors,
      publishers: selectedPublishers,
      rating: selectedRating,
      price: selectedPrice,
    };

    applyFilter(filterQuery);
  };

  return (
    <FilterWrapper>
      <SectionTitle>Фильтр</SectionTitle>
      <FilterContent onSubmit={handleSubmitFilters}>
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
                    checked={
                      selectedTypes[type.value as keyof typeof selectedTypes]
                    }
                    onChange={() => handleTypeChange(type.value)}
                  />
                  <label htmlFor={type.value}> {type.label} </label>
                </p>
              ))}
          </div>
        </section>
        {categories && categories.length > 0 && (
          <CategoriesSection
            categories={categories}
            selected={selectedCategories}
            onChange={handleCategoryChange}
          />
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
                    onChange={() => handleLanguageChange(language)}
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

              <BookRating
                rating={selectedRating.minRating || rating.minRating}
                onChange={(rating) =>
                  handleRatingChange(rating, selectedRating.maxRating)
                }
              />
            </div>
            <div>
              <span>До</span>

              <BookRating
                rating={selectedRating.maxRating || rating.maxRating}
                onChange={(rating) =>
                  handleRatingChange(selectedRating.minRating, rating)
                }
              />
            </div>
          </div>
        </section>
        {authors && authors.length > 0 && (
          <AuthorsSection
            authors={authors}
            selected={selectedAuthors}
            onChange={handleAuthorChange}
          />
        )}

        {publishers && publishers.length > 0 && (
          <PublishersSection
            publishers={publishers}
            selected={selectedPublishers}
            onChange={handlePublisherChange}
          />
        )}
        <section>
          <SubTitle>Ціна</SubTitle>
          <div className="price-range">
            <PriceRangeInput
              className="input-range"
              type="number"
              step="10"
              pattern="^[0-9]*$"
              min={price.minPrice}
              max={price.maxPrice}
              placeholder="Від"
              value={selectedPrice.minPrice || ""}
              onChange={(e) =>
                handlePriceChange(
                  parseInt(e.target.value) || price.minPrice,
                  selectedPrice.maxPrice
                )
              }
            />

            <PriceRangeInput
              className="input-range"
              type="number"
              step="10"
              pattern="^[0-9]*$"
              min={price.minPrice}
              max={price.maxPrice}
              placeholder="До"
              value={selectedPrice.maxPrice || ""}
              onChange={(e) =>
                handlePriceChange(
                  selectedPrice.minPrice,
                  parseInt(e.target.value) || price.maxPrice
                )
              }
            />
          </div>
        </section>
        <ButtonYellow>Застосувати фільтр</ButtonYellow>
      </FilterContent>
    </FilterWrapper>
  );
};

export default Filter;
