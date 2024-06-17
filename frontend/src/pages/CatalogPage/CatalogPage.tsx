import { Sort } from "components";
import { useBooks } from "components/Book";
import React, { useEffect, useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import ContentSection from "./ContentSection/ContentSection";
import { PageLayout } from "components/Layout";

const CatalogPage: React.FC = () => {
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { books, currentPage, setCurrentPage, fetchBooks } = useBooks();
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");

  useEffect(() => {
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const loadData = async () => {
      if (page !== currentPage) {
        setCurrentPage(page);
      }
      await fetchBooks(category, subcategory, link, page, sortBy, orderSort);
    };

    loadData();
  }, [
    category,
    subcategory,
    link,
    searchParams,
    currentPage,
    orderSort,
    sortBy,
    setCurrentPage,
    fetchBooks,
  ]);

  const handleSortChange = (sortKey: string, sortOrder: string) => {
    setSortBy(sortKey);
    setOrderSort(sortOrder);
    setSearchParams({ page: "1", sortBy: sortKey, orderSort: sortOrder });
  };

  return (
    <PageLayout>
      {!!books.length && books.length > 1 && (
        <Sort onSortChange={handleSortChange} />
      )}

      {<Outlet context={{ books }} /> || <ContentSection data={books} />}
    </PageLayout>
  );
};

export default CatalogPage;
