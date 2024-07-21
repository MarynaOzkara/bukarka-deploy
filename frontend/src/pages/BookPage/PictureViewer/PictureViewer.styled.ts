import styled from "styled-components";
import { FlexWrapper } from "styles/CommonStyled";
import { BookImage } from "../BookPage.styled";
import { breakpoints } from "constants/breakpoints";

export const StyledFlexWrapper = styled(FlexWrapper)`
  justify-content: center;
  gap: 3rem;
  align-items: center;

  & span {
    font-size: 3rem;
    font-weight: 300;
  }

  & button {
    width: auto;
    background: none;
  }

  @media screen and (min-width: ${breakpoints.mobile}) {
    padding: 50px 0;
    min-width: 616px;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    padding: 50px 0;
    min-width: 616px;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
    width: 100%;
    overflow: hidden;
    align-items: start;
  }
`;

export const StyledBookImage = styled(BookImage)`
  height: 672px;
  width: 440px;
`;
