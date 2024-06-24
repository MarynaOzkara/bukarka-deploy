import { Sort } from "components";
import { useBooks } from "components/Book";
import { PageLayout } from "components/Layout";
import CatalogBookCard from "pages/CatalogPage/CatalogBookCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FlexWrap, TextCenter } from "styles/CommonStyled";

const SearchPage = () => {
  const { searchResults, handleSearch } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const keyword = searchParams.get("keyword") || "";
    setKeyword(keyword);
    const loadData = async () => {
      await handleSearch(keyword, page, sortBy, orderSort);
    };
    loadData();
  }, [searchParams, keyword, sortBy, orderSort]);

  const handleSortChange = (sortKey: string, sortOrder: string) => {
    setSortBy(sortKey);
    setOrderSort(sortOrder);
    setSearchParams({
      page: "1",
      sortBy: sortKey,
      orderSort: sortOrder,
      keyword,
    });
  };

  return (
    <PageLayout label="Результати пошуку" books={searchResults}>
      {searchResults && searchResults.length > 1 && (
        <Sort onSortChange={handleSortChange} />
      )}
      <FlexWrap>
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <CatalogBookCard key={index} {...result} />
          ))
        ) : (
          <TextCenter>No results found</TextCenter>
        )}
      </FlexWrap>
    </PageLayout>
  );
};

export default SearchPage;
