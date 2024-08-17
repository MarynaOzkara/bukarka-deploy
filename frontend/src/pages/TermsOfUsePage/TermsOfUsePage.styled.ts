import styled from "styled-components";
import { StyledList, TextAccent } from "pages/CommonPages.styled";
import theme from "styles/theme";

const { colors } = theme;

export const TermsOfUsePageWrapper = styled.div`
  margin-top: 88px;
  padding-top: 32px;
  padding-left: 32px;
  padding-bottom: 104px;

  background-color: ${colors.background.primary};
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
