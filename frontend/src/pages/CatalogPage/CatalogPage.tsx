import { Sort } from "components";
import { useBooks } from "components/Book";
import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

import Filter from "components/Filter";
import { PageLayout } from "components/Layout";
import Subscribe from "components/Subscribe";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import { Link } from "react-router-dom";
import { hasData } from "utils/hasData";
import { StyledFlexWrapper } from "./CatalogPage.style";
import SectionContent from "./SectionContent";
import { adjustAgeValue } from "constants/catalog";

const CatalogPage: React.FC = () => {
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { books, fetchBooks } = useBooks();
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");

  const hasBooks = hasData(books);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;

    const ageReplaced =
      subcategory === "Книги за віком" ? adjustAgeValue(link ?? "") : "";
    const subcategoryReplaced = subcategory !== "Книги за віком" ? link : "";

    fetchBooks({
      category,
      subcategory: subcategoryReplaced,
      link,
      age: ageReplaced,
      page,
      sortBy,
      orderSort,
    });
  }, [searchParams, category, link, subcategory, sortBy, orderSort]);

  const handleSortChange = useCallback(
    (sortKey: string, sortOrder: string) => {
      setSortBy(sortKey);
      setOrderSort(sortOrder);
      setSearchParams({ page: "1", sortBy: sortKey, orderSort: sortOrder });
    },
    [setSearchParams]
  );

  const renderBreadcrumbs = () => {
    return (
      <BreadCrumbs>
        <Link to="/catalog">Каталог | </Link>
        {category && (
          <Link to={`/catalog/${encodeURI(category)}`}> {category} </Link>
        )}
      </BreadCrumbs>
    );
  };

  const renderLabels = () => {
    return <Label>{link || subcategory || category || "Усі книги"}</Label>;
  };

  return (
    <PageLayout books={books}>
      {hasBooks ? (
        <>
          {renderBreadcrumbs()}
          {renderLabels()}
        </>
      ) : (
        <Label>Каталог</Label>
      )}

      <StyledFlexWrapper>
        <Filter />

        {hasBooks && <Sort onSortChange={handleSortChange} />}

        {<Outlet context={{ books }} /> || <SectionContent data={books} />}
      </StyledFlexWrapper>
      <Subscribe />
    </PageLayout>
  );
};

export default CatalogPage;
