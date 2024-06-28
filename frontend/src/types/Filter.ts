import { Author, Category, Publisher } from "./Books";

export interface FilterData {
  authors: Author[];
  publishers: Publisher[];
  categories: Category[];
}
