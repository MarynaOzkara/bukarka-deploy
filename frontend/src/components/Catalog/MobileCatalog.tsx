import { Wrapper } from "styles/CommonStyled";
import CategoriesSection from "./CatalogParts/CategoriesSection";
import { Item, StyledCatalog, TitleLink } from "./Catalog.styled";
import { hasData } from "utils/hasData";
import { useBooks } from "components/Book";
import { useEffect } from "react";

interface IProps {
  closeModal: () => void;
}

const MobileCatalog: React.FC<IProps> = ({ closeModal }) => {
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

export default MobileCatalog;
