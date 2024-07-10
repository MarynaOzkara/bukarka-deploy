import { Subcategory } from "types/Books";
import { SmallSubTitle, StyledBlock } from "../Catalog.styled";
import { hasData } from "utils/hasData";
import LinksSection from "./LinksSection";
import { useEffect, useState } from "react";
import { breakpoints } from "constants/breakpoints";

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

  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= parseInt(breakpoints.tablet)
  );

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= parseInt(breakpoints.tablet));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ul>
      {hasSubcategories &&
        subcategories.map((subcategory: Subcategory, subcatIndex: number) => {
          const hasLinks = hasData(subcategory.links);
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
                {!isDesktop && hasLinks && (
                  <button className="show-more-button">+</button>
                )}
              </StyledBlock>

              {isDesktop && (
                <LinksSection
                  category={category}
                  subcategory={subcategory.title}
                  links={subcategory.links}
                  closeModal={closeModal}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default SubcategoriesSection;
