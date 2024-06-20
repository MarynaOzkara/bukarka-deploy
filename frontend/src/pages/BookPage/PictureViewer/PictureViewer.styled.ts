import styled from "styled-components";
import { FlexWrapper } from "styles/CommonStyled";
import { BookImage } from "../BookPage.styled";

export const StyledFlexWrapper = styled(FlexWrapper)`
  padding: 40px;
  gap: 3rem;
  align-items: center;
  & span {
    font-size: 3rem;
    font-weight: 300;
  }
`;

export const StyledBookImage = styled(BookImage)`
  & img {
    height: 672px;
  }
`;
