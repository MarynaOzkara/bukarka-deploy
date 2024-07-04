import { useState } from "react";
import { Input } from "styles/CommonStyled";
import { Category } from "types/Books";
import { SubTitle } from "../Filter.styled";
import ShowMore from "./ShowMore";
import Search from "components/Search";
import FilterSearch from "./FilterSearch";

const flattenCategory = (categories: Category[]) => {
  const links: string[] = [];
  const ageOptions: string[] = [];
  const subcategoriesOptions: string[] = [];
  const categoriesOptions: string[] = [];

  categories &&
    categories.forEach((category) => {
      categoriesOptions.push(category.title);
      category.subcategories &&
        category.subcategories.forEach((subcategory) => {
          subcategoriesOptions.push(subcategory.title);
          if (
            subcategory.title !== "Книги за віком" &&
            subcategory.links.length > 0
          ) {
            links.push(...subcategory.links);
          }

          if (
            subcategory.title === "Книги за віком" &&
            subcategory.links.length > 0
          ) {
            ageOptions.push(...subcategory.links);
          }
        });
    });

  return { links, ageOptions, subcategoriesOptions, categoriesOptions };
};

interface IProps {
  categories: Category[];
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedAges: string[];
  onCategoryChange: (value: string[]) => void;
  onSubcategoryChange: (values: string[]) => void;
  onAgeChange: (values: string[]) => void;
}

const CategoriesSection: React.FC<IProps> = ({
  categories,
  selectedCategories,
  selectedSubcategories,
  selectedAges,
  onCategoryChange,
  onSubcategoryChange,
  onAgeChange,
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

  return (
    <>
      <section>
        <SubTitle>Тематика</SubTitle>

        <FilterSearch placeholder="Пошук за тематикою" />

        <ShowMore
          options={linkOptions}
          onChange={handleSubcategoryChange}
          selected={selectedSubcategories}
        />
      </section>

      {isHidden ? (
        <button className="expand" onClick={toggleHidden}>
          Згорнути
        </button>
      ) : (
        <button className="expand" onClick={toggleHidden}>
          Розгорнути
        </button>
      )}

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
            <SubTitle>Век</SubTitle>
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
