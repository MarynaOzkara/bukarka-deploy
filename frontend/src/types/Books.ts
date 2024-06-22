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

export interface IBookItem extends Books {
  image: string;
  index: number;
  imagesUrls: [];
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
  searchResults: IBookItem[];
  setCurrentPage: (page: number) => void;
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
