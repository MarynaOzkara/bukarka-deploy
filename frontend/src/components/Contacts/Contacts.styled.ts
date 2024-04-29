import styled from "styled-components";
import Icon from "components/Icon/Icon";

export const ContactList = styled.ul`
  font-family: var(--medium);
  font-size: 16px;
  line-height: 1.5;

  color: var(--bukarka-black);
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;

  margin-bottom: 20px;

  span {
    font-family: var(--medium);
    font-size: 16px;
    line-height: 1.5;
    color: var(--bukarka-black);
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
