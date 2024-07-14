import { StarIcon } from "assets/icons";
import { StarsWrapper } from "components/Home/Slider/SimpleSlider.styled";
import styled from "styled-components";
import { ButtonContainer } from "styles/CommonStyled";

export const StyledItemCard = styled.div`
  margin-top: 0;
  position: relative;
  width: fit-content;
`;

export const StyledFavoriteButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const StyledItemImage = styled.div`
  width: 248px;
  height: 352px;
  overflow: hidden;
  cursor: pointer;

  img {
    object-fit: contain;
    object-position: 50% 50%;
  }
`;

export const StyledTitle = styled.h3`
  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0em;
  margin-top: 8px;
  color: #1e1e1e;
  text-align: left;
  cursor: pointer;
  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
`;

export const StyledPrice = styled.div`
  font-family: "Montserrat-Bold";
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #004f98;
  margin-bottom: 8px;
`;

export const StyledNameAuthor = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #7c7165;
`;

export const EmptyIcon = styled(StarIcon)`
  fill: var(--bukarka-white);
`;

export const FullIcon = styled(StarIcon)`
  fill: var(--bukarka-yellow);
`;

export const StyledButtonContainer = styled(ButtonContainer)`
  margin: 0 auto;
  width: 216px;
`;

export const StyledStarsWrapper = styled(StarsWrapper)`
  margin: 0 auto;
`;
