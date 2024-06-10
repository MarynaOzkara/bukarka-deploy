import { BookCard, Pagination } from "components";
import { useBooks } from "components/Book";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FlexWrapper, Wrapper } from "styles/CommonStyled";

const SectionPage = () => {
  const { books, fetchBooks, currentPage, setCurrentPage, totalPages } =
    useBooks();
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    if (page !== currentPage) {
      setCurrentPage(page);
    } else {
      fetchBooks(page);
    }
  }, [searchParams, currentPage, setCurrentPage, fetchBooks]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <Wrapper>
      <BreadCrumbs>Каталог | {category} </BreadCrumbs>
      <Label> {link || subcategory || category || "Усі книги"} </Label>
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
      {books.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </Wrapper>
  );
};

export default SectionPage;
