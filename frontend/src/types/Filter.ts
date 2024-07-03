import { Author, Category, Language, Publisher, Subcategory } from "./Books";

export interface FilterData {
  ages: string[];
  authors: Author[];
  publishers: Publisher[];
  categories: Category[];
  price: { minPrice: number; maxPrice: number };
  rating: { minRating: number; maxRating: number };
  languages: Language[];
  subcategories: Subcategory[];
}

export interface FilterCriteriaRequest {
  authors: string[];
  publishers: string[];
  categories: string[];
  price: { minPrice: number; maxPrice: number };
  rating: { minRating?: number; maxRating?: number };
  languages: string[];
  ages: string[];
  subcategories: string[];
}
