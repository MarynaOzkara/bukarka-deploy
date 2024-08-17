import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const { colors } = theme;

export const GlobalStyles = createGlobalStyle`

 
 *, *::before, *::after {
    box-sizing: border-box;
  }

h1,
h2,
h3,
h4,
h5,
h6,
p {
    margin: 0;
}

body {
  margin: 0;
  padding: 0;
  /* color:   ${({ theme }) => theme.colors.text.primary}; */
  color: ${colors.text.primary};
  background-color: ${colors.background.grey};
}

ul, ol, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

button {
  cursor: pointer;
  border: none;
  color: inherit;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}


a{
    text-decoration: none;
};


*:focus-visible  {
  outline: 2px solid ${colors.text.primary} ;
  border-radius:2px; 
}
`;
