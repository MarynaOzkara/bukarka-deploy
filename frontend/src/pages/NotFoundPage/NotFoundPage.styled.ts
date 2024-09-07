import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "styles/theme";

const { colors } = theme;

const HEADER_HEIGHT = "88px";
const FOOTER_HEIGHT = "288px";

export const Main = styled.main`
  display: flex;
  gap: 120px;
  width: 100%;

  height: calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT});
  padding: 83px 136px 0 32px;
`;

export const NotFoundInfo = styled.div`
  width: 536px;
`;
export const Title = styled.main`
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.33;
  color: ${colors.accent.deepBlue};
`;

export const Text = styled.p`
  margin-bottom: 32px;

  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.primary};
`;

export const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 8px 16px;
  min-width: 192px;

  background: ${colors.accent.yellow};
  color: ${colors.text.primary};

  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: ${colors.accent.orange};
  }

  &:not(:last-child) {
    margin-right: 13px;
  }
`;

export const Image = styled.img`
  width: 400px;
  height: 234px;
`;
