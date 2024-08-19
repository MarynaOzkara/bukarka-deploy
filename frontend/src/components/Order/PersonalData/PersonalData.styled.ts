import styled from "styled-components";
import theme from "styles/theme";

const { colors, fonts } = theme;

export const PersonalDataInputs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  margin-top: 32px;

  li {
    flex-basis: calc(50% - 8px);
  }

  li:nth-child(-n + 2) {
    margin-bottom: 8px;
  }
`;

export const Input = styled.input`
  width: 100%;

  border: 1px solid ${colors.border.primary};
  padding: 8px 16px;
  height: 40px;

  color: ${colors.text.primary};
  font-family: ${fonts.regular};
  font-size: 16px;
  line-height: 1.5;

  &::placeholder {
    font-family: ${fonts.regular};
    font-size: 16px;

    line-height: 1.5;
    color: ${colors.text.secondary};
  }
`;
