import { useOutletContext, useSearchParams } from "react-router-dom";
import { TextCenter } from "styles/CommonStyled";
import { IBookItem } from "types/Books";
import CatalogBookCard from "../CatalogBookCard";
import { StyledFlexWrap } from "pages/CommonPages.styled";
import { hasData } from "utils/hasData";
import { useBooks } from "components/Book";
import { Pagination } from "components";

interface SectionContentProps {
  data?: IBookItem[];
}

const SectionContent: React.FC<SectionContentProps> = () => {
  const { books } = useOutletContext<{ books: IBookItem[] }>();

  const hasBooks = hasData(books);

  return (
    <>
      <StyledFlexWrap>
        {hasBooks ? (
          books.map((book, index) => <CatalogBookCard key={index} {...book} />)
        ) : (
          <TextCenter>No books in catalog</TextCenter>
        )}
      </StyledFlexWrap>
    </>
  );
};

export default SectionContent;
