import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { FormButton, Input, StyledForm, StyledLensIcon } from "./Search.styled";
import { SearchContext } from "./SearchContext";
import { IBookItem } from "components/Book";

export const Search = () => {
  const { suggestions, handleSearch, fetchSuggestions } =
    useContext(SearchContext);
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (event.target.value) {
      fetchSuggestions(event.target.value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch({ title: query });
  };

  const handleSuggestionClick = (suggestion: IBookItem) => {
    setQuery(suggestion.title);
    handleSearch({ title: suggestion.title });
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
      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.title}
            </div>
          ))}
        </div>
      )}
      <FormButton>Знайти</FormButton>
    </StyledForm>
  );
};
