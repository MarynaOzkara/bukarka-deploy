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
import { useSelector } from "react-redux";
import { selectOrdersData } from "../../../redux/orders/selectors";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchOrderById } from "../../../redux/orders/operations";
import Modal from "components/Modal";
import Cart from "components/Cart";

interface BookDataProps {
  selectedDeliveryMethod: string;
}

const BookData: React.FC<BookDataProps> = ({ selectedDeliveryMethod }) => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const { setBookData, setOrderNumber } = useOrderContext();

  const [deliveryPrice, setDeliveryPrice] = useState<number | null>(null);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const orderData = useSelector(selectOrdersData);
  console.log(orderData);

  // console.log(selectedDeliveryMethod);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

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
        orderNumber: orderData._id,
      });
      setOrderNumber(orderData._id);
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

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <BookDataWrapper>
      <SubTitleBlue>Ваше замовлення</SubTitleBlue>
      <EditButton onClick={openCart}>
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
                  <Author>{item.product.author}</Author>
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
                ? "Безкоштовно"
                : `${deliveryPrice} грн.`}
            </DeliveryPrice>
          </Delivery>

          <Total>
            <TotalTitle>Всього:</TotalTitle>
            <PriceWithDelivery>
              {deliveryPrice !== null
                ? `${orderData.totalPrice + deliveryPrice} грн.`
                : ""}
            </PriceWithDelivery>
          </Total>
        </>
      )}
      {isCartOpen && (
        <Modal close={closeCart} showCloseButton={true}>
          <Cart closeCart={closeCart} />
        </Modal>
      )}
    </BookDataWrapper>
  );
};

export default BookData;
