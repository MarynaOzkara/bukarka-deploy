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
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, setCurrentPage, totalPages } = useBooks();

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
    const keyword = searchParams.get("keyword") || "";

    setSearchParams({
      keyword,
      page: page.toString(),
    });
  };
  const { books } = useOutletContext<{ books: IBookItem[] }>();

  const hasBooks = hasData(books);

  return (
    <StyledFlexWrap>
      {hasBooks ? (
        books.map((book, index) => <CatalogBookCard key={index} {...book} />)
      ) : (
        <TextCenter>No books in catalog</TextCenter>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </StyledFlexWrap>
  );
};

export default SectionContent;
