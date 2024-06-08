import { IBookItem } from "components/Book";

export interface ISearchResponse {
  books: IBookItem[];
  limit?: number;
  total?: number;
  page?: string;
}
