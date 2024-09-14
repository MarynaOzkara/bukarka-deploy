import styled from "styled-components";
import theme from "styles/theme";

const { colors, fonts } = theme;

export const ContactsPageWrapper = styled.div`
  padding-top: 32px;
  padding-left: 32px;
  padding-bottom: 104px;

  background-color: ${colors.background.primary};
`;

export const Top = styled.div`
  display: flex;
  gap: 128px;
  margin-bottom: 16px;
  padding-left: 104px;
`;

export const Title = styled.h1`
  margin-bottom: 16px;

  font-family: ${fonts.semibold};
  font-size: 20px;
  line-height: 1.2;
  color: #000;
`;

export const Text = styled.p`
  width: 504px;

  font-family: ${fonts.regular};
  font-size: 14px;
  line-height: 1.43;
  color: ${colors.text.primary};

  margin-bottom: 10px;
`;

export const TextLast = styled(Text)`
  margin-bottom: 36px;
`;

export const ScheduleText = styled.div`
  margin-bottom: 8px;

  font-family: ${fonts.semibold};
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;

  color: ${colors.text.primary};
`;

export const Schedule = styled.div`
  margin-bottom: 44px;

  font-family: ${fonts.regular};
  font-size: 14px;
  line-height: 1.43;

  color: ${colors.text.primary};
`;

export const FormWrapper = styled.div`
  padding-left: 104px;
  margin-bottom: 136px;
`;

export const Form = styled.form`
  margin-top: -76px;
`;

export const Input = styled.input`
  width: 416px;
  height: 40px;
  padding: 8px 16px;
  margin-bottom: 16px;

  border: 1px solid ${colors.border.primary};

  &::placeholder {
    font-family: ${fonts.regular};
    font-size: 16px;
    line-height: 1.5;

    color: ${colors.text.secondary};
  }
`;

export const InputLabel = styled.label`
  display: block;

  font-family: ${fonts.semibold};
  font-size: 16px;
  line-height: 1.5;

  color: ${colors.text.primary};
`;

export const TextArea = styled.textarea`
  min-width: 416px;
  height: 113px;
  padding: 8px 16px;
  margin-bottom: 4px;
  border: 1px solid ${colors.border.primary};

  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.text.secondary};

  &::placeholder {
    font-family: ${fonts.regular};
    font-size: 16px;
    line-height: 1.5;

    color: ${colors.text.secondary};
  }
`;

export const Hint = styled.p`
  margin-bottom: 16px;

  font-family: ${fonts.regular};
  font-size: 12px;
  line-height: 1.33;

  color: ${colors.text.secondary};
`;
export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 5px;
  margin-bottom: 24px;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.text.primary};
`;

export const CheckboxLabel = styled.label`
  font-family: ${fonts.regular};
  font-size: 14px;

  line-height: 1.43;
  color: ${colors.text.primary};
  vertical-align: middle;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px 16px;
  width: 415px;
  height: 40px;

  background: ${colors.accent.yellow};
  color: ${colors.text.primary};

  font-family: ${fonts.semibold};
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: ${colors.accent.orange};
  }
`;
