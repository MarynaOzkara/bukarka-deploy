import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";
import { PageWrapper } from "styles/CommonStyled";

export const PageLayoutWrapper = styled(PageWrapper)`
  min-height: 55vh;
  padding: 2rem;
  padding: 0 1rem;
  width: 100vw;

  @media screen and (min-width: ${breakpoints.mobile}) {
    min-width: ${breakpoints.mobile};
    width: 100%;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: ${breakpoints.tablet};
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 1440px;
  }
`;
