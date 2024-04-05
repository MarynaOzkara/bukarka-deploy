import React, { useEffect, useState } from "react";
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
  Info,
  Label,
  NumberInput,
  OrderNumber,
  Payment,
  PaymentPageWrapper,
  SubTitle,
  SubTitleBlue,
  Title,
  ToPay,
} from "./PaymentPage.styled";
import { VisaIcon } from "assets/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useOrderContext } from "components/Order/OrderContext";

const PaymentPage: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [CVV, setCVV] = useState("");

  const { id } = useParams();
  console.log(id);

  const { totalQuantity, deliveryPrice } = useOrderContext();

  console.log(totalQuantity);
  console.log(deliveryPrice);

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
    setCVV(e.target.value);
  };

  return (
    <StyledCommonWrapper>
      <ToastContainer />
      <PaymentPageWrapper>
        <Title>Оформлення замовлення</Title>
        <form>
          <CardWrapper>
            <Card>
              <CardHeader>
                <SubTitle>Онлайн оплата карткою</SubTitle>
                <VisaIcon />
              </CardHeader>
              <Label>Номер картки:</Label>
              <NumberInput
                type="text"
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
                    maxLength={4}
                    value={CVV}
                    onChange={handleCVVChange}
                  />
                </DateLabel>
              </CardData>
            </Card>
            <Info>
              <SubTitleBlue>Інформація про оплату</SubTitleBlue>
              <OrderNumber>Замовлення № {id}</OrderNumber>
              <Bukarka>Онлайн-книгарня “Букарка”</Bukarka>
              <Books>
                <span>Книги</span>
                <span>{}</span>
              </Books>
              <Delivery>
                <span>Доставка</span>
                <span>{}</span>
              </Delivery>
              <ToPay>
                <span>До сплати: </span>
                <span>{}</span>
              </ToPay>
            </Info>
          </CardWrapper>
          <Payment>Payment</Payment>
        </form>
      </PaymentPageWrapper>
    </StyledCommonWrapper>
  );
};

export default PaymentPage;
