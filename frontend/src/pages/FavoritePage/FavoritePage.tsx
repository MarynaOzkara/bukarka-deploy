import { Favorites } from "components";
import { useBooks } from "components/Book";
import { PageLayout } from "components/Layout";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FavoritePage: React.FC = () => {
  const { favorites, fetchFavorites } = useBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ids, setIds] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");

  useEffect(() => {
    setIds(JSON.parse(localStorage.getItem("favorites") || "[]"));
  }, [favorites]);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;

    console.log(ids);
    const loadFavorites = async () => {
      await fetchFavorites(ids, page, sortBy, orderSort);
    };
    loadFavorites();
  }, []);

  console.log(favorites);

  return (
    <PageLayout label="Обране" books={favorites}>
      {<Favorites books={favorites} />}
    </PageLayout>
  );
};

export default FavoritePage;
