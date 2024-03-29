import { useState } from "react";
import { Label, SubTitle, Wrapper } from "../OrderCommonStyled";
import { Input, PersonalDataInputs } from "./PersonalData.styled";

interface PersonalDataProps {
  setCustomerName: React.Dispatch<React.SetStateAction<string>>;
  setCustomerLastName: React.Dispatch<React.SetStateAction<string>>;
  setCustomerEmail: React.Dispatch<React.SetStateAction<string>>;
  setCustomerPhone: React.Dispatch<React.SetStateAction<string>>;
}

const PersonalData: React.FC<PersonalDataProps> = ({
  setCustomerName,
  setCustomerLastName,
  setCustomerEmail,
  setCustomerPhone,
}) => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setCustomerName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setCustomerLastName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setCustomerEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setCustomerPhone(e.target.value);
  };

  return (
    <Wrapper>
      <SubTitle>Персональні дані замовника</SubTitle>
      <PersonalDataInputs>
        <li>
          <Label htmlFor="name">Ваше ім’я*</Label>
          <Input
            type="text"
            name="name"
            placeholder="Ім’я"
            value={name}
            onChange={handleNameChange}
          />
        </li>
        <li>
          <Label htmlFor="last-name">Ваше прізвище*</Label>
          <Input
            type="text"
            name="last-name"
            placeholder="Прізвище"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </li>

        <li>
          <Label htmlFor="email">Електронна пошта*</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </li>
        <li>
          <Label htmlFor="name">Номер телефону*</Label>
          <Input
            type="phone"
            name="phone"
            placeholder="+380"
            value={phone}
            onChange={handlePhoneChange}
          />
        </li>
      </PersonalDataInputs>
    </Wrapper>
  );
};

export default PersonalData;
