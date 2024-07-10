import { Category, Subcategory } from "types/Books";

export const flattenCategory = (categories: Category[]) => {
  const links: string[] = [];
  const ageOptions: string[] = [];
  const subcategoriesOptions: string[] = [];
  const categoriesOptions: string[] = [];

  categories &&
    categories.forEach((category) => {
      categoriesOptions.push(category.title);
      category.subcategories &&
        category.subcategories.forEach((subcategory: Subcategory) => {
          subcategoriesOptions.push(subcategory.title);
          if (
            subcategory.title !== "Книги за віком" &&
            subcategory.links.length > 0
          ) {
            links.push(...subcategory.links);
          }

          if (
            subcategory.title === "Книги за віком" &&
            subcategory.links.length > 0
          ) {
            ageOptions.push(...subcategory.links);
          }
        });
    });

  return { links, ageOptions, subcategoriesOptions, categoriesOptions };
};
