import { Author, Category, Publisher } from "./Books";

export interface FilterData {
  authors: Author[];
  publishers: Publisher[];
  categories: Category[];
  price: { maxPrice: number; minPrice: number };
  rating: { minRating: number; maxRating: number };
  languages: [];
}
