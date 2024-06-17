import { Favorites } from "components";
import { useBooks } from "components/Book";
import { PageLayout } from "components/Layout";
import { useEffect, useState } from "react";

const FavoritePage: React.FC = () => {
  const { books = [] } = useBooks();

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  const favoriteBooks = books.length
    ? books.filter((book) => book && favorites.includes(book._id))
    : [];

  return (
    <PageLayout label="Обране" books={favoriteBooks}>
      {<Favorites books={favoriteBooks} /> || <div>No favorite books</div>}
    </PageLayout>
  );
};

export default FavoritePage;
