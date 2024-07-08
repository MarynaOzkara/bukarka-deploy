import styled from "styled-components";

export const StyledCatalogButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  width: 144px;
  padding: 0 16px 0 8px;

  background-color: var(--bukarka-yellow);

  font-family: var(--semibold);
  font-size: 16px;
  color: var(--bukarka-black);

  @media (max-width: 900px) {
    width: fit-content;
    padding: 0;
    font-size: 12px;

    span {
      display: none;
    }
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;
