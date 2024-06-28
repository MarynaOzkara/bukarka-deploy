import styled from "styled-components";
import { FlexWrapper } from "styles/CommonStyled";

export const PaginationWrapper = styled(FlexWrapper)`
  gap: 2rem;
  margin: 2rem auto;
  max-width: 15rem;
  color: var(--bukarka-dark-grey);
  align-items: center;

  & button {
    padding: 0.25rem 0.5rem;
  }

  & svg path {
    stroke: var(--bukarka-dark-grey);
  }

  & .active {
    background: var(--bukarka-yellow);
  }
`;
