import { FilterCriteriaRequest, FilterData } from "./Filter";

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

export interface IFetchBooksParams {
  keyword?: string;
  category?: string;
  subcategory?: string;
  link?: string;
  age?: string;
  new?: boolean;
  bestsellers?: boolean;
  promotions?: boolean;
  page?: number;
  sortBy?: string;
  orderSort?: string;
  limit?: number;
}

export interface IFetchHintsParams {
  author?: string;
  category?: string;
  subcategory?: string;
}

export interface IFetchFavoritesParams {
  ids: string[];
  page?: number;
  sortBy?: string;
  orderSort?: string;
}

export interface Category {
  title: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  title: string;
  links: string[];
}

export interface Author {
  author: string;
}

export interface Publisher {
  publisher: string;
}

export interface Language {
  language: string;
}

export interface IBooksContextType {
  books: IBookItem[];
  book?: IBookItem;
  hints: IBookItem[];
  bookHints: IBookItem[];
  favorites: IBookItem[];
  totalPages: number;
  currentPage: number;
  searchResults: IBookItem[];
  categories: Category[];
  authors: Author[];
  publishers: Publisher[];
  setCurrentPage: (page: number) => void;
  fetchBooksHints: (params: IFetchBooksParams) => Promise<void>;
  fetchHints: (params: IFetchHintsParams) => Promise<void>;
  handleSearch: (params: IFetchBooksParams) => Promise<void>;
  fetchBooks: (params: IFetchBooksParams) => Promise<void>;
  fetchBookById: (id?: string) => Promise<void>;
  fetchFavoritesForGuest: (params: IFetchFavoritesParams) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchPublishers: () => Promise<void>;
  fetchAuthors: () => Promise<void>;
  fetchFilterData: () => Promise<FilterData>;
  applyFilter: (filters: FilterCriteriaRequest) => Promise<void>;
}
