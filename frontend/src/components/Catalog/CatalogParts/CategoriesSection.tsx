import { Category, Subcategory } from "types/Books";
import { hasData } from "utils/hasData";
import { SubtitleLink } from "../Catalog.styled";
import SubcategoriesSection from "./SubcategoriesSection";

interface IProps {
  categories: Category[];
  closeModal: () => void;
}

const CategoriesSection: React.FC<IProps> = ({ categories, closeModal }) => {
  const hasCategories = hasData(categories);
  return (
    <>
      {hasCategories &&
        categories.map((category: Category, index) => (
          <div key={`category-${index}`}>
            <SubtitleLink
              to={`/catalog/${encodeURI(category.title)}`}
              key={`subtitle-${index}`}
              onClick={closeModal}
            >
              {category.title}
            </SubtitleLink>

            <SubcategoriesSection
              category={category.title}
              subcategories={category.subcategories}
              closeModal={closeModal}
            />
          </div>
        ))}
    </>
  );
};

export default CategoriesSection;
