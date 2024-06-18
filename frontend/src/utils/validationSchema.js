import * as Yup from "yup";

export const validationPersonalDataSchema = Yup.object({
  name: Yup.string().required("Ім'я є обов'язковим полем"),
  lastName: Yup.string().required("Прізвище є обов'язковим полем"),
  email: Yup.string()
    .email("Невірний формат Email")
    .required("Email є обов'язковим полем"),
  phone: Yup.string()
    .required("Номер телефону є обов'язковим полем")
    .matches(/^\+380\d{9}$/, "Невірний формат номера телефону"),
});
