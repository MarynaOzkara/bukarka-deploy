import { useParams } from "react-router-dom";
import { SubTitleBlue } from "../OrderCommonStyled";
import {
  Author,
  Book,
  BookDataWrapper,
  Delivery,
  DeliveryPrice,
  DeliveryTitle,
  ImageWrapper,
  Price,
  PriceQuantity,
  PriceWithDelivery,
  Quantity,
  Title,
  Total,
  TotalTitle,
} from "./BookData.styled";
import { useEffect, useState } from "react";

const BookData: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    fetch(`https://bukarka.onrender.com/api/orders/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data && console.log(data);
        setOrderData(data);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, [id]);

  return (
    <BookDataWrapper>
      <SubTitleBlue>Ваше замовлення</SubTitleBlue>
      {orderData && (
        <>
          {orderData.orderItems.map((item: any) => (
            <Book key={item._id}>
              <ImageWrapper>
                <img src={item.product.cover} alt={item.product.title} />
              </ImageWrapper>
              <div>
                <Title>{item.product.title}</Title>
                <Author>{item.product.author}</Author>{" "}
              </div>
              <PriceQuantity>
                <Price>{item.product.price}&nbsp;грн.</Price>
                <Quantity>{item.quantity}&nbsp;шт.</Quantity>
              </PriceQuantity>
            </Book>
          ))}
          {orderData.totalPrice >= 500 ? (
            <Delivery>
              <DeliveryTitle>Доставка</DeliveryTitle>{" "}
              <DeliveryPrice>Безкоштовно</DeliveryPrice>
            </Delivery>
          ) : null}

          <Total>
            <TotalTitle>Всього:</TotalTitle>{" "}
            <PriceWithDelivery>
              {orderData.totalPrice}&nbsp;грн.
            </PriceWithDelivery>
          </Total>
        </>
      )}
    </BookDataWrapper>
  );
};

export default BookData;
