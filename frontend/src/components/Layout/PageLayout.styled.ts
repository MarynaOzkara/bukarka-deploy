import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";
import { PageWrapper } from "styles/CommonStyled";

export const PageLayoutWrapper = styled(PageWrapper)`
  min-height: 55vh;
  padding: 2rem;
  padding: 0 1rem;

  @media screen and (min-width: ${breakpoints.mobile}) {
    min-width: ${breakpoints.mobile};
    width: 100%;
    // margin-bottom: 3px;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: ${breakpoints.tablet};
    padding: 0 1rem;
    // margin-bottom: 3px;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 1296px;
    padding: 0 1rem;
  }
`;
