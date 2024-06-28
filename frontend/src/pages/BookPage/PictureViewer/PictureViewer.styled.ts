import styled from "styled-components";
import { FlexWrapper } from "styles/CommonStyled";
import { BookImage } from "../BookPage.styled";

export const StyledFlexWrapper = styled(FlexWrapper)`
  padding: 50px 0;
  min-width: 616px;
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
`;

export const StyledBookImage = styled(BookImage)`
  & img {
    height: 672px;
    width: 440px;
  }
`;
