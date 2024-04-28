import {
  StyledAmountOfBooks,
  StyledBasketHeader,
  StyledBasketWrapper,
  StyledDelete,
  StyledMainTitle,
  StyledPriceTitle,
  StyledSum,
  StyledTotalPrice,
} from "../BasketItem/BasketItem.styled";
import { FormButton } from "../../Home/CartItem/CartItem.styled";
import React, { useEffect } from "react";
import BasketItem from "../BasketItem/BasketItem";
import { useAppDispatch } from "../../../redux/hooks";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import {
  selectOrdersData,
  selectOrdersStatus,
} from "../../../redux/orders/selectors";
import {
  deleteOrderItem,
  fetchOrdersData,
} from "../../../redux/orders/operations";

interface IProps {
  id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  index: number;
}

export const BasketList: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const basketData = useSelector((state: IRootState) =>
    selectOrdersData(state),
  );

  const status = useSelector((state: IRootState) => selectOrdersStatus(state));

  useEffect(() => {
    dispatch(fetchOrdersData());
  }, [dispatch]);

  const getProducts = basketData?.orderItems;
  const ordersId = basketData?._id;

  const handleDelete = () => {
    dispatch(deleteOrderItem(ordersId!)).then(() => {
      dispatch(fetchOrdersData()); // Запрашиваем обновленные данные после удаления
    });
  };

  return (
    <StyledBasketWrapper>
      <StyledMainTitle>Кошик</StyledMainTitle>
      <StyledBasketHeader>
        <StyledAmountOfBooks>
          {basketData?.orderItems.length} шт.
        </StyledAmountOfBooks>
        <StyledDelete onClick={handleDelete}>Видалити все</StyledDelete>
      </StyledBasketHeader>

      {getProducts?.map((item) => (
        <BasketItem
          id={item.product.id}
          title={item.product.title}
          index={item.product.index}
          image={item.product.image}
          author={item.product.author}
          price={item.product.price}
          orderId={item._id}
          quantity={item.quantity}
        ></BasketItem>
      ))}
      <div></div>
      <StyledTotalPrice>
        <StyledPriceTitle>Всього</StyledPriceTitle>
        <StyledSum>{basketData?.totalPrice} грн</StyledSum>
      </StyledTotalPrice>

      <div>
        <FormButton>Продовжити покупки</FormButton>
        <FormButton>Перейти до оформлення</FormButton>
      </div>
    </StyledBasketWrapper>
  );
};
