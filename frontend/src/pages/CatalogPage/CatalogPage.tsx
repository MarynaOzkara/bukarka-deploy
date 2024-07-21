import { Pagination, Sort } from "components";
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
import { breakpoints } from "constants/breakpoints";
import { Button, ButtonGreyYellow, ButtonYellow } from "styles/CommonStyled";

const CatalogPage: React.FC = () => {
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { books, fetchBooks } = useBooks();
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");
  const { currentPage, setCurrentPage, totalPages } = useBooks();

  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= parseInt(breakpoints.tablet)
  );

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= parseInt(breakpoints.tablet));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

      {!isDesktop && (
        <div className="button-container">
          <ButtonGreyYellow>Фильтр</ButtonGreyYellow>
          <ButtonGreyYellow>Сортування</ButtonGreyYellow>
        </div>
      )}

      {!isDesktop && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <StyledFlexWrapper>
        {isDesktop && <Filter />}

        {isDesktop && hasBooks && <Sort onSortChange={handleSortChange} />}

        {<Outlet context={{ books }} /> || <SectionContent data={books} />}
      </StyledFlexWrapper>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <Subscribe />
    </PageLayout>
  );
};

export default CatalogPage;
