import styled from "styled-components";
import theme from "styles/theme";

const { colors, fonts } = theme;

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RadioButton = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  font-family: ${fonts.regular};
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.secondary};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RadioInput = styled.input`
  position: relative;

  margin: 0;
  margin-right: 24px;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 26px;
  height: 26px;
  border-radius: 100%;
  fill: ${colors.background.lightGrey};
  stroke-width: 1px;
  stroke: ${colors.border.primary};
  box-shadow: inset 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: ${colors.background.secondary};
  transition: background-color 0.3s ease, border-color 0.3s ease;

  cursor: pointer;

  &:disabled {
    background-color: transparent;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${colors.border.secondary};
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:checked::after {
    opacity: 1;
  }

  &:checked + span {
    color: ${colors.text.primary};
  }
`;
