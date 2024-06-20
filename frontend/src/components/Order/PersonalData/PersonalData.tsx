import { useState } from "react";
import { validationPersonalDataSchema } from "utils/validationSchema";
import { Label, SubTitle, Wrapper } from "../OrderCommonStyled";
import { Input, PersonalDataInputs } from "./PersonalData.styled";

interface PersonalDataProps {
  setCustomerName: React.Dispatch<React.SetStateAction<string>>;
  setCustomerLastName: React.Dispatch<React.SetStateAction<string>>;
  setCustomerEmail: React.Dispatch<React.SetStateAction<string>>;
  setCustomerPhone: React.Dispatch<React.SetStateAction<string>>;
}

interface FieldValue {
  [key: string]: string;
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
  const fieldValue: FieldValue = { name, lastName, email, phone };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validateField = (field: string, value: string) => {
    validationPersonalDataSchema
      .validateAt(field, { [field]: value })
      .then(() => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
      })
      .catch((err) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: err.message }));
      });
  };

  const handleBlur = (field: string) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    validateField(field, fieldValue[field]);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setCustomerName(e.target.value);
    validateField("name", e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setCustomerLastName(e.target.value);
    validateField("lastName", e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setCustomerEmail(e.target.value);
    validateField("email", e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setCustomerPhone(e.target.value);
    validateField("phone", e.target.value);
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
            id="name"
            placeholder="Ім’я"
            value={name}
            onChange={handleNameChange}
            onBlur={() => handleBlur("name")}
          />
          {touched.name && errors.name && <p>{errors.name}</p>}
        </li>
        <li>
          <Label htmlFor="last-name">Ваше прізвище*</Label>
          <Input
            type="text"
            name="last-name"
            id="last-name"
            placeholder="Прізвище"
            value={lastName}
            onChange={handleLastNameChange}
            onBlur={() => handleBlur("lastName")}
          />
          {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
        </li>

        <li>
          <Label htmlFor="email">Електронна пошта*</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => handleBlur("email")}
          />
          {touched.email && errors.email && <p>{errors.email}</p>}
        </li>
        <li>
          <Label htmlFor="phone">Номер телефону*</Label>
          <Input
            type="phone"
            name="phone"
            id="phone"
            placeholder="+380"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={() => handleBlur("phone")}
          />
          {touched.phone && errors.phone && <p>{errors.phone}</p>}
        </li>
      </PersonalDataInputs>
    </Wrapper>
  );
};

export default PersonalData;
