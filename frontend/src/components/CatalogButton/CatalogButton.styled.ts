import styled from "styled-components";
import { breakpoints } from "constants/breakpoints";

export const StyledCatalogButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  width: fit-content;
  padding: 0;
  font-size: 12px;

  background-color: var(--bukarka-yellow);

  font-family: var(--semibold);
  font-size: 12px;
  color: var(--bukarka-black);

  span {
    display: none;
  }

  @media (min-width: 900px) {
    span {
      display: inline;
      padding: 0 16px 0 8px;
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 144px;
    padding: 0 16px 0 8px;
    font-size: 16px;
  }
`;
