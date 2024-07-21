import styled from "styled-components";
import { LogoDesktop, LogoMobile } from "assets/icons";
import { breakpoints } from "constants/breakpoints";

export const CommonWrapper = styled.div`
  min-width: 480px;
  max-width: 100%;
  margin: 0 auto;
  height: fit-content;

  @media screen and (min-width: ${breakpoints.mobile}) {
    width: ${breakpoints.mobile};
    padding: 0 16px;
  }

  @media screen and (min-width: 480px) {
    width: 480px;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: ${breakpoints.tablet};
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 1296px;
    padding: 0 32px;
  }
`;

export const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  padding: 6px 0;

  background-color: var(--bukarka-light-grey);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);

  z-index: 1;

  @media screen and (min-width: ${breakpoints.desktop}) {
    padding: 8px 0;
  }
`;

export const Wrapper = styled.div`
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

export const ButtonWrapper = styled.div`
  display: none;
  @media (min-width: ${breakpoints.desktop}) {
    display: inline-block;
  }
`;

export const UserMenuWrapper = styled.div`
  display: none;

  @media (min-width: ${breakpoints.desktop}) {
    display: inline-block;
  }
`;
