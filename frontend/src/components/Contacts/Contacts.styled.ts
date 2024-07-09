import styled from "styled-components";
import Icon from "components/Icon/Icon";
import { breakpoints } from "constants/breakpoints";

export const ContactList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: var(--medium);
  line-height: 1.5;

  color: var(--bukarka-black);

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
    font-family: var(--medium);
    font-size: 12px;
    line-height: 1.5;
    color: var(--bukarka-black);

    @media screen and (min-width: 768px) {
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
  stroke: var(--bukarka-black);

  &:hover {
    stroke: var(--bukarka-accent-blue);
  }
`;
