import { useState } from "react";
import { PAYMENT_METHOD } from "constants/order";
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
            checked={selectedRadio === PAYMENT_METHOD.card}
            onChange={() => handleOptionChange(PAYMENT_METHOD.card)}
          />
          <span>{PAYMENT_METHOD.card}</span>
        </RadioButton>
        <RadioButton>
          <RadioInput
            name="payment"
            type="radio"
            value="option2"
            checked={selectedRadio === PAYMENT_METHOD.postpaid}
            onChange={() => handleOptionChange(PAYMENT_METHOD.postpaid)}
          />
          <span>{PAYMENT_METHOD.postpaid}</span>
        </RadioButton>
        <RadioButton>
          <RadioInput
            name="payment"
            type="radio"
            value="option3"
            checked={selectedRadio === PAYMENT_METHOD.requisites}
            onChange={() => handleOptionChange(PAYMENT_METHOD.requisites)}
          />
          <span>{PAYMENT_METHOD.requisites}</span>
        </RadioButton>
      </RadioWrapper>
    </Wrapper>
  );
};

export default Payment;
