import { useState } from "react";
import { SubTitle, Wrapper, Label } from "../OrderCommonStyled";
import { RadioButton, RadioInput, RadioWrapper } from "./Payment.styled";

interface PaymentDataProps {
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
}

const Payment: React.FC<PaymentDataProps> = ({ setPaymentMethod }) => {
  const [selectedRadio, setSelectedRadio] = useState("");

  const handleOptionChange = (value: string) => {
    setSelectedRadio(value);
    setPaymentMethod(value);
  };

  return (
    <Wrapper>
      <SubTitle>Оплата</SubTitle>

      <RadioWrapper>
        <Label>Оберіть спосіб оплати*</Label>
        <RadioButton>
          <RadioInput
            name="payment"
            type="radio"
            value="option1"
            checked={selectedRadio === "Онлайн оплата карткою"}
            onChange={() => handleOptionChange("Онлайн оплата карткою")}
          />
          <span>Онлайн оплата карткою</span>
        </RadioButton>
        <RadioButton>
          <RadioInput
            name="payment"
            type="radio"
            value="option2"
            checked={selectedRadio === "Післяплата"}
            onChange={() => handleOptionChange("Післяплата")}
          />
          <span>Післяплата</span>
        </RadioButton>
        <RadioButton>
          <RadioInput
            name="payment"
            type="radio"
            value="option3"
            checked={selectedRadio === "За реквізитами"}
            onChange={() => handleOptionChange("За реквізитами")}
          />
          <span>За реквізитами</span>
        </RadioButton>
      </RadioWrapper>
    </Wrapper>
  );
};

export default Payment;
