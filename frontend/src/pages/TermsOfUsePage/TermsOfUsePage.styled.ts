import styled from "styled-components";
import { StyledList, TextAccent } from "pages/CommonPages.styled";

export const TermsOfUsePageWrapper = styled.div`
  margin-top: 88px;
  padding-top: 32px;
  padding-left: 32px;
  padding-bottom: 104px;

  background-color: var(--bukarka-white);
`;

export const TextAccentTerms = styled(TextAccent)`
  margin-bottom: 48px;
`;

export const Terms = styled(StyledList)`
  li {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 16px;
    }
  }
`;
