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

export const validationDeliverySchema = Yup.object().shape({
  city: Yup.string().required("Місто є обов'язковим полем"),
  address: Yup.string().required("Адреса є обов'язковим полем"),
  deliveryMethod: Yup.string().required(
    "Спосіб доставки обов'язковий до вибору"
  ),
});

export const validationPaymentSchema = Yup.object().shape({
  payment: Yup.string().required("Спосіб оплати є обов'язковим полем"),
});

export const validationCommentSchema = Yup.object().shape({
  payment: Yup.string(),
});

export const validationPaymentPageSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Номер картки є обов'язковим полем")
    .matches(
      /^[0-9\s]{19}$/,
      "Номер картки має бути у форматі XXXX XXXX XXXX XXXX"
    ),
  month: Yup.string()
    .required("Місяць є обов'язковим полем")
    .matches(/^(0[1-9]|1[0-2])$/, "Місяць має бути у форматі ММ"),
  year: Yup.string()
    .required("Рік є обов'язковим полем")
    .matches(/^[0-9]{2}$/, "Рік має бути у форматі РР"),
  cvv: Yup.string()
    .required("CVV є обов'язковим полем")
    .matches(/^[0-9]{3}$/, "CVV має 3 цифри"),
  email: Yup.string()
    .email("Невірний формат Email")
    .required("Email є обов'язковим полем"),
  phone: Yup.string()
    .required("Номер телефону є обов'язковим полем")
    .matches(/^\+380\d{9}$/, "Невірний формат номера телефону"),
});
