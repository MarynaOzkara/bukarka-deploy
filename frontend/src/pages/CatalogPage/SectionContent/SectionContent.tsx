import { StyledFlexWrap } from "pages/CommonPages.styled";
import { useOutletContext } from "react-router-dom";
import { TextCenter } from "styles/CommonStyled";
import { IBookItem } from "types/Books";
import { hasData } from "utils/hasData";
import CatalogBookCard from "../CatalogBookCard";

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
