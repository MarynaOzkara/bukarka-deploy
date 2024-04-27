import styled from "styled-components";
import { StyledList, TextAccent } from "pages/CommonPages.styled";

export const TextAccentPrivacy = styled(TextAccent)`
  margin-bottom: 32px;
`;

export const Privacy = styled(StyledList)`
  li {
    margin-bottom: 16px;
  }

  p:not(:last-child) {
    margin-bottom: 24px;
  }
`;
