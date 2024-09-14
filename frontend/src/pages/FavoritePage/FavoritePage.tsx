import { Favorites, Pagination, Sort } from "components";
import { useBooks } from "components/Book";
import { useFavorites } from "components/Favorites/FavoritesContext";
import { PageLayout } from "components/Layout";
import Subscribe from "components/Subscribe";
import { breakpoints } from "constants/breakpoints";
import { StyledFlexWrapper } from "pages/CatalogPage/CatalogPage.style";
import { StyledFlexWrap } from "pages/CommonPages.styled";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FavoritePage: React.FC = () => {
  const { favoriteIds } = useFavorites();
  const { favorites, fetchFavoritesForGuest } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
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

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const fetchParams = {
      ids: favoriteIds,
      page,
      sortBy,
      orderSort,
    };
    fetchFavoritesForGuest(fetchParams);
  }, [searchParams, favoriteIds, sortBy, orderSort, fetchFavoritesForGuest]);

  const handleSortChange = (sortKey: string, sortOrder: string) => {
    setSortBy(sortKey);
    setOrderSort(sortOrder);
    setSearchParams({
      page: "1",
      sortBy: sortKey,
      orderSort: sortOrder,
      ids: favoriteIds.join(","),
    });
  };

  return (
    <PageLayout label="Обране" books={favorites}>
      <StyledFlexWrapper>
        <StyledFlexWrap>
          {favorites && favorites.length > 1 && (
            <Sort isDesktop={isDesktop} onSortChange={handleSortChange} />
          )}
          <Favorites favorites={favorites} />
        </StyledFlexWrap>
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

export default FavoritePage;
