import styled from "styled-components";
import Icon from "components/Icon/Icon";
import { breakpoints } from "constants/breakpoints";
import theme from "styles/theme";

const { colors, fonts } = theme;

export const ContactList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: ${fonts.medium};
  line-height: 1.5;

  color: ${colors.text.primary};

  @media screen and (min-width: ${breakpoints.desktop}) {
    display: block;
  }
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;

  margin-bottom: 20px;

  span {
    font-family: ${fonts.medium};
    font-size: 12px;
    line-height: 1.5;
    color: ${colors.text.primary};

    @media screen and (min-width: ${breakpoints.tablet}) {
      font-size: 14px;
    }

    @media screen and (min-width: ${breakpoints.desktop}) {
      font-size: 16px;
    }
  }
`;

export const StyledIcon = styled(Icon)`
  width: 32px;
  height: 32px;
  fill: transparent;
  stroke: ${colors.text.primary};

  &:hover {
    stroke: ${colors.accent.blue};
  }
`;
