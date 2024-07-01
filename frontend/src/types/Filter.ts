import { Author, Category, Language, Publisher } from "./Books";

export interface FilterData {
  authors: Author[];
  publishers: Publisher[];
  categories: Category[];
  price: { minPrice: number; maxPrice: number };
  rating: { minRating: number; maxRating: number };
  languages: Language[];
}

export interface FilterCriteriaRequest {
  authors: string[];
  publishers: string[];
  categories: string[];
  price: { minPrice: number; maxPrice: number };
  rating: { minRating: number; maxRating: number };
  languages: string[];
}
