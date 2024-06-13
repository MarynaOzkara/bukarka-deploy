import { useState } from "react";
import { useParams } from "react-router-dom";
import PersonalData from "components/Order/PersonalData";
import Delivery from "components/Order/Delivery";
import Payment from "components/Order/Payment";
import Comment from "components/Order/Comment";
import BookData from "components/Order/BookData";
import OrderData from "components/Order/OrderData";
import Submit from "components/Order/Submit";
import { StyledCommonWrapper } from "styles/CommonStyled";
import {
  FlexWrapper,
  LeftPart,
  OrderPageWrapper,
  RightPart,
  Title,
} from "./OrderPage.styled";

const OrderPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const [customerName, setCustomerName] = useState<string>("");
  const [customerLastName, setCustomerLastName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryCity, setDeliveryCity] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [orderComment, setOrderComment] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  // console.log(id);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleSubmit = () => {
    const customerInfo = {
      name: customerName,
      surname: customerLastName,
      email: customerEmail,
      phoneNumber: customerPhone,
      city: deliveryCity,
      address: deliveryAddress,
      payment: paymentMethod,
      comment: orderComment,
    };

    // console.log(customerInfo);

    fetch(
      // `https://bukarka.onrender.com/api/orders/checkout/${id}`
      `http://localhost:4000/api/orders/checkout/${id}`,

      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerInfo),
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
              setDeliveryMethod={setDeliveryMethod}
              setDeliveryCity={setDeliveryCity}
              setDeliveryAddress={setDeliveryAddress}
            />
            <Payment setPaymentMethod={setPaymentMethod} />
            <Comment setOrderComment={setOrderComment} />
          </LeftPart>

          <RightPart>
            <BookData selectedDeliveryMethod={deliveryMethod} />
            <OrderData
              customerName={customerName}
              customerLastName={customerLastName}
              customerEmail={customerEmail}
              customerPhone={customerPhone}
              deliveryMethod={deliveryMethod}
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
