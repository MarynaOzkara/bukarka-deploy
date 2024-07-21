import { useState } from "react";
import { Category } from "types/Books";
import { SubTitle } from "../Filter.styled";
import FilterSearch from "./FilterSearch";
import ShowMore from "./ShowMore";
import { flattenCategory } from "constants/catalog";

interface IProps {
  categories: Category[];
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedAges: string[];
  onCategoryChange: (value: string[]) => void;
  onSubcategoryChange: (values: string[]) => void;
  onAgeChange: (values: string[]) => void;
  isDesktop?: boolean;
}

const CategoriesSection: React.FC<IProps> = ({
  categories,
  selectedCategories,
  selectedSubcategories,
  selectedAges,
  onCategoryChange,
  onSubcategoryChange,
  onAgeChange,
  isDesktop,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const linkOptions = flattenCategory(categories).links;
  const categoriesOptions = flattenCategory(categories).categoriesOptions;
  const ageOptions = flattenCategory(categories).ageOptions;
  const subcategoriesOptions = flattenCategory(categories).subcategoriesOptions;

  const handleSubcategoryChange = (value: string) => {
    onSubcategoryChange(
      selectedSubcategories.includes(value)
        ? selectedSubcategories.filter((v) => v !== value)
        : [...selectedSubcategories, value]
    );
  };

  const handleAgeChange = (value: string) => {
    onAgeChange(
      selectedAges.includes(value)
        ? selectedAges.filter((v) => v !== value)
        : [...selectedAges, value]
    );
  };

  const handleCategoryChange = (category: string) => {
    onCategoryChange(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleHintSelected = (value: string) => {
    handleSubcategoryChange(value);
  };

  return (
    <>
      <section>
        <SubTitle>Тематика</SubTitle>

        <FilterSearch
          placeholder="Пошук за тематикою"
          onHintSelected={handleHintSelected}
          hints={linkOptions}
        />

        <ShowMore
          options={linkOptions}
          onChange={handleSubcategoryChange}
          selected={selectedSubcategories}
        />
      </section>

      {isDesktop &&
        (isHidden ? (
          <button className="expand" onClick={toggleHidden}>
            Згорнути
          </button>
        ) : (
          <button className="expand" onClick={toggleHidden}>
            Розгорнути
          </button>
        ))}

      {isHidden && (
        <>
          <section>
            <SubTitle>Категорії</SubTitle>

            <ShowMore
              options={categoriesOptions}
              onChange={handleCategoryChange}
              selected={selectedCategories}
            />
          </section>

          <section>
            <SubTitle>Субкатегорії</SubTitle>

            <ShowMore
              options={subcategoriesOptions}
              onChange={handleSubcategoryChange}
              selected={selectedSubcategories}
            />
          </section>

          <section>
            <SubTitle>Вiк</SubTitle>
            {
              <ShowMore
                options={ageOptions}
                onChange={handleAgeChange}
                selected={selectedAges}
              />
            }
          </section>
        </>
      )}
    </>
  );
};

export default CategoriesSection;
