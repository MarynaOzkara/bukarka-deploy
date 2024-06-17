import { BookCard } from "components";
import { useOutletContext } from "react-router-dom";
import { IBookItem } from "types/Books";

interface SectionContentProps {
  data?: IBookItem[];
}

const SectionContent: React.FC<SectionContentProps> = () => {
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

export default SectionContent;
