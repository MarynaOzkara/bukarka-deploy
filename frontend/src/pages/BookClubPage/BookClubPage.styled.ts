import styled from "styled-components";
import { RightPart } from "../CommonPages.styled";
import theme from "styles/theme";

const { colors } = theme;

export const Title = styled.h2`
  margin-bottom: 24px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.accent.deepBlue};
`;

export const SubTitle = styled.h3`
  margin-bottom: 16px;

  font-family: var(--semibold);
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;

export const Text = styled.p`
  margin-bottom: 24px;

  font-family: var(--regular);
  font-size: 14px;
  line-height: 1.43;
  color: ${colors.text.primary};
`;

export const RightPartClub = styled(RightPart)`
  margin-top: 28px;
`;
