import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "styles/theme";

const { colors } = theme;

export const Wrapper = styled.div`
  min-height: 80vh;
  margin-top: 88px;
  padding: 40px 32px;

  background-color: ${colors.background.primary};
`;

export const Thanks = styled.p`
  margin-bottom: 32px;

  font-family: "Montserrat-Medium";
  font-weight: 500;
  font-size: 24px;
  line-height: 1.33;
  color: ${colors.accent.deepBlue};
`;

export const OrderInfo = styled.div`
  width: 824px;
  height: 120px;
  padding: 16px 16px 8px 16px;
  margin-bottom: 32px;

  background: ${colors.background.lightGrey};
`;

export const Text = styled.p`
  font-family: "Montserrat-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;

export const NumberInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const NumberText = styled.p`
  color: ${colors.text.primary};

  font-family: "Montserrat-Medium";
  font-weight: 500;
  font-size: 24px;
  line-height: 1.33;
`;

export const Number = styled.p`
  background: ${colors.background.secondary};
  border: 2px solid ${colors.accent.orange};
  color: ${colors.accent.deepBlue};
  padding: 0 32px;

  font-family: "Montserrat-Semibold";
  font-weight: 600;
  font-size: 24px;

  line-height: 1.33;
`;

export const StyledLink = styled(Link)`
  color: ${colors.text.primary};

  font-family: "Montserrat-Medium";
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
`;
