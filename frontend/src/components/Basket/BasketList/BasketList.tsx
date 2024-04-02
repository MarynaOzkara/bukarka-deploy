import {
  StyledAmountOfBooks,
  StyledBasketHeader,
  StyledBasketWrapper,
  StyledDelete,
  StyledMainTitle,
} from "../BasketItem/BasketItem.styled";
import { FormButton } from "../../Home/CartItem/CartItem.styled";
import React, { FC, useEffect, useState } from "react";
import BasketItem from "../BasketItem/BasketItem";
import { useAppDispatch } from "../../../redux/hooks";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import {
  selectOrdersData,
  selectOrdersError,
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
  // rating: number;
  index: number;
}

export const BasketList: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const basketData = useSelector((state: IRootState) =>
    selectOrdersData(state),
  );
  const status = useSelector((state: IRootState) => selectOrdersStatus(state));
  const error = useSelector((state: IRootState) => selectOrdersError(state));

  console.log("data from redux", basketData);

  // const [orderIdToDelete, setOrderIdToDelete] = useState("");
  // console.log(orderIdToDelete, "id---to---delete");

  // State to manage deletion status
  // const [deleteStatus, setDeleteStatus] = useState("");

  // useEffect(() => {
  //   const deleteItem = async () => {
  //     if (orderIdToDelete) {
  //       try {
  //         await instance.delete(`/api/orders/${orderIdToDelete}`);
  //         setDeleteStatus("Item deleted successfully.");
  //         // Optionally reset itemIdToDelete or perform other actions upon successful deletion
  //       } catch (error) {
  //         console.error("Failed to delete item:", error);
  //         setDeleteStatus("Failed to delete item.");
  //       }
  //     }
  //   };
  //   deleteItem();
  // }, [orderIdToDelete]);
  // const handleDeleteClick = (id: string) => {
  //   setOrderIdToDelete(id); // Simulate deleting an item with id "123"
  // };

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
      <div>
        <p>Всього</p>
        <p>{basketData?.totalPrice} грн</p>
      </div>

      <div>
        <FormButton
        // onClick={toggleModal}
        >
          Продовжити покупки
        </FormButton>
        <FormButton
        // onClick={toggleModal}
        >
          Перейти до оформлення
        </FormButton>
      </div>
    </StyledBasketWrapper>
  );
};
