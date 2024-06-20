import styled from "styled-components";

export const BookImage = styled.section`
  cursor: pointer;
  flex-shrink: 0;

  & div {
    display: flex;
    gap: 1rem;

    & img {
      width: 88px;
    }
  }
`;
