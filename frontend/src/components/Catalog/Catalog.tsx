import React, { useEffect, useState } from "react";
import { useBooks } from "components/Book";
import { hasData } from "utils/hasData";
import { Item, StyledCatalog, TitleLink, Wrapper } from "./Catalog.styled";
import MobileCategoriesSection from "./CatalogParts/Mobile/MobileCategoriesSection";
import { breakpoints } from "constants/breakpoints";
import CategoriesSection from "./CatalogParts/CategoriesSection";

interface IProps {
  closeModal: () => void;
}

const Catalog: React.FC<IProps> = ({ closeModal }) => {
  const { categories, fetchCategories } = useBooks();

  const hasCategories = hasData(categories);

  useEffect(() => {
    fetchCategories();
  }, []);

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
    <Wrapper>
      <StyledCatalog>
        <Item>
          <TitleLink to={`catalog`} onClick={closeModal}>
            Усі книги
          </TitleLink>
        </Item>

        {hasCategories &&
          (isDesktop ? (
            <CategoriesSection
              categories={categories}
              closeModal={closeModal}
            />
          ) : (
            <MobileCategoriesSection
              categories={categories}
              closeModal={closeModal}
              closeParentModal={closeModal}
            />
          ))}
      </StyledCatalog>
    </Wrapper>
  );
};

export default Catalog;
