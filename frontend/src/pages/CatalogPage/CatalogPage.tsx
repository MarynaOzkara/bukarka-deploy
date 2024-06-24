import { Sort } from "components";
import { useBooks } from "components/Book";
import React, { useEffect, useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

import { PageLayout } from "components/Layout";
import SectionContent from "./SectionContent";
import Filter from "components/Filter";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import { FlexWrap, FlexWrapper, TextCenter } from "styles/CommonStyled";
import { StyledFlexWrapper } from "./CatalogPage.style";

const CatalogPage: React.FC = () => {
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { books, fetchBooks } = useBooks();
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const loadData = async () => {
      await fetchBooks(category, subcategory, link, page, sortBy, orderSort);
    };

    loadData();
  }, [searchParams, category, subcategory, sortBy, orderSort]);

  const handleSortChange = (sortKey: string, sortOrder: string) => {
    setSortBy(sortKey);
    setOrderSort(sortOrder);
    setSearchParams({ page: "1", sortBy: sortKey, orderSort: sortOrder });
  };

  return (
    <PageLayout books={books}>
      {(books && books.length > 0 && (
        <>
          <BreadCrumbs>Каталог | {category} </BreadCrumbs>
          <Label>{link || subcategory || category || "Усі книги"}</Label>
        </>
      )) || <Label>Каталог</Label>}

      <StyledFlexWrapper>
        {books && !!books.length && <Filter />}

        {books && books.length > 1 && <Sort onSortChange={handleSortChange} />}

        {<Outlet context={{ books }} /> || <SectionContent data={books} />}
      </StyledFlexWrapper>
    </PageLayout>
  );
};

export default CatalogPage;
