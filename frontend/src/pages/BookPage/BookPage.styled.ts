import SimpleSlider from "components/Home/Slider/SimpleSlider";
import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";

export const BookImage = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 312px;

  & img {
    cursor: pointer;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    max-width: ${breakpoints.tablet};
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    max-width: ${breakpoints.desktop};
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

export const StyledSimpleSlider = styled(SimpleSlider)`
  width: 100vw;

  & .slider-container {
    margin: 2rem 0;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    & .slick-list {
      width: 100%;
      width: ${breakpoints.tablet};
    }

    & .slick-slider {
      width: 100%;
      width: ${breakpoints.tablet};
    }

    & .slider-container {
      width: 100%;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    & .slick-list {
      width: 100%;
      width: 1220px;
    }

    & .slick-slider {
      width: 100%;
      width: 1220px;
    }

    & .slider-container {
      width: 100%;
    }
  }
`;
