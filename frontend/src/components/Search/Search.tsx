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
  const [showSuggestions, setShowHints] = useState<boolean>(false);
  const debouncedQuery = useDebounce(query, 500);

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

  const handleHintClick = (suggestion: IBookItem) => {
    setQuery(suggestion.title);
    handleSearch({ title: suggestion.title, author: suggestion.author });
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

      {showSuggestions && hints.length > 0 && (
        <Hints>
          {hints.map((hint, index) => (
            <li key={index} onClick={() => handleHintClick(hint)}>
              {hint.title || hint.author}
            </li>
          ))}
        </Hints>
      )}

      <FormButton>Знайти</FormButton>
    </StyledForm>
  );
};
