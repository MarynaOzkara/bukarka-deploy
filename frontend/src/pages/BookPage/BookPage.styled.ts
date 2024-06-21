import styled from "styled-components";

export const BookImage = styled.section`
  position: relative;
  flex-shrink: 0;

  & .images-set {
    margin: 1rem 0;
    display: flex;
    gap: 1rem;

    & img {
      width: 88px;
    }
  }
`;
