import { breakpoints } from "constants/breakpoints";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 24px;
  width: 312px;

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: ${breakpoints.tablet};
    padding: 24px;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 1024px;
    padding: 32px 89px;
  }
`;

export const StyledCatalog = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: start;
  max-height: 45rem;

  & .show-more-button {
    background: none;
    margin: 0.5rem;
  }

  & .back-button {
    cursor: pointer;
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-top: 1rem;
    font-size: 14px;
  }

  & .sub-section {
    margin-left: 1.5rem;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    align-content: space-around;
  }
`;

export const Item = styled.li`
  width: 200px;
`;

export const TitleLink = styled(Link)`
  position: relative;
  margin-bottom: 8px;

  display: inline-block;
  width: 208px;
  padding: 0 16px;

  text-align: left;

  background-color: var(--bukarka-orange);
  color: var(--bukarka-black);

  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
`;

export const SubtitleLink = styled(TitleLink)`
  display: block;
  background-color: var(--bukarka-yellow);
  margin-bottom: 8px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background-color: var(--bukarka-orange);
  }
`;

export const StyledBlock = styled.div`
  margin-left: 1rem;
`;

export const SmallSubTitle = styled(Link)`
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 14px;

  line-height: 24px;
  color: var(--bukarka-black);
`;

export const StyledItem = styled(Link)`
  font-weight: 400;
  font-size: 14px;

  margin-left: 2rem;

  line-height: 24px;
  color: var(--bukarka-black);
`;
