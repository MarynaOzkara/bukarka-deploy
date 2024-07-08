import React, { useEffect, useState } from "react";

import {
  Item,
  SmallSubTitle,
  StyledBlock,
  StyledCatalog,
  StyledItem,
  SubtitleLink,
  TitleLink,
  Wrapper,
} from "./Catalog.styled";
import { instance } from "utils/fetchInstance";
import { Category, Subcategory } from "types/Books";
import { hasData } from "utils/hasData";

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

        {hasCategories &&
          categories.map((category: Category, index) => {
            const hasSubcategories = hasData(category.subcategories);
            return (
              <div key={`category-${index}`}>
                <SubtitleLink
                  to={`/catalog/${encodeURI(category.title)}`}
                  key={`subtitle-${index}`}
                  onClick={closeModal}
                >
                  {category.title}
                </SubtitleLink>
                <ul>
                  {hasCategories &&
                    hasSubcategories &&
                    category.subcategories.map(
                      (subcategory: Subcategory, subcatIndex: number) => {
                        const hasLinks = hasData(subcategory.links);
                        return (
                          <li key={subcatIndex}>
                            <StyledBlock>
                              <SmallSubTitle
                                to={`/catalog/${encodeURI(
                                  category.title
                                )}/${encodeURI(subcategory.title)}`}
                                key={`subTitle-${subcatIndex}`}
                                onClick={closeModal}
                              >
                                {subcategory.title}
                              </SmallSubTitle>
                              <ul>
                                {hasLinks &&
                                  subcategory.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                      <StyledItem
                                        to={`/catalog/${encodeURI(
                                          category.title
                                        )}/${encodeURI(link)}`}
                                        onClick={closeModal}
                                      >
                                        {link}
                                      </StyledItem>
                                    </li>
                                  ))}
                              </ul>
                            </StyledBlock>
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
            );
          })}
      </StyledCatalog>
    </Wrapper>
  );
};

export default Catalog;
