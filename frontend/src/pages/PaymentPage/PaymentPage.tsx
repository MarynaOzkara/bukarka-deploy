import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useOrderContext } from "components/Order/OrderContext";
import { VisaIcon } from "assets/icons";
import { validationPaymentPageSchema } from "utils/validationSchema";
import { useAppDispatch } from "../../redux/hooks";
import { fetchOrderById } from "../../redux/orders/operations";
import { StyleSheetManager } from "styled-components";
import { StyledCommonWrapper } from "styles/CommonStyled";
import {
  Books,
  Bukarka,
  CVVInput,
  Card,
  CardData,
  CardHeader,
  CardWrapper,
  DateInput,
  DateLabel,
  Delivery,
  DeliveryPrice,
  Info,
  Label,
  Line,
  NumberInput,
  OrderNumber,
  Payment,
  PaymentPageWrapper,
  ReceiptInput,
  ReceiptLabel,
  SubTitle,
  SubTitleBlue,
  SubmitButton,
  Title,
  ToPay,
  Total,
} from "./PaymentPage.styled";

const PaymentPage: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const { id } = useParams<{ id: string }>();
  // console.log(id);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { totalQuantity, deliveryPrice, bookPrice } = useOrderContext();

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        try {
          const order = await dispatch(fetchOrderById(id)).unwrap();
          // console.log(order);
          if (order && order.orderNumber) {
            setOrderNumber(order.orderNumber.toString());
          }
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
    };
    fetchOrder();
  }, [dispatch, id]);

  const priceWithDelivery = (bookPrice ?? 0) + (deliveryPrice ?? 0);

  useEffect(() => {
    toast.warn(
      " Увага! Сторінка оплати є демонстраційною та не здійснює реальну оплату. Будь ласка, не вводьте жодну особисту інформацію або дані своєї кредитної картки.",
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          padding: "24px",
          width: "320px",
          height: "auto",
          color: "var(--bukarka-black)",
          fontSize: "24px",
          lineHeight: "1.3",
        },
      }
    );
  }, []);

  useEffect(() => {
    const validateForm = async () => {
      try {
        await validationPaymentPageSchema.validate(
          {
            cardNumber,
            month,
            year,
            cvv,
            email,
            phone,
          },
          { abortEarly: false }
        );
        setIsFormValid(true);
      } catch (error) {
        setIsFormValid(false);
      }
    };
    validateForm();
  }, [cardNumber, month, year, cvv, email, phone]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let formattedNumber = e.target.value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setCardNumber(formattedNumber);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    const paymentData = {
      cardNumber,
      month,
      year,
      cvv,
      email,
      phone,
    };

    try {
      await validationPaymentPageSchema.validate(paymentData, {
        abortEarly: false,
      });
      console.log("Form submitted:", paymentData);
      navigate(`/confirmation/${id}`);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.error(error.errors);
        setErrors(error.errors);
      }
    }
  };

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) =>
        prop !== "deliveryPrice" && prop !== "orderNumber"
      }
    >
      <StyledCommonWrapper>
        <ToastContainer />
        <PaymentPageWrapper>
          <Title>Оформлення замовлення</Title>
          <form onSubmit={handleSubmit}>
            <CardWrapper>
              <Card>
                <CardHeader>
                  <SubTitle>Онлайн оплата карткою</SubTitle>
                  <VisaIcon />
                </CardHeader>
                <Label htmlFor="cardNumber">Номер картки:</Label>
                <NumberInput
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxLength={19}
                  onChange={handleCardNumberChange}
                />

                <CardData>
                  <DateLabel>
                    <span>Термін дії картки:</span>
                    <div>
                      <DateInput
                        type="text"
                        maxLength={2}
                        value={month}
                        placeholder="ММ"
                        onChange={handleMonthChange}
                      />
                      <span>&nbsp;/&nbsp;</span>
                      <DateInput
                        type="text"
                        maxLength={2}
                        value={year}
                        placeholder="РР"
                        onChange={handleYearChange}
                      />
                    </div>
                  </DateLabel>

                  <DateLabel>
                    <span>Код CVV2:</span>
                    <CVVInput
                      type="text"
                      maxLength={3}
                      value={cvv}
                      onChange={handleCVVChange}
                    />
                  </DateLabel>
                </CardData>
              </Card>
              <Info>
                <SubTitleBlue>Інформація про оплату</SubTitleBlue>
                <OrderNumber>
                  Замовлення №
                  {orderNumber ? orderNumber : <span>Повідомимо пізніше</span>}
                </OrderNumber>

                <Bukarka>Онлайн-книгарня “Букарка”</Bukarka>
                <Books>
                  <span>Книги</span>
                  <span>{totalQuantity}&nbsp;шт.</span>
                </Books>
                <Delivery>
                  <span>Доставка</span>
                  <DeliveryPrice deliveryPrice={deliveryPrice}>
                    {deliveryPrice ? `${deliveryPrice} грн.` : "Безкоштовно"}
                  </DeliveryPrice>
                </Delivery>
                <Line></Line>
                <ToPay>
                  <span>До сплати: </span>
                  <Total>{priceWithDelivery.toFixed(2)}&nbsp;грн.</Total>
                </ToPay>
              </Info>
            </CardWrapper>
            <Payment>
              <ReceiptLabel>Email для отримання квитанції:</ReceiptLabel>
              <ReceiptInput
                type="email"
                value={email}
                placeholder="Введіть email"
                onChange={handleEmailChange}
              />
              <ReceiptLabel>Телефон:</ReceiptLabel>
              <ReceiptInput
                type="phone"
                value={phone}
                placeholder="+380"
                onChange={handlePhoneChange}
              />
            </Payment>
            <SubmitButton
              type="submit"
              orderNumber={orderNumber}
              disabled={!isFormValid}
            >
              Оплатити замовлення
            </SubmitButton>
            {errors.length > 0 && (
              <div>
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </form>
        </PaymentPageWrapper>
      </StyledCommonWrapper>
    </StyleSheetManager>
  );
};

export default PaymentPage;
