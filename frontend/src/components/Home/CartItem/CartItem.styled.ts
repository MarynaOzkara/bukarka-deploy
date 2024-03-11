import styled from "styled-components";
import { HeartIconThin } from "../../../assets/icons";
import Slider from "react-slick";

export const StyledSlider = styled(Slider)`
  //color: red;
`;

export const StyledItemCart = styled.div`
  position: relative;
  width: 192px;
`;

export const StyledHeart = styled(HeartIconThin)`
  position: absolute;
  top: 0;
  right: 0;
`;

export const StyledItemImage = styled.div`
  width: 192px;
  height: 264px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 192px;
    height: auto;
    object-fit: contain;
    object-position: 50% 50%;
  }
`;

export const StyledTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
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
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #004f98;
  margin-bottom: 8px;
`;

export const StyledNameAuthor = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  //letter-spacing: 0.05em;
  text-align: left;
  color: #7c7165;
`;

export const StarsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const FormButton = styled.button`
  padding: 8px 16px;
  width: 160px;
  border: none;

  background: var(--bukarka-orange);
  color: var(--bukarka-black);

  font-weight: 600;
  font-size: 16px;
  transition: all 0.5s ease;
  &:hover {
    color: #ffdc00;
  }
`;
