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

import { hasData } from "utils/hasData";
import AuthorsSection from "./filterParts/AuthorsSection";
import CategoriesSection from "./filterParts/CategoriesSection";
import PublishersSection from "./filterParts/PublishersSection";
import { adjustAgeValues } from "constants/catalog";

interface IProps {
  isDesktop?: boolean;
  onClose?: () => void;
}

const Filter: React.FC<IProps> = ({ isDesktop, onClose }) => {
  const { fetchFilterData, applyFilter } = useBooks();

  const [filterData, setFilterData] = useState<FilterData>({
    ages: [],
    authors: [],
    publishers: [],
    categories: [],
    price: { priceMin: 0, priceMax: 0 },
    rating: { ratingMin: 0, ratingMax: 0 },
    languages: [],
    subcategories: [],
  });

  const { authors, publishers, categories, price, languages, rating } =
    filterData;

  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<{
    ratingMin: number | undefined;
    ratingMax: number | undefined;
  }>({ ratingMin: 0, ratingMax: 5 });
  const [selectedPrice, setSelectedPrice] = useState<{
    priceMin: number;
    priceMax: number;
  }>({ priceMin: price.priceMin, priceMax: price.priceMax });
  const [selectedTypes, setSelectedTypes] = useState<{
    new: boolean | undefined;
    promotions: boolean | undefined;
    bestsellers: boolean | undefined;
  }>({
    new: undefined,
    promotions: undefined,
    bestsellers: undefined,
  });

  const [priceTouched, setPriceTouched] = useState<{
    min: boolean;
    max: boolean;
  }>({ min: false, max: false });

  const hasCategories = hasData(categories);
  const hasLanguages = hasData(languages);
  const hasAuthors = hasData(authors);
  const hasPublishers = hasData(publishers);

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

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  };

  const handleRatingChange = (newRatingMin?: number, newRatingMax?: number) => {
    setSelectedRating((prevRating) => ({
      ratingMin:
        newRatingMin !== undefined ? newRatingMin : prevRating.ratingMin,
      ratingMax:
        newRatingMax !== undefined ? newRatingMax : prevRating.ratingMax,
    }));
  };

  const handleMinRatingChange = (newRatingMin: number) => {
    console.log(selectedRating.ratingMin);
    if (!!selectedRating.ratingMax && newRatingMin > selectedRating.ratingMax) {
      newRatingMin = rating.ratingMax;
    }
    handleRatingChange(newRatingMin, undefined);
  };

  const handleMaxRatingChange = (newRatingMax: number) => {
    console.log(selectedRating.ratingMax);
    if (!!selectedRating.ratingMin && newRatingMax < selectedRating.ratingMin) {
      newRatingMax = rating.ratingMin;
    }
    handleRatingChange(undefined, newRatingMax);
  };

  const handlePriceChange = (min: number, max: number) => {
    if (min > max) max = min;
    setSelectedPrice({
      priceMin: min,
      priceMax: max,
    });
  };

  const handleSubmitFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalPriceMin = priceTouched.min
      ? selectedPrice.priceMin
      : price.priceMin;
    const finalPriceMax = priceTouched.max
      ? selectedPrice.priceMax
      : price.priceMax;

    const filterQuery = {
      new: selectedTypes.new,
      promotions: selectedTypes.promotions,
      bestsellers: selectedTypes.bestsellers,
      categories: selectedCategories,
      languages: selectedLanguages,
      authors: selectedAuthors,
      publishers: selectedPublishers,
      ratingMin: selectedRating.ratingMin,
      ratingMax: selectedRating.ratingMax,
      priceMin: finalPriceMin,
      priceMax: finalPriceMax,
      ages: adjustAgeValues(selectedAges),
      subcategories: selectedSubcategories,
    };

    applyFilter(filterQuery);
  };

  return (
    <FilterWrapper>
      {isDesktop && <SectionTitle>Фильтр</SectionTitle>}
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

        {hasCategories && (
          <CategoriesSection
            isDesktop={isDesktop}
            categories={categories}
            selectedCategories={selectedCategories}
            selectedSubcategories={selectedSubcategories}
            selectedAges={selectedAges}
            onCategoryChange={setSelectedCategories}
            onSubcategoryChange={setSelectedSubcategories}
            onAgeChange={setSelectedAges}
          />
        )}

        <section>
          <SubTitle>Мова</SubTitle>
          <div>
            {hasLanguages &&
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
                rating={selectedRating.ratingMin}
                onChange={handleMinRatingChange}
                editable={true}
              />
            </div>
            <div>
              <span>До</span>

              <BookRating
                rating={selectedRating.ratingMax}
                onChange={handleMaxRatingChange}
                editable={true}
              />
            </div>
          </div>
        </section>

        {hasAuthors && (
          <AuthorsSection
            authors={authors}
            selectedAuthors={selectedAuthors}
            onAuthorsChange={setSelectedAuthors}
          />
        )}

        {hasPublishers && (
          <PublishersSection
            publishers={publishers}
            selectedPublishers={selectedPublishers}
            onPublishersChange={setSelectedPublishers}
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
              min={price.priceMin}
              max={price.priceMax}
              placeholder="Від"
              value={priceTouched.min ? selectedPrice.priceMin : ""}
              onChange={(e) => {
                setPriceTouched((prev) => ({ ...prev, min: true }));
                handlePriceChange(
                  parseInt(e.target.value) || price.priceMin,
                  selectedPrice.priceMax
                );
              }}
            />

            <PriceRangeInput
              className="input-range"
              type="number"
              step="10"
              pattern="^[0-9]*$"
              min={price.priceMin}
              max={price.priceMax}
              placeholder="До"
              value={priceTouched.max ? selectedPrice.priceMax : ""}
              onChange={(e) => {
                setPriceTouched((prev) => ({ ...prev, max: true }));
                handlePriceChange(
                  selectedPrice.priceMin,
                  parseInt(e.target.value) || price.priceMax
                );
              }}
            />
          </div>
        </section>

        <ButtonYellow onClick={onClose}>Застосувати фільтр</ButtonYellow>
      </FilterContent>
    </FilterWrapper>
  );
};

export default Filter;
