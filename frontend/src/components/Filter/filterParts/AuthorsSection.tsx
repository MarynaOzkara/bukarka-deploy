import { Input, TextCenter } from "styles/CommonStyled";
import { SubTitle } from "../Filter.styled";
import { Author } from "types/Books";
import { useState } from "react";

interface IProps {
  authors: Author[];
  selected: string[];
  onChange?: (value: string) => void;
}

const AuthorsSection: React.FC<IProps> = ({ authors, selected, onChange }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleAuthors = showAll ? authors : authors.slice(0, 6);

  const handleToggleShow = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const handleCheckboxChange = (author: string) => {
    if (onChange) {
      onChange(author);
    }
  };

  return (
    <section>
      <SubTitle>Автор</SubTitle>
      <Input type="text" placeholder="Пошук автора" />

      {visibleAuthors &&
        visibleAuthors.length > 0 &&
        visibleAuthors.map(({ author }, index) => (
          <p key={index}>
            <input
              type="checkbox"
              id={author}
              name="author"
              value={author}
              checked={selected.includes(author)}
              onChange={() => handleCheckboxChange(author)}
            />
            <label htmlFor={author}>{author}</label>
          </p>
        ))}

      {authors.length > 6 && (
        <TextCenter className="more" onClick={handleToggleShow}>
          {showAll ? "Показати менше" : "Показати більше"}
        </TextCenter>
      )}
    </section>
  );
};

export default AuthorsSection;
