import { Favorites, Sort } from "components";
import { useBooks } from "components/Book";
import { PageLayout } from "components/Layout";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FavoritePage: React.FC = () => {
  const { favorites, fetchFavoritesForGuest } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");
  const [ids, setIds] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  useEffect(() => {
    setIds(JSON.parse(localStorage.getItem("favorites") || "[]"));
  }, [favorites]);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;

    const ids = JSON.parse(localStorage.getItem("favorites") || "[]");

    const loadFavorites = async () => {
      await fetchFavoritesForGuest(ids, page, sortBy, orderSort);
    };
    loadFavorites();
  }, [searchParams]);

  const handleSortChange = (sortKey: string, sortOrder: string) => {
    setSortBy(sortKey);
    setOrderSort(sortOrder);
    setSearchParams({
      page: "1",
      sortBy: sortKey,
      orderSort: sortOrder,
      ids,
    });
  };

  return (
    <PageLayout label="Обране" books={favorites}>
      {favorites && favorites.length > 1 && (
        <Sort onSortChange={handleSortChange} />
      )}
      {<Favorites books={favorites} />}
    </PageLayout>
  );
};

export default FavoritePage;
