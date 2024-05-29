import { FormButton, Input, StyledForm, StyledLensIcon } from "./Search.styled";

export const Search = () => {
  const handleValueChange = () => {};
  return (
    <StyledForm>
      <StyledLensIcon />
      <Input
        type="text"
        value=""
        onChange={handleValueChange}
        placeholder="Знайти книгу"
      />
      <FormButton>Знайти</FormButton>
    </StyledForm>
  );
};
