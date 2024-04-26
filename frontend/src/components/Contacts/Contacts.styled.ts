import styled from "styled-components";
import { EmailIcon, PhoneIcon } from "assets/icons";

export const ContactList = styled.ul`
  font-family: var(--medium);
  font-size: 16px;
  line-height: 1.50;

  color: var(--bukarka-black);
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;

  margin-bottom: 20px;
`;

export const StyledEmailIcon = styled(EmailIcon)`
  width: 26px;
  height: 24px;
`;

export const StyledPhoneIcon = styled(PhoneIcon)`
  width: 26px;
  height: 26px;
`;
