import styled from "styled-components";
import theme from "styles/theme";

const { colors } = theme;

export const LoaderWrapper = styled.div<{ height: number | null }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1024px;
  height: ${({ height }) => (height ? `${height}px` : "336px")};
  overflow: hidden;
`;

export const EmptyWrapper = styled.div`
  width: 70vw;
  height: 336px;
  overflow: hidden;
  padding-top: 56px;
  padding-bottom: 96px;

  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 32px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 24px;
  line-height: 133%;
  text-align: center;
  color: ${colors.text.primary};
`;

export const Message = styled.p`
  margin-bottom: 48px;

  font-family: var(--medium);
  font-size: 24px;
  line-height: 133%;
  text-align: center;
  color: ${colors.text.primary};
`;

export const Button = styled.button`
  width: 400px;
  height: 40px;
  padding: 8px 16px;

  background: ${colors.accent.yellow};
  color: ${colors.text.primary};

  font-family: var(--semibold);
  font-size: 16px;
  line-height: 150%;
`;

export const CartWrapper = styled.div`
  padding-top: 56px;
  padding-bottom: 96px;
  padding-left: 104px;
  padding-right: 92px;
  width: 1024px;
`;
