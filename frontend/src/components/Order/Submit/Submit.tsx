import { useState } from "react";
import {
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  ContinueButton,
  SubmitButton,
  SubmitWrapper,
} from "./Submit.styles";
import { Link, useNavigate, useParams } from "react-router-dom";

interface SubmitProps {
  onSubmit: () => void;
  onChange: (checked: boolean) => void;
}

const Submit: React.FC<SubmitProps> = ({ onSubmit, onChange }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const handleClick = () => {
    if (isCheckboxChecked) {
      onSubmit();
      navigate(`/payment/${id}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked);
  };

  return (
    <SubmitWrapper>
      <CheckboxContainer>
        <CheckboxLabel>
          <CheckboxInput type="checkbox" onChange={handleInputChange} />
          <span>
            Відправляючи це замовлення, я підтверджую, що прочитав та згоден(а)
            з Умовами користування
          </span>
        </CheckboxLabel>
      </CheckboxContainer>

      <SubmitButton onClick={handleClick} disabled={!isCheckboxChecked}>
        <Link to={`/payment/${id}`}>Підтвердити замовлення</Link>{" "}
      </SubmitButton>
      <ContinueButton>Продовжити покупки</ContinueButton>
    </SubmitWrapper>
  );
};

export default Submit;
