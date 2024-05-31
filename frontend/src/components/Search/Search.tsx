import { IBookItem } from "components/Book";
import useDebounce from "hooks/useDebounce";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import {
  FormButton,
  Hints,
  Input,
  StyledForm,
  StyledLensIcon,
} from "./Search.styled";
import { SearchContext } from "./SearchContext";

export const Search = () => {
  const { hints, handleSearch, filterHints } = useContext(SearchContext);
  const [query, setQuery] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      filterHints(debouncedQuery);
      setShowHints(true);
    } else {
      setShowHints(false);
    }
  }, [debouncedQuery, filterHints]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (event.target.value) {
      filterHints(event.target.value);
    }
    setShowHints(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch({ title: query, author: query });
    setShowHints(false);
  };

  const handleHintClick = (hint: IBookItem) => {
    setQuery(hint.title || hint.author);
    handleSearch({ title: hint.title, author: hint.author });
    setShowHints(false);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLensIcon />
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Знайти книгу"
      />

      {showHints && hints.length > 0 && (
        <Hints>
          {hints.map(
            (hint, index) =>
              hint && (
                <li key={index} onClick={() => handleHintClick(hint)}>
                  {(hint.author.includes(query) && hint.author) ||
                    (hint.title.includes(query) && hint.title)}
                </li>
              )
          )}
        </Hints>
      )}

      <FormButton>Знайти</FormButton>
    </StyledForm>
  );
};
