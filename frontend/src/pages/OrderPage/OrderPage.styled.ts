import styled from "styled-components";
import theme from "styles/theme";

const { colors } = theme;

export const OrderPageWrapper = styled.div`
  margin-top: 88px;
  padding: 40px 32px 96px;
  background-color: ${colors.background.primary};
`;

export const Title = styled.h1`
  margin-bottom: 32px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 24px;
  line-height: 1.33;
  color: ${colors.text.primary};
  letter-spacing: 0em;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const LeftPart = styled.div``;

export const RightPart = styled.div``;
