import { BookCard } from "components";
import { IBookItem } from "components/Book";
import { useOutletContext } from "react-router-dom";
import { FlexWrapper } from "styles/CommonStyled";

interface ContentSectionProps {
  data?: IBookItem[];
}

const ContentSection: React.FC<ContentSectionProps> = () => {
  const { books } = useOutletContext<{ books: IBookItem[] }>();

  return (
    <FlexWrapper
      style={{
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      {(books.length > 0 &&
        books.map((book, index) => <BookCard key={index} {...book} />)) || (
        <div>No books in catalog</div>
      )}
    </FlexWrapper>
  );
};

export default ContentSection;
