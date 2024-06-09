import { useParams } from "react-router-dom";
import { SubTitleBlue } from "../OrderCommonStyled";
import {
  Author,
  Book,
  BookDataWrapper,
  BookList,
  Delivery,
  DeliveryPrice,
  DeliveryTitle,
  EditButton,
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
import { EditIcon } from "assets/icons";
import { useOrderContext } from "../OrderContext";
import Loader from "components/Loader";
import { instance } from "utils/fetchInstance";

interface BookDataProps {
  selectedDeliveryMethod: string;
}

const BookData: React.FC<BookDataProps> = ({ selectedDeliveryMethod }) => {
  const { id } = useParams<{ id: string }>();
  // console.log(id);

  const { setBookData, setOrderNumber } = useOrderContext();

  const [orderData, setOrderData] = useState<any>(null);
  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  // console.log(selectedDeliveryMethod);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/api/orders/${id}`);
        const data = response.data;
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (orderData) {
      setTotalQuantity(
        orderData.orderItems.reduce(
          (total: number, item: any) => total + item.quantity,
          0
        )
      );

      setBookData({
        totalQuantity: totalQuantity,
        deliveryPrice: deliveryPrice,
        bookPrice: orderData.totalPrice,
        orderNumber: orderData.orderNumber,
      });
      setOrderNumber(orderData.orderNumber);
    }
  }, [orderData, totalQuantity, deliveryPrice, setBookData, setOrderNumber]);

  useEffect(() => {
    const countDeliveryPrice = () => {
      let price = 0;

      // console.log(price);
      if (selectedDeliveryMethod) {
        switch (selectedDeliveryMethod) {
          case "Самовивіз з відділення Укрпошти":
            price = 50;
            break;
          case "Самовивіз з відділення Нової Пошти":
          case "Самовивіз з поштомату Нової Пошти":
            price = 60;
            break;
          case "Доставка кур’єром Нової Пошти":
            price = 70;
            break;
          default:
            price = 0;
        }
        if (orderData && orderData.totalPrice >= 500) {
          price = 0;
        }

        // console.log(price);
        setDeliveryPrice(price);
      }
    };

    countDeliveryPrice();
  }, [orderData, selectedDeliveryMethod]);

  useEffect(() => {
    let quantity = 0;
    orderData?.orderItems.forEach((item: any) => {
      quantity += item.quantity;
    });
    setTotalQuantity(quantity);
  }, [orderData]);

  // console.log("deliveryPrice", deliveryPrice);
  // console.log("orderData", orderData);
  // console.log("totalQuantity", totalQuantity);

  return (
    <BookDataWrapper>
      <SubTitleBlue>Ваше замовлення</SubTitleBlue>
      <EditButton>
        <EditIcon />
      </EditButton>
      {!orderData && <Loader />}
      {orderData && (
        <>
          <BookList>
            {orderData.orderItems.map((item: any) => (
              <Book key={item._id}>
                <ImageWrapper>
                  <img src={item.product.image} alt={item.product.title} />
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
          </BookList>
          <Delivery>
            <DeliveryTitle>Доставка</DeliveryTitle>
            <DeliveryPrice>
              {deliveryPrice === null
                ? ""
                : deliveryPrice === 0
                ? "Бескоштовно"
                : `${deliveryPrice} грн.`}
            </DeliveryPrice>
          </Delivery>

          <Total>
            <TotalTitle>Всього:</TotalTitle>
            <PriceWithDelivery>
              {orderData.totalPrice + deliveryPrice}&nbsp;грн.
            </PriceWithDelivery>
          </Total>
        </>
      )}
    </BookDataWrapper>
  );
};

export default BookData;