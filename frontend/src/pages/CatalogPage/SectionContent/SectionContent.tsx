import { useOutletContext } from "react-router-dom";
import { FlexWrap, TextCenter } from "styles/CommonStyled";
import { IBookItem } from "types/Books";
import CatalogBookCard from "../CatalogBookCard";
import { StyledFlexWrap } from "./SectionContent.styled";

interface SectionContentProps {
  data?: IBookItem[];
}

const SectionContent: React.FC<SectionContentProps> = () => {
  const { books } = useOutletContext<{ books: IBookItem[] }>();

  return (
    <StyledFlexWrap>
      {books.length > 0 ? (
        books.map((book, index) => <CatalogBookCard key={index} {...book} />)
      ) : (
        <TextCenter>No books in catalog</TextCenter>
      )}
    </StyledFlexWrap>
  );
};

export default SectionContent;
