import styled from "styled-components";

export const ContactsPageWrapper = styled.div`
  margin-top: 88px;
  padding-top: 32px;
  padding-left: 32px;
  padding-bottom: 104px;

  background-color: var(--bukarka-white);
`;

export const Top = styled.div`
  display: flex;
  gap: 128px;
  margin-bottom: 16px;
  padding-left: 104px;
`;

export const Title = styled.h1`
  margin-bottom: 16px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 20px;
  line-height: 1.2;
  color: #000;
`;

export const Text = styled.p`
  width: 504px;

  font-family: var(--regular);
  font-size: 14px;
  line-height: 1.43;
  color: var(--bukarka-black);

  margin-bottom: 8px;
`;

export const TextLast = styled(Text)`
  margin-bottom: 40px;
`;

export const ScheduleText = styled.div`
  margin-bottom: 8px;

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;

  color: var(--bukarka-black);
`;

export const Schedule = styled.div`
  margin-bottom: 48px;

  font-family: var(--regular);
  font-size: 14px;
  line-height: 1.43;

  color: var(--bukarka-black);
`;

export const FormWrapper = styled.div`
  padding-left: 104px;
  margin-bottom: 136px;
`;

export const Form = styled.form`
  margin-top: -72px;
`;

export const Input = styled.input`
  width: 416px;
  height: 40px;
  padding: 8px 16px;
  margin-bottom: 16px;

  border: 1px solid var(--bukarka-light-grey-1);

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 1.5;

    color: var(--bukarka-dark-grey);
  }
`;

export const InputLabel = styled.label`
  display: block;

  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;

  color: var(--bukarka-black);
`;

export const TextArea = styled.textarea`
  width: 712px;
  height: 113px;
  padding: 8px 16px;
  margin-bottom: 8px;
  border: 1px solid var(--bukarka-light-grey-1);

  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: var(--bukarka-dark-grey);

  &::placeholder {
    font-family: var(--regular);
    font-size: 16px;
    line-height: 1.5;

    color: var(--bukarka-dark-grey);
  }
`;

export const Hint = styled.p`
  margin-bottom: 16px;

  font-weight: 400;
  font-size: 12px;
  line-height: 1.33;

  color: var(--bukarka-dark-grey);
`;
export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;

  padding: 5px;
  margin-bottom: 24px;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  border: 2px solid var(--bukarka-black);
`;

export const CheckboxLabel = styled.label`
  font-family: var(--regular);
  font-size: 14px;

  line-height: 1.43;
  color: var(--bukarka-black);
  vertical-align: middle;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px 16px;
  width: 415px;
  height: 40px;

  background: var(--bukarka-yellow);
  color: var(--bukarka-black);

  font-family: var(--semibold);
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);
  }

  &:active {
    color: var(--bukarka-orange);
  }
`;
