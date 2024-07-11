import { breakpoints } from "constants/breakpoints";
import { useEffect, useState } from "react";
import { Subcategory } from "types/Books";
import { hasData } from "utils/hasData";
import { SmallSubTitle, StyledBlock } from "../Catalog.styled";
import LinksSection from "./LinksSection";

interface IProps {
  category: string;
  subcategories: Subcategory[];
}

const SubcategoriesSection: React.FC<IProps> = ({
  category,
  subcategories,
}) => {
  const hasSubcategories = hasData(subcategories);

  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= parseInt(breakpoints.tablet)
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<Subcategory | null>(null);

  const showModal = (content: Subcategory) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

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

          if (isModalOpen && modalContent !== subcategory) {
            return null;
          }

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
                />
              )}

              {!isDesktop && isModalOpen && modalContent === subcategory && (
                <LinksSection
                  category={category}
                  subcategory={modalContent.title}
                  links={modalContent.links}
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
