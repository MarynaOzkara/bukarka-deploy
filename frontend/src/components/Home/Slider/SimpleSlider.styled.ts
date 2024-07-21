import styled from "styled-components";
import { StarIcon } from "../../../assets/icons";
import Slider from "react-slick";
import { breakpoints } from "constants/breakpoints";

export const StyledSlider = styled(Slider)`
  @media screen and (min-width: ${breakpoints.mobile}) {
    max-width: 480px;
  }

  @media screen and (min-width: 560px) {
    max-width: 560px;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    max-width: 768px;
  }

  @media screen and (min-width: 960px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 1024px;
  }

  @media screen and (min-width: 1220px) {
    max-width: 1220px;
  }
  width: 100%;
  max-width: 1024px;
`;

export const StyledItemCard = styled.div`
  width: 192px;
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
  z-index: 100;
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

export const StyledItemImage = styled.div`
  width: 192px;
  height: 216px;
  overflow: hidden;
  img {
    width: 192px;
    height: auto;
    object-fit: contain;
    object-position: 50% 50%;
  }
`;

export const StyledStarIcon = styled(StarIcon)`
  path {
    fill: ${(props) => props.$fillColor || ""};
  }
`;

export const StarsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 4px;
  span {
    height: 20px;
  }
`;
