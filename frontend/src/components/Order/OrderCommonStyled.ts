import styled from "styled-components";
import theme from "styles/theme";

const { colors } = theme;

export const Wrapper = styled.div`
  width: 816px;
  padding: 16px 16px 24px;

  background: ${colors.background.lightGrey};
  margin-bottom: 24px;

  &:last-child {
    margin: 0;
  }
`;

export const SubTitle = styled.h2`
  position: relative;
  left: -16px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 280px;
  height: 24px;
  margin-bottom: 32px;

  padding: 0 12px 0 16px;

  background-color: ${colors.accent.yellow};

  font-family: var(--bold);
  font-weight: 700;
  font-size: 16px;

  line-height: 1.5;
  color: ${colors.text.primary};

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background: ${colors.accent.orange};
  }
`;

export const SubTitleBlue = styled(SubTitle)`
  &::before {
    background-color: ${colors.accent.deepBlue};
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;

  font-family: var(--semibold);
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;
