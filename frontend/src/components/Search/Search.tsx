import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { FormButton, Input, StyledForm, StyledLensIcon } from "./Search.styled";
import { SearchContext } from "./SearchContext";

export const Search = () => {
  const { handleSearch } = useContext(SearchContext);
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch({ title: query, author: query });
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
      <FormButton>Знайти</FormButton>
    </StyledForm>
  );
};
