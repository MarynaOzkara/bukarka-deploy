import styled from "styled-components";

export const BookImage = styled.section`
  position: relative;
  flex-shrink: 0;

  & img {
    cursor: pointer;
  }
`;

export const BookImageSet = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;

  & img {
    width: 88px;
  }
`;

export const StyledBookPageSlider = styled.div`
  width: 1220px;

  & .slick-slider {
    width: 100%;
  }
`;
