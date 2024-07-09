import styled from "styled-components";
import Contacts from "components/Contacts";
import { Logo } from "assets/icons";
import { breakpoints } from "constants/breakpoints";

export const StyledFooter = styled.footer`
  width: 100%;
  background-color: var(--bukarka-light-grey);
  box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.25);
  padding: 2vw;

  @media screen and (min-width: ${breakpoints.mobile}) {
    padding: 24px;
  }
  @media screen and (min-width: ${breakpoints.desktop}) {
    padding: 48px 0;
  }
`;

export const Wrapper = styled.div`
  display: block;
  min-width: 320px;
  max-width: 100%;
  margin: 0 auto;
  width: fit-content;

  @media screen and (min-width: ${breakpoints.mobile}) {
    width: ${breakpoints.mobile};
    padding: 0 16px;
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
    display: flex;
    width: 1296px;
    padding: 0 32px;
    gap: 16px;
    margin-bottom: 32px;
  }

  outline: 1px solid green;
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

  @media screen and (min-width: 768px) {
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

    @media screen and (min-width: 768px) {
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
