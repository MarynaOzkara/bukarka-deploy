import styled from "styled-components";
import theme from "styles/theme";

const { colors, fonts } = theme;

export const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 16px;
  border: 1px solid ${colors.border.primary};
  resize: vertical;

  font-family: ${fonts.regular};
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.secondary};
`;
