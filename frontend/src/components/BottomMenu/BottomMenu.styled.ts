import styled from "styled-components";
import { breakpoints } from "constants/breakpoints";
import theme from "styles/theme";

const { colors } = theme;

export const StyledBottomMenu = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.background.secondary};
  box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.25);

  z-index: 2;

  @media screen and (min-width: ${breakpoints.desktop}) {
    display: none;
  }
`;

export const CommonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  min-width: 480px;

  width: 100%;
  margin: 0 auto;
  // padding: 3vw;
  height: fit-content;

  margin: 0 auto;

  @media screen and (min-width: ${breakpoints.mobile}) {
    width: ${breakpoints.mobile};
    padding: 8px;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: ${breakpoints.tablet};
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 1296px;
    padding: 0 32px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 80px;

  color: ${colors.text.primary};
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
