import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";

export const StyledBottomMenu = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* height: 72px; */
  background-color: #fff;

  z-index: 2;

  @media screen and (min-width: ${breakpoints.desktop}) {
    display: none;
  }
`;

export const CommonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  min-width: 320px;
  max-width: 100%;
  margin: 0 auto;
  padding: 3vw;
  height: fit-content;

  margin: 0 auto;

  @media screen and (min-width: ${breakpoints.mobile}) {
    width: ${breakpoints.mobile};
    padding: 8px;
  }

  @media screen and (min-width: 480px) {
    width: 480px;
  }

  @media screen and (min-width: 768px) {
    width: 768px;
  }

  @media screen and (min-width: 900px) {
    width: 900px;
  }

  @media screen and (min-width: 1200px) {
    width: 1200px;
  }

  outline: 1px solid green;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 80px;

  color: var(--bukarka-black);

  font-family: var(--font-family);
  font-weight: 400;
  font-size: 12px;
  line-height: 133%;
  text-align: center;
`;

export const UserMenuWrapper = styled.div`
  display: inline-block;

  @media (min-width: ${breakpoints.desktop}) {
    display: none;
  }
`;
