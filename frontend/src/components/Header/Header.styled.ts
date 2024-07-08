import { LogoDesktop, LogoMobile } from "assets/icons";
import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";

export const CommonWrapper = styled.div`
  min-width: 320px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 5vw;
  height: fit-content;

  margin: 0 auto;

  @media screen and (min-width: ${breakpoints.mobile}) {
    width: 320px;
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

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 1440px;
  }

  outline: 1px solid green;
`;

export const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  padding: 8px 0;

  background-color: var(--bukarka-light-grey);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);

  z-index: 1;
`;

export const Wrapper = styled.div`
  padding: 7px 16px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  .small-logo {
    display: block;
  }

  .large-logo {
    display: none;
  }

  @media (min-width: ${breakpoints.desktop}) {
    .small-logo {
      display: none;
    }

    .large-logo {
      display: block;
    }
  }
`;

export const DesktopLogo = styled(LogoDesktop)``;

export const MobileLogo = styled(LogoMobile)``;

export const CatalogButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  width: 144px;
  padding: 0 16px 0 8px;

  background-color: var(--bukarka-yellow);

  font-family: var(--semibold);
  font-size: 16px;
  color: var(--bukarka-black);
`;

export const ButtonWrapper = styled.div``;
