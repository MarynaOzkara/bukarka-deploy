import { useState } from "react";
import { Category, Subcategory } from "types/Books";
import { hasData } from "utils/hasData";
import { SubtitleLink } from "../../Catalog.styled";
import SeparateCategory from "./SeparateCategory";
import MobileSubcategoriesSection from "./MobileSubcategoriesSection";

interface IProps {
  categories: Category[];
  closeModal: () => void;
  closeParentModal: () => void;
}

const MobileCategoriesSection: React.FC<IProps> = ({
  categories,
  closeModal,
  closeParentModal,
}) => {
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

            <MobileSubcategoriesSection
              category={category.title}
              subcategories={category.subcategories}
              showModal={(content: Subcategory) => showModal(content, category)}
              closeModal={closeInnerModal}
              closeParentModal={closeParentModal}
            />
          </div>
        ))}

      {modalContent && (
        <SeparateCategory
          category={expandedCategory?.title || ""}
          subcategory={modalContent.title}
          links={modalContent.links}
          closeModal={closeInnerModal}
          closeParentModal={closeParentModal}
        />
      )}
    </div>
  );
};

export default MobileCategoriesSection;
