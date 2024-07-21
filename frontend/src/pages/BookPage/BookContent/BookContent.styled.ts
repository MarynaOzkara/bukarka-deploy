import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";
import { ButtonContainer } from "styles/CommonStyled";

export const BookContentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    flex-direction: column;
    width: 100%;
    overflow: hidden;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
    width: 100%;
    overflow: hidden;
  }
`;

export const BookDescription = styled.section`
  flex-grow: 1;
  text-align: left;
`;

export const DescTable = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(1.5rem, auto);
  gap: 0.5rem;

  & li {
    display: contents;
  }

  & li span:nth-child(1) {
    grid-column: 1;
    font-weight: bold;
  }

  & li span:nth-child(2) {
    grid-column: 2;
  }
`;

export const BookTitle = styled.h2`
  line-height: 2.5rem;
  font-size: 2rem;
`;

export const BookSubTitle = styled.h3`
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
  color: var(--bukarka-dark-grey);
`;

export const Description = styled.div`
  & b {
    line-height: 2rem;
    font-weight: 700;
  }

  p {
    line-height: 24px;
  }
`;

export const FavoriteButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const StyledButtonContainer = styled(ButtonContainer)`
  width: 296px;
  flex-shrink: 0;
  margin: 2rem auto;
`;
