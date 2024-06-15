import { Pagination, Sort } from "components";
import { useBooks } from "components/Book";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import React, { useEffect, useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import {
  FlexWrapper,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";
import ContentSection from "./ContentSection/ContentSection";

const CatalogPage: React.FC = () => {
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { books, currentPage, setCurrentPage, totalPages, fetchBooks } =
    useBooks();
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");

  useEffect(() => {
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const sortBy = searchParams.get("sortBy") || "";
    const sortOrder = searchParams.get("orderSort") || "asc";
    const loadData = async () => {
      if (page !== currentPage) {
        setCurrentPage(page);
      }
      await fetchBooks(category, subcategory, link, page, sortBy, sortOrder);
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
    setSearchParams({ page: page.toString(), sortBy, orderSort });
  };

  const handleSortChange = (sortKey: string, sortOrder: string) => {
    setSortBy(sortKey);
    setOrderSort(sortOrder);
    setSearchParams({ page: "1", sortBy: sortKey, orderSort: sortOrder });
  };

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          <BreadCrumbs>Каталог | {category} </BreadCrumbs>
          <Label> {link || subcategory || category || "Усі книги"} </Label>

          <FlexWrapper
            style={{
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "2rem",
              position: "relative",
            }}
          >
            {!!books.length && <Sort onSortChange={handleSortChange} />}

            {<Outlet context={{ books }} /> || <ContentSection data={books} />}
          </FlexWrapper>
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
