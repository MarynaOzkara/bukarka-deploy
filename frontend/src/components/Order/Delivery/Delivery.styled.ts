import styled from "styled-components";
import theme from "styles/theme";

const { colors } = theme;

export const FreeInfo = styled.p`
  margin-bottom: 32px;
  font-family: var(--regular);
  font-weight: 400;
  font-size: 16px;

  line-height: 1.5;
  color: ${colors.accent.deepBlue};
`;

export const CityInput = styled.input`
  margin-bottom: 32px;

  border: 1px solid ${colors.border.primary};
  padding: 8px 16px;
  width: 384px;
  height: 40px;

  background-color: ${colors.background.secondary};
  color: ${colors.text.primary};

  font-family: var(--regular);
  font-size: 16px;
  line-height: 1.5;

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 1.5;
    color: ${colors.text.secondary};
  }
`;

export const WarehouseInput = styled.input`
  margin-bottom: 32px;

  border: 1px solid ${colors.border.primary};
  padding: 8px 16px;
  width: 384px;
  height: 40px;

  background-color: ${colors.background.secondary};
  color: ${colors.text.primary};

  font-family: var(--regular);
  font-size: 16px;
  line-height: 1.5;

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 1.5;
    color: ${colors.text.secondary};
  }
`;

export const Options = styled.div`
  position: absolute;
  width: 384px;
  margin-top: -31px;
  z-index: 1;
  background-color: ${colors.background.secondary};
  border: 1px solid #ccc;
  max-height: 150px;
  /* overflow-y: auto; */
`;

export const WarehouseOptions = styled.div`
  position: absolute;
  width: 384px;
  height: auto;
  margin-top: -31px;
  z-index: 1;
  background-color: ${colors.background.secondary};
  border: 1px solid #ccc;
  /* overflow-y: auto; */
`;

export const Option = styled.div`
  padding: 8px;

  font-family: var(--regular);
  font-size: 14px;

  line-height: 1.43;
  color: #000;

  cursor: pointer;

  &:hover {
    color: ${colors.accent.deepBlue};
  }
`;

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const RadioButton = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  font-family: var(--regular);
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
    background-color: ${colors.text.secondary};
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

export const AddressInput = styled.input`
  width: 100%;
  height: 40px;

  border: 1px solid ${colors.border.primary};
  padding: 8px 16px;

  font-family: var(--regular);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.secondary};

  &::placeholder {
    font-family: var(--regular);
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: ${colors.text.secondary};
  }
`;
