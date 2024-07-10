import React, { useEffect } from "react";

import { useBooks } from "components/Book";
import { hasData } from "utils/hasData";
import { Item, StyledCatalog, TitleLink, Wrapper } from "./Catalog.styled";
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

  return (
    <Wrapper>
      <StyledCatalog>
        <Item>
          <TitleLink to={`catalog`} onClick={closeModal}>
            Усі книги
          </TitleLink>
        </Item>

        {hasCategories && (
          <CategoriesSection categories={categories} closeModal={closeModal} />
        )}
      </StyledCatalog>
    </Wrapper>
  );
};

export default Catalog;
