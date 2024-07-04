import { Author, Category, Language, Publisher, Subcategory } from "./Books";

export interface FilterData {
  ages: string[];
  authors: Author[];
  publishers: Publisher[];
  categories: Category[];
  price: { priceMin: number; priceMax: number };
  rating: { ratingMin: number; ratingMax: number };
  languages: Language[];
  subcategories: Subcategory[];
}

export interface FilterCriteriaRequest {
  authors: string[];
  publishers: string[];
  categories: string[];
  ratingMin?: number;
  ratingMax?: number;
  priceMin: number;
  priceMax: number;
  languages: string[];
  ages: string[];
  subcategories: string[];
}
