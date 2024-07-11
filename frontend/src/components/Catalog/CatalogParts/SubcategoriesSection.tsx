import { Subcategory } from "types/Books";
import { hasData } from "utils/hasData";
import { SmallSubTitle, StyledBlock } from "../Catalog.styled";
import LinksSection from "./LinksSection";

interface IProps {
  category: string;
  subcategories: Subcategory[];

  closeModal: () => void;
}

const MobileSubcategoriesSection: React.FC<IProps> = ({
  category,
  subcategories,
  closeModal,
}) => {
  const hasSubcategories = hasData(subcategories);

  return (
    <ul>
      {hasSubcategories &&
        subcategories.map((subcategory: Subcategory, subcatIndex: number) => {
          return (
            <li key={subcatIndex}>
              <StyledBlock>
                <SmallSubTitle
                  to={`/catalog/${encodeURIComponent(
                    category
                  )}/${encodeURIComponent(subcategory.title)}`}
                  key={`subTitle-${subcatIndex}`}
                  onClick={closeModal}
                >
                  {subcategory.title}
                </SmallSubTitle>
              </StyledBlock>

              <LinksSection
                category={category}
                subcategory={subcategory.title}
                links={subcategory.links}
                closeParentModal={closeModal}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default MobileSubcategoriesSection;
