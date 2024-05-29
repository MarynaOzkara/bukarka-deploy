import { Logo } from "assets/icons";
import Contacts from "components/Contacts";
import styled from "styled-components";

export const StyledFooter = styled.footer`
  width: 100%;

  background-color: var(--bukarka-light-grey);
  padding: 48px 0;
  box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.25);
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  padding-right: 32px;
  padding-left: 32px;
  margin-bottom: 32px;
`;

export const LogoBlock = styled.div`
  width: 296px;
`;

export const StyledLogo = styled(Logo)`
  min-width: 120px;
  min-height: 71px;
`;

export const StyledNav = styled.nav`
  display: flex;
  gap: 16px;

  /* width: 608px; */
`;

export const StyledList = styled.ul`
  width: 296px;
`;

export const ListItem = styled.li`
  margin-bottom: 16px;

  a {
    font-family: var(--medium);

    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: var(--bukarka-black);
  }
`;

export const StyledContacts = styled(Contacts)`
  width: 296px;
`;

export const Copyright = styled.div`
  font-family: var(--regular);
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: var(--bukarka-black);
`;
