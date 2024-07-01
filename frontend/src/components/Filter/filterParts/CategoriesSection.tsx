import { useState } from "react";
import { Input, TextCenter } from "styles/CommonStyled";
import { Category } from "types/Books";
import { SubTitle } from "../Filter.styled";

interface IProps {
  categories: Category[];
  selected?: string[];
  onChange?: (value: string) => void;
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

const CategoriesSection: React.FC<IProps> = ({ categories }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const options = flattenLinks(categories);

  const handleToggleShow = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
  };

  const visibleLinks = options.slice(0, visibleCount);

  return (
    <section>
      <SubTitle>Тематика</SubTitle>
      <Input type="text" placeholder="Пошук за тематикою" />
      <>
        {visibleLinks &&
          visibleLinks.length > 0 &&
          visibleLinks.map((link, index) => (
            <p key={index}>
              <input
                type="checkbox"
                id={link}
                name="subcategory"
                value={link}
              />
              <label htmlFor={link}> {link} </label>
            </p>
          ))}
      </>
      {visibleCount < options.length ? (
        <TextCenter className="more" onClick={handleToggleShow}>
          Показати більше
        </TextCenter>
      ) : (
        <TextCenter className="more" onClick={handleShowLess}>
          Показати менше
        </TextCenter>
      )}
    </section>
  );
};

export default CategoriesSection;
