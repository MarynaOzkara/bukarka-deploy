import { createGlobalStyle } from "styled-components";
import theme from "./theme";
import MontserratRegular from "assets/fonts/Montserrat-Regular.ttf";
import MontserratMedium from "assets/fonts/Montserrat-Medium.ttf";
import MontserratSemibold from "assets/fonts/Montserrat-SemiBold.ttf";
import MontserratBold from "assets/fonts/Montserrat-Bold.ttf";
import MontserratExtrabold from "assets/fonts/Montserrat-ExtraBold.ttf";
import MontserratAlternatesRegular from "assets/fonts/MontserratAlternates-Regular.ttf";
import MontserratAlternatesSemibold from "assets/fonts/MontserratAlternates-SemiBold.ttf";

const { colors, fonts } = theme;

export const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'Montserrat-Regular';
    src: url(${MontserratRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat-Medium';
    src: url(${MontserratMedium}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat-Semibold';
    src: url(${MontserratSemibold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat-Bold';
    src: url(${MontserratBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat-Extrabold';
    src: url(${MontserratExtrabold}) format('truetype');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat-Alternates-Regular';
    src: url(${MontserratAlternatesRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat-Alternates-Semibold';
    src: url(${MontserratAlternatesSemibold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }
 
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
  font-family: ${fonts.regular};
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



  body {
    margin: 0;
    font-family: ${fonts.regular};
  }
`;
