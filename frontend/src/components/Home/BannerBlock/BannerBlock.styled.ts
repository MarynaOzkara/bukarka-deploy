import { breakpoints } from "constants/breakpoints";
import Slider from "react-slick";
import styled from "styled-components";

export const SliderWrapper = styled.div`
  width: 100%;
  height: 328px;
  margin: 48px 0;
  padding: 32px 0;
  background-color: var(--bukarka-yellow);
  overflow: hidden;

  & .slick-list {
    display: inline-flex;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    & .slick-list {
      display: block;
    }
  }
`;

export const StyledSlider = styled(Slider)`
  width: 100%;
`;

export const StyledPrevArrow = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  width: 48px;
  left: 0;
  top: calc((264px - 64px) / 2);
  transform: rotate(180deg);
  height: 64px;
  cursor: pointer;
  z-index: 1;
  &:hover svg path {
    stroke: #3d7efd;
  }
`;

export const StyledNextArrow = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  width: 48px;
  right: 0;
  top: calc((264px - 64px) / 2);
  height: 64px;
  cursor: pointer;
  &:hover svg path {
    stroke: #3d7efd;
  }
`;

export const ImageWrapper = styled.div`
  min-width: 264px;
  padding: 0 8px;
`;

export const Image = styled.img`
  height: 264px;
  margin: 0 auto;
`;
