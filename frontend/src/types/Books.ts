export interface Books {
  age: string;
  author: string;
  bestsellers: boolean;
  category: string;
  cover: string;
  description: string;
  format: string;
  genre: [];
  language: string;
  new: boolean;
  pages: number;
  price: number;
  promotions: boolean;
  publisher: string;
  rating: number;
  subcategory: string;
  title: string;
  year: string;
  _id: string;
}

export interface IBookItem
  extends Pick<
    Books,
    | "_id"
    | "title"
    | "author"
    | "price"
    | "rating"
    | "category"
    | "subcategory"
    | "description"
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
  description: string;
}

export interface IBooksDataResponse {
  books: IBookItem[];
  limit?: number;
  total?: number;
  page?: string;
}

export interface IBooksContextType {
  books: IBookItem[];
  book?: IBookItem;
  hints: IBookItem[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchResults: IBookItem[];
  fetchHints: (keyword?: string) => Promise<void>;
  handleSearch: (
    keyword: string,
    page: number,
    sortBy?: string,
    orderSort?: string,
    limit?: number
  ) => Promise<void>;
  fetchBooks: (
    category?: string,
    subcategory?: string,
    link?: string,
    page?: number,
    sortBy?: string,
    orderSort?: string,
    limit?: number
  ) => Promise<void>;
  fetchBookById: (id?: string) => Promise<void>;
}
