import styled from "styled-components";
import { breakpoints } from "constants/breakpoints";
import { BurgerIcon } from "assets/icons";
import theme from "styles/theme";

const { colors } = theme;

export const StyledCatalogButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  width: fit-content;
  padding: 0;
  font-size: 12px;

  background-color: ${colors.accent.yellow};

  font-family: var(--semibold);
  font-size: 12px;
  color: ${colors.text.primary};

  transition: box-shadow 0.3s ease, color 0.3s ease;

  & svg {
    stroke: ${colors.text.primary};
  }

  span {
    display: none;
  }

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: ${colors.accent.orange};

    & svg {
      color: ${colors.accent.orange};
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
    span {
      display: inline;
      padding: 0 16px 0 8px;
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 144px;
    padding: 0 16px 0 8px;
    font-size: 16px;
  }
`;

export const StyledBurgerIcon = styled(BurgerIcon)`
  width: 40px;
  height: 32px;

  @media (min-width: ${breakpoints.desktop}) {
    height: 40px;
  }
`;
