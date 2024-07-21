import { Label } from "pages/CommonPages.styled";
import styled from "styled-components";

export const StyledPoster = styled.div`
  display: flex;
  justify-content: center;
  width: 192px;
  height: 376px;
  background-color: #ffdc00;
  a {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffdc00;
    transition: all 0.05s ease;
    &:hover span {
      color: #ffdc00;
    }
  }
  span {
    display: block;
    height: 100%;
    padding: 0 24px;
    font-family: "Montserrat-Extrabold";
    font-weight: 900;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: 0.05em;
    text-align: center;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    background-color: #ff8a10;
    color: #1e1e1e;
  }
`;

export const StyledLabel = styled(Label)`
  position: absolute;
  z-index: 2;
  & a {
    color: var(--bukarka-black);
  }
`;
