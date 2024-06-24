import { BookCard } from "components";
import { Label } from "pages/CommonPages.styled";
import { useOutletContext } from "react-router-dom";
import { FlexWrap, TextCenter } from "styles/CommonStyled";
import { IBookItem } from "types/Books";

interface SectionContentProps {
  data?: IBookItem[];
}

const SectionContent: React.FC<SectionContentProps> = () => {
  const { books } = useOutletContext<{ books: IBookItem[] }>();

  return (
    <FlexWrap>
      {(books.length > 0 &&
        books.map((book, index) => <BookCard key={index} {...book} />)) || (
        <TextCenter>No books in catalog</TextCenter>
      )}
    </FlexWrap>
  );
};

export default SectionContent;
