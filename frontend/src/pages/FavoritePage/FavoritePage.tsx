import { Favorites, Sort } from "components";
import { useBooks } from "components/Book";
import { useFavorites } from "components/Favorites/FavoritesContext";
import { PageLayout } from "components/Layout";
import { StyledFlexWrap } from "pages/CommonPages.styled";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FavoritePage: React.FC = () => {
  const { favoriteIds } = useFavorites();
  const { favorites, fetchFavoritesForGuest } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");

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
      <StyledFlexWrap>
        {favorites && favorites.length > 1 && (
          <Sort onSortChange={handleSortChange} />
        )}
        <Favorites favorites={favorites} />
      </StyledFlexWrap>
    </PageLayout>
  );
};

export default FavoritePage;
