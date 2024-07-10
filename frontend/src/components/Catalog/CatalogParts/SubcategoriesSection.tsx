import { Subcategory } from "types/Books";
import { SmallSubTitle, StyledBlock } from "../Catalog.styled";
import { hasData } from "utils/hasData";
import LinksSection from "./LinksSection";

interface IProps {
  category: string;
  subcategories: Subcategory[];
  closeModal: () => void;
}

const SubcategoriesSection: React.FC<IProps> = ({
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
                  to={`/catalog/${encodeURI(category)}/${encodeURI(
                    subcategory.title
                  )}`}
                  key={`subTitle-${subcatIndex}`}
                  onClick={closeModal}
                >
                  {subcategory.title}
                </SmallSubTitle>
              </StyledBlock>

              <LinksSection
                subcategory={subcategory.title}
                links={subcategory.links}
                closeModal={closeModal}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default SubcategoriesSection;
