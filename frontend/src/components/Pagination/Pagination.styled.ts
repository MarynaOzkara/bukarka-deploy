import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";
import { FlexWrapper } from "styles/CommonStyled";

export const PaginationWrapper = styled(FlexWrapper)`
  margin: 1.5rem auto;

  color: var(--bukarka-dark-grey);
  align-items: center;

  & button {
    padding: 0.25rem 0.5rem;
    background: none;
  }

  & button:hover {
    background: var(--bukarka-light-grey);
    color: var(--bukarka-accent-blue);
  }

  & svg path {
    stroke: var(--bukarka-dark-grey);
  }

  & .active {
    background: var(--bukarka-yellow);
  }

  width: 100%;
`;
