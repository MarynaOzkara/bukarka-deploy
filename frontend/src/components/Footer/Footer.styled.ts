import styled from "styled-components";
import Contacts from "components/Contacts";
import { Logo } from "assets/icons";
import { breakpoints } from "constants/breakpoints";

export const StyledFooter = styled.footer`
  width: 100%;
  background-color: var(--bukarka-light-grey);
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.25);
  padding: 2vw;
  margin: 0 auto;

  @media screen and (min-width: ${breakpoints.mobile}) {
    min-width: ${breakpoints.mobile};
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    min-width: ${breakpoints.tablet};
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 100vw;
    padding: 48px 0;
  }
`;

export const Wrapper = styled.div`
  display: block;

  margin: 0 auto;
  width: fit-content;

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: ${breakpoints.tablet};
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    display: flex;
    width: 1296px;
    padding: 0 32px;
    gap: 16px;
    margin-bottom: 32px;
  }
`;

export const LogoBlock = styled.div`
  display: none;

  @media screen and (min-width: ${breakpoints.desktop}) {
    display: block;
    width: 296px;
  }
`;

export const StyledLogo = styled(Logo)`
  min-width: 120px;
  min-height: 71px;
`;

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 16px;

  @media screen and (min-width: ${breakpoints.tablet}) {
    justify-content: space-around;
  }
`;

export const StyledList = styled.ul`
  width: 144px;
  margin-bottom: 16px;

  @media screen and (min-width: 480px) {
    width: fit-content;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 296px;
  }
`;

export const ListItem = styled.li`
  margin-bottom: 16px;

  a {
    font-family: var(--medium);

    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    color: var(--bukarka-black);

    @media screen and (min-width: ${breakpoints.tablet}) {
      font-size: 14px;
    }

    @media screen and (min-width: ${breakpoints.desktop}) {
      font-size: 16px;
    }
  }
`;

export const StyledContacts = styled(Contacts)`
  width: 296px;
`;

export const Copyright = styled.div`
  font-family: var(--regular);
  font-size: 12px;
  line-height: 150%;
  text-align: center;
  color: var(--bukarka-black);
  margin-bottom: 72px;

  @media screen and (min-width: ${breakpoints.desktop}) {
    font-size: 16px;
  }
`;
