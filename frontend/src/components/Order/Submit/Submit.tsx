import { useState } from "react";
import {
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  ContinueButton,
  SubmitButton,
  SubmitWrapper,
} from "./Submit.styles";
import { useNavigate, useParams } from "react-router-dom";

interface SubmitProps {
  onSubmit: () => void;
  onChange: (checked: boolean) => void;
  isFormValid: boolean;
  paymentMethod: string;
}

const Submit: React.FC<SubmitProps> = ({
  onSubmit,
  onChange,
  isFormValid,
  paymentMethod,
}) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const { id } = useParams();
  // console.log(id);

  const navigate = useNavigate();

  const handleClick = () => {
    if (isCheckboxChecked && isFormValid) {
      onSubmit();

      if (paymentMethod === "Онлайн оплата карткою") {
        navigate(`/payment/${id}`);
      } else {
        navigate(`/confirmation/${id}`);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
  };

  return (
    <SubmitWrapper>
      <CheckboxContainer>
        <CheckboxLabel>
          <CheckboxInput
            type="checkbox"
            onChange={handleInputChange}
            aria-describedby="terms"
          />
          <span id="terms">
            Відправляючи це замовлення, я підтверджую, що прочитав та згоден(а)
            з Умовами користування
          </span>
        </CheckboxLabel>
      </CheckboxContainer>

      <SubmitButton
        onClick={handleClick}
        disabled={!isCheckboxChecked || !isFormValid}
      >
        Підтвердити замовлення
      </SubmitButton>
      <ContinueButton>Продовжити покупки</ContinueButton>
    </SubmitWrapper>
  );
};

export default Submit;
