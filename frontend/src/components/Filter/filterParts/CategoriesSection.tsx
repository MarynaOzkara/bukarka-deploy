import { Input } from "styles/CommonStyled";
import { Category } from "types/Books";
import { SubTitle } from "../Filter.styled";
import ShowMore from "./ShowMore";

interface IProps {
  categories: Category[];
  selected: string[];
  onChange: (value: string) => void;
}

const flattenLinks = (categories: Category[]): string[] => {
  const links: string[] = [];

  categories &&
    categories.forEach((category) => {
      category.subcategories &&
        category.subcategories.forEach((subcategory) => {
          if (subcategory.links.length > 0) {
            links.push(...subcategory.links);
          }
        });
    });

  return links;
};

const CategoriesSection: React.FC<IProps> = ({
  categories,
  selected,
  onChange,
}) => {
  const linkOptions = flattenLinks(categories);
  const categoriesOptions = categories.map((cat) => cat.title);

  return (
    <>
      <section>
        <SubTitle>Век</SubTitle>
        {}
      </section>
      <section>
        <SubTitle>Тематика</SubTitle>
        <Input type="text" placeholder="Пошук за тематикою" />

        <ShowMore
          options={linkOptions}
          onChange={onChange}
          selected={selected}
        />
      </section>

      <section>
        <SubTitle>Категории</SubTitle>

        <ShowMore
          options={categoriesOptions}
          onChange={onChange}
          selected={selected}
        />
      </section>
    </>
  );
};

export default CategoriesSection;
