export interface Category {
  title: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  title: string;
  links: string[];
}
