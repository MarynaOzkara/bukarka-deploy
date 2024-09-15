import { breakpoints } from "constants/breakpoints";
import styled from "styled-components";
import { Input } from "styles/CommonStyled";
import theme from "styles/theme";

const { colors, fonts } = theme;

export const FilterWrapper = styled.aside`
  height: fit-content;
  min-width: 296px;

  @media screen and (min-width: ${breakpoints.mobile}) {
    width: 90vw;
  }

  @media screen and (min-width: ${breakpoints.tablet}) {
    width: 90vw;
    width: fit-content;
  }

  @media screen and (min-width: ${breakpoints.desktop}) {
    width: 1440px;
    width: fit-content;
  }
`;

export const SectionTitle = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
  top: -2.5rem;
  left: 0;
  position: absolute;
  color: ${colors.accent.deepBlue};
`;

export const FilterContent = styled.form`
  position: relative;
  text-align: left;
  padding: 1rem;
  background: ${colors.background.lightGrey};

  & input[type="text"] {
    margin-bottom: 0.5rem;
  }

  & .price-range {
    display: flex;
    gap: 1.5rem;
    justify-content: start;
  }

  & .input-range {
    width: 120px;

    &:focus-visible {
      outline-color: ${colors.border.primary};
    }
  }

  & p {
    margin: 0.5rem;
  }

  & p label {
    margin-left: 0.5rem;
  }

  & .rating-range > div {
    display: flex;
    width: 156px;
    justify-content: space-between;
    align-items: end;
    gap: 1rem;
  }

  & section {
    & .more {
      font-weight: 700;
      font-size: 0.8em;
      cursor: pointer;
    }
  }

  & .expand {
    position: absolute;
    right: 0.75rem;
    top: 0.5rem;
    font-size: 0.75em;
    font-family: inherit;
  }
`;

export const SubTitle = styled.p`
  font-weight: 700;
  padding: 0.5rem 0;
`;

export const PriceRangeInput = styled(Input)`
  margin-bottom: 1rem;
  font-family: ${fonts.regular};
`;

export const StyledInput = styled(Input)`
  &:focus-visible {
    outline-color: ${colors.border.primary};
  }
`;
