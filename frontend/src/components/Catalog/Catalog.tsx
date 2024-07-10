import React, { useEffect, useState } from "react";

import { Category } from "types/Books";
import { instance } from "utils/fetchInstance";
import { hasData } from "utils/hasData";
import { Item, StyledCatalog, TitleLink, Wrapper } from "./Catalog.styled";
import CategoriesSection from "./CatalogParts/CategoriesSection";

const Catalog: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const hasCategories = hasData(categories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
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
