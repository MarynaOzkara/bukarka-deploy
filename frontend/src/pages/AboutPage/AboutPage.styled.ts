import styled from "styled-components";
import theme from "styles/theme";

const { colors } = theme;

export const Title = styled.h1`
  margin-bottom: 8px;
  font-family: "Montserrat-Alternates-Semibold";
  font-weight: 600;
  font-size: 40px;
  text-align: left;
  line-height: 0.8;

  color: ${colors.accent.deepBlue};
`;

export const SubTitle = styled.p`
  margin-bottom: 32px;

  font-family: "Montserrat-Alternates-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;

export const Description = styled.div`
  font-family: var(--regular);
  font-size: 14px;
  line-height: 1.43;
  color: ${colors.text.primary};

  & p {
    margin-bottom: 20px;
  }

  & p:last-child {
    margin-bottom: 32px;
  }
`;

export const Socials = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 14px;
  line-height: 1.43;
  color: #000;

  & span {
    vertical-align: middle;
  }
`;
