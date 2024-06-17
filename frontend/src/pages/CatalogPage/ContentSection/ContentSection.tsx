import { BookCard } from "components";
import { IBookItem } from "components/Book";
import { useOutletContext } from "react-router-dom";

interface ContentSectionProps {
  data?: IBookItem[];
}

const ContentSection: React.FC<ContentSectionProps> = () => {
  const { books } = useOutletContext<{ books: IBookItem[] }>();

  return (
    <>
      {(books.length > 0 &&
        books.map((book, index) => <BookCard key={index} {...book} />)) || (
        <div>No books in catalog</div>
      )}
    </>
  );
};

export default ContentSection;
