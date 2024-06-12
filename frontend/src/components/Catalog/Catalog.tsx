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

interface Category {
  title: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  title: string;
  links: string[];
}

interface CatalogData {
  title: string;
  subcategories: Category[];
}

const Catalog: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [categories, setCategories] = useState<CatalogData[]>([]);

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
          <TitleLink to="/catalog/" onClick={closeModal}>
            Усі книги
          </TitleLink>
        </Item>

        {categories.length > 0 &&
          categories.map((item, index) => (
            <div key={`category-${index}`}>
              <SubtitleLink
                to={`/catalog/${encodeURI(item.title)}`}
                key={`subtitle-${index}`}
                onClick={closeModal}
              >
                {item.title}
              </SubtitleLink>
              <ul>
                {item.subcategories.map(
                  (subcategory: Category, categoryIndex: number) => (
                    <li key={categoryIndex}>
                      <StyledBlock>
                        <SmallSubTitle
                          to={`/catalog/${encodeURI(item.title)}/${encodeURI(
                            subcategory.title
                          )}`}
                          key={`subTitle-${categoryIndex}`}
                          onClick={closeModal}
                        >
                          {subcategory.title}
                        </SmallSubTitle>
                        <ul>
                          {!!subcategory.subcategories &&
                            subcategory.subcategories[categoryIndex].links.map(
                              (link, linkIndex) => (
                                <li key={linkIndex}>
                                  <StyledItem
                                    to={`/catalog/${encodeURI(
                                      item.title
                                    )}/${encodeURI(
                                      subcategory.title
                                    )}/${encodeURI(link)}`}
                                    onClick={closeModal}
                                  >
                                    {link}
                                  </StyledItem>
                                </li>
                              )
                            )}
                        </ul>
                      </StyledBlock>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
      </StyledCatalog>
    </Wrapper>
  );
};

export default Catalog;
