import { useState } from "react";
import { Category, Subcategory } from "types/Books";
import { hasData } from "utils/hasData";
import { SubtitleLink } from "../Catalog.styled";
import SeparateCategory from "./SeparateCategory";
import SubcategoriesSection from "./SubcategoriesSection";

interface IProps {
  categories: Category[];
  closeModal: () => void;
}

const CategoriesSection: React.FC<IProps> = ({ categories, closeModal }) => {
  const hasCategories = hasData(categories);

  const [expandedCategory, setExpandedCategory] = useState<Category | null>(
    null
  );
  const [modalContent, setModalContent] = useState<Subcategory | null>(null);

  const showModal = (content: Subcategory, category: Category) => {
    setModalContent(content);
    setExpandedCategory(category);
  };

  const closeInnerModal = () => {
    setModalContent(null);
    setExpandedCategory(null);
  };

  return (
    <div>
      {!modalContent &&
        hasCategories &&
        categories.map((category: Category, index) => (
          <div key={`category-${index}`}>
            <SubtitleLink
              to={`/catalog/${encodeURIComponent(category.title)}`}
              key={`subtitle-${index}`}
              onClick={closeModal}
            >
              {category.title}
            </SubtitleLink>

            <SubcategoriesSection
              category={category.title}
              subcategories={category.subcategories}
              showModal={(content: Subcategory) => showModal(content, category)}
              closeModal={closeInnerModal}
            />
          </div>
        ))}

      {modalContent && (
        <SeparateCategory
          category={expandedCategory?.title || ""}
          subcategory={modalContent.title}
          links={modalContent.links}
          closeModal={closeInnerModal}
        />
      )}
    </div>
  );
};

export default CategoriesSection;
