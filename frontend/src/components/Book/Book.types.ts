import { Books } from "types/Books";

export interface IBookItem
  extends Pick<Books, "_id" | "title" | "author" | "price" | "rating"> {
  _id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  rating: number;
  index: number;
}

export interface IBooksData {
  data: IBookItem[];
  limit?: number;
  total?: number;
  page?: string;
}

export interface IBooksContextType {
  allBooks: IBookItem[];
  books: IBookItem[];
  fetchBooks: (page: number) => void;
  favorites: string[];
  addFavorite: (_id: string) => void;
  removeFavorite: (_id: string) => void;
  loading: boolean;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
