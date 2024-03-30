import PersonalData from "components/Order/PersonalData/PersonalData";
import {
  FlexWrapper,
  LeftPart,
  OrderPageWrapper,
  RightPart,
  Title,
} from "./OrderPage.styled";
import { StyledCommonWrapper } from "styles/CommonStyled";
import Delivery from "components/Order/Delivery/Delivery";
import Payment from "components/Order/Payment/Payment";
import Comment from "components/Order/Comment/Comment";
import BookData from "components/Order/BookData/BookData";
import OrderData from "components/Order/OrderData/OrderData";
import Submit from "components/Order/Submit/Submit";
import { useState } from "react";

const OrderPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const [customerName, setCustomerName] = useState<string>("");
  const [customerLastName, setCustomerLastName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [deliveryCity, setDeliveryCity] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [orderComment, setOrderComment] = useState<string>("");

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleSubmit = () => {
    const formData = {
      customerName,
      customerLastName,
      customerEmail,
      customerPhone,
      deliveryCity,
      deliveryAddress,
      paymentMethod,
      orderComment,
    };

    fetch(
      "https://bukarka.onrender.com/api/orders/checkout/66069d32408231c447d49f3e",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <StyledCommonWrapper>
      <OrderPageWrapper>
        <Title>Оформлення замовлення</Title>
        <FlexWrapper>
          <LeftPart>
            <PersonalData
              setCustomerName={setCustomerName}
              setCustomerLastName={setCustomerLastName}
              setCustomerEmail={setCustomerEmail}
              setCustomerPhone={setCustomerPhone}
            />
            <Delivery
              setDeliveryCity={setDeliveryCity}
              setDeliveryAddress={setDeliveryAddress}
            />
            <Payment setPaymentMethod={setPaymentMethod} />
            <Comment setOrderComment={setOrderComment} />
          </LeftPart>

          <RightPart>
            <BookData />
            <OrderData
              customerName={customerName}
              customerLastName={customerLastName}
              customerEmail={customerEmail}
              customerPhone={customerPhone}
              deliveryCity={deliveryCity}
              deliveryAddress={deliveryAddress}
              paymentMethod={paymentMethod}
              orderComment={orderComment}
            />
            <Submit onChange={handleCheckboxChange} onSubmit={handleSubmit} />
          </RightPart>
        </FlexWrapper>
      </OrderPageWrapper>
    </StyledCommonWrapper>
  );
};

export default OrderPage;
