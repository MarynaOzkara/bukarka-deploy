import { Input } from "styles/CommonStyled";
import { Category } from "types/Books";
import { SubTitle } from "../Filter.styled";
import ShowMore from "./ShowMore";

interface IProps {
  categories: Category[];
  selected: string[];
  onChange: (value: string) => void;
}

const flattenLinks = (categories: Category[]) => {
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

const CategoriesSection: React.FC<IProps> = ({
  categories,
  selected,
  onChange,
}) => {
  const linkOptions = flattenLinks(categories).links;
  const categoriesOptions = flattenLinks(categories).categoriesOptions;
  const ageOptions = flattenLinks(categories).ageOptions;
  const subcategoriesOptions = flattenLinks(categories).subcategoriesOptions;

  return (
    <>
      <section>
        <SubTitle>Тематика</SubTitle>
        <Input type="text" placeholder="Пошук за тематикою" />

        <ShowMore
          optionName="subcategories"
          options={linkOptions}
          onChange={onChange}
          selected={selected}
        />
      </section>

      <section>
        <SubTitle>Категорії</SubTitle>

        <ShowMore
          optionName="categories"
          options={categoriesOptions}
          onChange={onChange}
          selected={selected}
        />
      </section>

      <section>
        <SubTitle>Субкатегорії</SubTitle>

        <ShowMore
          optionName="subcategories"
          options={subcategoriesOptions}
          onChange={onChange}
          selected={selected}
        />
      </section>

      <section>
        <SubTitle>Век</SubTitle>
        {
          <ShowMore
            optionName="ages"
            options={ageOptions}
            onChange={onChange}
            selected={selected}
          />
        }
      </section>
    </>
  );
};

export default CategoriesSection;
