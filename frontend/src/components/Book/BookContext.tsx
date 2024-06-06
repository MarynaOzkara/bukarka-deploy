import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { instance } from "utils/fetchInstance";
import { IBooksContextType, IBookItem, IBooksData } from "./Book.types";

const BooksContext = createContext<IBooksContextType | null>(null);

export const useBooks = (): IBooksContextType => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};

export const BooksContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allBooks, setAllBooks] = useState<IBookItem[]>([]);
  const [books, setBooks] = useState<IBookItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const addFavorite = (id: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, id]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== id));
  };

  const fetchAllBooks = async (): Promise<IBookItem[]> => {
    let books: IBookItem[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const response = await instance.get<IBooksData>("/api/books");

      books = books.concat(response.data.data);

      totalPages =
        response.data.total && response.data.limit
          ? Math.round(response.data.total / response.data.limit)
          : 1;
      page += 1;
    } while (page <= totalPages);

    return books;
  };

  const fetchBooks = async (pageParam: number = 1) => {
    let page = pageParam || 1;

    try {
      const response = await instance.get<IBooksData>("/api/books", {
        params: { page },
      });

      setBooks(response.data.data);
      response.data.total &&
        response.data.limit &&
        setTotalPages(Math.ceil(response.data.total / response.data.limit));
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const allBooks = await fetchAllBooks();

        setAllBooks(allBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  useEffect(() => {
    let savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    if (!favorites || !Array.isArray(favorites)) {
      localStorage.setItem("favorites", JSON.stringify([]));
      return;
    }
  }, [favorites]);

  localStorage.setItem("favorites", JSON.stringify(favorites));

  return (
    <BooksContext.Provider
      value={{
        books,
        allBooks,
        favorites,
        totalPages,
        currentPage,
        addFavorite,
        removeFavorite,
        fetchBooks,
        fetchAllBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
