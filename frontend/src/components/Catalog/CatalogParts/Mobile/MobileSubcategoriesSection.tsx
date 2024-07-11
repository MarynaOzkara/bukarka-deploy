import { breakpoints } from "constants/breakpoints";
import { useEffect, useState } from "react";
import { Subcategory } from "types/Books";
import { hasData } from "utils/hasData";
import { SmallSubTitle, StyledBlock } from "../../Catalog.styled";
import LinksSection from "../LinksSection";

interface IProps {
  category: string;
  subcategories: Subcategory[];
  showModal: (content: Subcategory) => void;
  closeModal: () => void;
  closeParentModal: () => void;
}

const MobileSubcategoriesSection: React.FC<IProps> = ({
  category,
  subcategories,
  showModal,
  closeModal,
  closeParentModal,
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
                  onClick={closeParentModal}
                >
                  {subcategory.title}
                </SmallSubTitle>

                {!isDesktop && hasLinks && (
                  <button
                    className="show-more-button"
                    onClick={() => showModal(subcategory)}
                  >
                    +
                  </button>
                )}
              </StyledBlock>

              {isDesktop && (
                <LinksSection
                  category={category}
                  subcategory={subcategory.title}
                  links={subcategory.links}
                  closeModal={closeModal}
                  closeParentModal={closeParentModal}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default MobileSubcategoriesSection;
