import { Author } from "types/Books";
import { SubTitle } from "../Filter.styled";
import ShowMore from "./ShowMore";

import FilterSearch from "./FilterSearch";

interface IProps {
  authors: Author[];
  selectedAuthors: string[];
  onAuthorsChange: (value: string[]) => void;
}

const AuthorsSection: React.FC<IProps> = ({
  authors,
  selectedAuthors,
  onAuthorsChange,
}) => {
  const flattenAuthors = authors
    .map((author) => author.author)
    .filter((item) => !!item);

  const handleAuthorsChange = (author: string) => {
    onAuthorsChange(
      selectedAuthors.includes(author)
        ? selectedAuthors.filter((a) => a !== author)
        : [...selectedAuthors, author]
    );
  };

  return (
    <section>
      <SubTitle>Автор</SubTitle>

      <FilterSearch placeholder="Пошук автора" />

      <ShowMore
        options={flattenAuthors}
        onChange={handleAuthorsChange}
        selected={selectedAuthors}
      />
    </section>
  );
};

export default AuthorsSection;
