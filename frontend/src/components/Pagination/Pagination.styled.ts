import styled from "styled-components";
import { FlexWrapper } from "styles/CommonStyled";

export const PaginationWrapper = styled(FlexWrapper)`
  gap: 2rem;
  margin: 2rem auto;
  max-width: 15rem;
  color: var(--bukarka-dark-grey);
  align-items: center;

  button {
    padding: 0.5rem;
  }

  .active {
    background: var(--bukarka-yellow);
  }
`;
