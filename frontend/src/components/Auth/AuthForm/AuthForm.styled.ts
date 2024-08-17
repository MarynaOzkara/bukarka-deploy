import styled from "styled-components";
import theme from "styles/theme";

const { colors } = theme;

export const Form = styled.form`
  width: 416px;
`;

export const Label = styled.label`
  display: block;

  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;

  color: ${colors.text.primary};
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: last baseline;
`;

export const InputWithIcon = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 16px;
  padding: 8px 16px;

  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.secondary};

  border: 1px solid ${colors.border.primary};

  /* &:last-child {
    margin-bottom: 24px;
  } */

  &:hover {
    box-shadow: inset 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;

  cursor: pointer;
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px 16px;
  margin-bottom: 24px;

  background: ${colors.accent.yellow};

  font-family: var(--font-family);
  font-weight: 600;
  font-size: 16px;

  line-height: 1.5;
  color: ${colors.text.primary};

  &:hover,
  &:focus {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: ${colors.accent.orange};
  }
`;

export const ResetPasswordButton = styled.button`
  background-color: transparent;
  border: none;

  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;
  color: ${colors.text.secondary};

  &:hover {
    color: ${colors.accent.blue};
  }
`;

export const Text = styled.p`
  margin-top: -16px;
  margin-bottom: 32px;

  color: ${colors.text.secondary};

  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 24px;

  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  color: ${colors.text.primary};

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    padding: 8px;
    border: 2px solid ${colors.text.primary};
  }
`;
