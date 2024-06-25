import { Sort } from "components";
import { useBooks } from "components/Book";
import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

import Filter from "components/Filter";
import { PageLayout } from "components/Layout";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import { StyledFlexWrapper } from "./CatalogPage.style";
import SectionContent from "./SectionContent";

const CatalogPage: React.FC = () => {
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { books, fetchBooks } = useBooks();
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;

    fetchBooks({
      category,
      subcategory,
      link,
      page,
      sortBy,
      orderSort,
    });
  }, [fetchBooks, searchParams, category, subcategory, sortBy, orderSort]);

  const handleSortChange = useCallback(
    (sortKey: string, sortOrder: string) => {
      setSortBy(sortKey);
      setOrderSort(sortOrder);
      setSearchParams({ page: "1", sortBy: sortKey, orderSort: sortOrder });
    },
    [setSearchParams]
  );

  const renderBreadcrumbs = () => {
    return <BreadCrumbs>Каталог | {category}</BreadCrumbs>;
  };

  const renderLabels = () => {
    return <Label>{link || subcategory || category || "Усі книги"}</Label>;
  };

  return (
    <PageLayout books={books}>
      {books && books.length > 0 ? (
        <>
          {renderBreadcrumbs()}
          {renderLabels()}
        </>
      ) : (
        <Label>Каталог</Label>
      )}

      <StyledFlexWrapper>
        {books && !!books.length && <Filter />}

        {books && books.length > 1 && <Sort onSortChange={handleSortChange} />}

        {<Outlet context={{ books }} /> || <SectionContent data={books} />}
      </StyledFlexWrapper>
    </PageLayout>
  );
};

export default CatalogPage;
