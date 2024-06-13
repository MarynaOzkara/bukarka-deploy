import { Pagination } from "components";
import { useBooks } from "components/Book";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import React, { useEffect } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { PageWrapper, StyledCommonWrapper, Wrapper } from "styles/CommonStyled";
import ContentSection from "./ContentSection/ContentSection";

const CatalogPage: React.FC = () => {
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { books, currentPage, setCurrentPage, totalPages, fetchBooks } =
    useBooks();

  useEffect(() => {
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    const loadData = async () => {
      try {
        if (page !== currentPage) {
          setCurrentPage(page);
        }
        await fetchBooks(category, subcategory, link, page);
      } catch (error: any) {
        if (error.response && error.response.status === 404)
          console.warn("Books not found for the given category/subcategory.");
      }
    };

    loadData();
  }, [
    category,
    subcategory,
    link,
    searchParams,
    currentPage,
    setCurrentPage,
    fetchBooks,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          <BreadCrumbs>Каталог | {category} </BreadCrumbs>
          <Label> {link || subcategory || category || "Усі книги"} </Label>
          {<Outlet context={{ books }} /> || <ContentSection data={books} />}

          {!!books.length && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Wrapper>
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default CatalogPage;
