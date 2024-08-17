import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";
import { FlexWrapper } from "styles/CommonStyled";
import theme from "styles/theme";

const { colors } = theme;

export const PaginationWrapper = styled(FlexWrapper)`
  margin: 1.5rem auto;

  color: ${colors.text.secondary};
  align-items: center;

  & button {
    padding: 0.25rem 0.5rem;
    background: none;
  }

  & button:hover {
    background: ${colors.background.lightGrey};
    color: ${colors.accent.blue};
  }

  & svg path {
    stroke: ${colors.text.secondary};
  }

  & .active {
    background: ${colors.accent.yellow};
  }

  width: 100%;

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: ${breakpoints.mobile};
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: ${breakpoints.mobile};
  }
`;
