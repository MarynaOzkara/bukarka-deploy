import { Books } from "types/Books";

export interface IBookItem
  extends Pick<
    Books,
    "_id" | "title" | "author" | "price" | "rating" | "category" | "subcategory"
  > {
  _id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  rating: number;
  index: number;
  category: string;
  subcategory: string;
}

export interface IBooksDataResponse {
  books: IBookItem[];
  limit?: number;
  total?: number;
  page?: string;
}

export interface IBooksContextType {
  books: IBookItem[];
  fetchBooks: (
    category?: string,
    subcategory?: string,
    link?: string,
    page?: number,
    sortBy?: string,
    orderSort?: string,
    limit?: number
  ) => Promise<void>;

  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
