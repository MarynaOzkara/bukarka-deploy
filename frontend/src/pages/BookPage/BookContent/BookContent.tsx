import { images } from "assets/images";
import BookRating from "components/BookRating";
import Modal from "components/Modal";
import { Price, Separator } from "pages/CommonPages.styled";
import { useCallback, useEffect, useState } from "react";
import {
  ButtonOrange,
  ButtonYellow,
  TextCenter,
  Wrapper,
} from "styles/CommonStyled";
import { IBookItem } from "types/Books";
import { BookImage, BookImageSet } from "../BookPage.styled";
import PictureViewer from "../PictureViewer/PictureViewer";
import {
  BookContentWrapper,
  BookDescription,
  BookSubTitle,
  BookTitle,
  DescTable,
  Description,
  FavoriteButtonContainer,
  StyledButtonContainer,
} from "./BookContent.styled";

import Cart from "components/Cart";
import FavoriteButton from "components/FavoriteButton";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addToCart,
  createCart,
  fetchOrderById,
} from "../../../redux/orders/operations";
import { CartData } from "components/Cart/Cart";

interface IBookContentProps {
  book: IBookItem;
}

const BookContent: React.FC<IBookContentProps> = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [cartData, setCartData] = useState<CartData | null>(null);

  console.log(book._id);
  const dispatch = useAppDispatch();

  const showModal = (content: string, img?: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent("");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      const storedOrderId = localStorage.getItem("currentOrderId");
      if (storedOrderId) {
        const response = await dispatch(fetchOrderById(storedOrderId));
        if (response.meta.requestStatus === "fulfilled") {
          setCartData(response.payload as CartData);
        }
      }
    };

    fetchCartData();
  }, [dispatch]);

  const handleBuy = useCallback(async () => {
    let orderId = localStorage.getItem("currentOrderId");

    if (cartData?.orderItems.some((item) => item._id === book._id)) {
      showModal("isBookAdded");
      return;
    }

    if (!orderId) {
      const createCartResponse = await dispatch(createCart());
      if (createCartResponse.meta.requestStatus === "fulfilled") {
        orderId = createCartResponse?.payload?.orderId;
        orderId && localStorage.setItem("currentOrderId", orderId);
      } else {
        console.log("Помилка при створенні кошика.");
        return;
      }
    }

    const addToCartResponse = await dispatch(
      addToCart({ orderId: orderId!, productId: book._id })
    );
    if (addToCartResponse.meta.requestStatus === "fulfilled") {
      await dispatch(fetchOrderById(orderId!));
      setIsModalOpen(true);
      showModal("cart");
    } else {
      console.log("Помилка при додаванні товару до кошика.");
    }
  }, [book._id, cartData, dispatch]);

  const handleAddToCart = useCallback(async () => {
    const storedOrderId = localStorage.getItem("currentOrderId");
    if (localStorage.getItem(`isBookAdded_${book._id}`)) {
      showModal("isBookAdded");
    } else {
      if (storedOrderId) {
        await dispatch(
          addToCart({ orderId: storedOrderId, productId: book._id })
        );
        const response = await dispatch(fetchOrderById(storedOrderId));
        if (response.meta.requestStatus !== "rejected") {
          setCartData(response.payload as CartData);
        }
        localStorage.setItem(`isBookAdded_${book._id}`, "true");
      }
    }
  }, [book._id, dispatch]);

  return (
    <>
      {book && (
        <BookContentWrapper>
          <BookImage id={book._id}>
            <img
              src={book.image || images.imagePlaceholder}
              alt={`${book.author} ${book.title} `}
              title={`${book.author} ${book.title} `}
              onClick={() => showModal("pic-viewer")}
            />
            <FavoriteButtonContainer>
              <FavoriteButton itemId={book._id} />
            </FavoriteButtonContainer>
            <BookImageSet>
              {book.imagesUrls.length > 0 &&
                book.imagesUrls.map((img, index) => (
                  <img
                    key={index}
                    src={img || images.imagePlaceholder}
                    alt="img"
                    onClick={() => showModal("pic-viewer", img[index])}
                  />
                ))}
            </BookImageSet>
          </BookImage>

          <BookDescription>
            <BookTitle>{book.title}</BookTitle>
            <BookSubTitle>{book.author}</BookSubTitle>
            <BookRating rating={book.rating} />
            <Description>
              <p>{book.description}</p>
            </Description>
            <Separator />
            <DescTable>
              <li>
                <span>Мова книги</span>
                <span>{book.language}</span>
              </li>
              <li>
                <span>Жанр</span>
                <span>
                  {book.genre && book.genre.length > 0 ? (
                    book.genre.join(", ")
                  ) : (
                    <span>-</span>
                  )}
                </span>
              </li>

              <li>
                <span>Формат</span>
                <>{book.format}</>
              </li>
              <li>
                <span>Обкладинка</span>
                <span>{book.cover}</span>
              </li>
              <li>
                <span>Кількість сторінок</span>
                <span>{book.pages}</span>
              </li>
              <li>
                <span>Видавництво</span>
                <span>{book.publisher}</span>
              </li>
              <li>
                <span>Рік видання</span>
                <span>{book.year}</span>
              </li>
            </DescTable>
            <Separator />
            <Description>
              {book.description && <b>Про автора</b>}
              <p>{book.description}</p>
            </Description>
          </BookDescription>
          <StyledButtonContainer>
            <Price>
              {book.price}&nbsp;грн.<span></span>
            </Price>
            <ButtonOrange onClick={handleBuy}>Купити</ButtonOrange>
            <ButtonYellow onClick={handleAddToCart}>До кошика</ButtonYellow>
          </StyledButtonContainer>
          {isModalOpen && (
            <Modal close={closeModal} showCloseButton={true} animation="slide">
              {modalContent === "pic-viewer" && (
                <PictureViewer
                  imagesUrls={book.imagesUrls}
                  image={book.image}
                />
              )}
              {modalContent === "isBookAdded" && (
                <Wrapper>
                  <TextCenter>Книга вже є в кошику!</TextCenter>
                </Wrapper>
              )}
              {modalContent === "cart" && <Cart closeCart={closeModal} />}
            </Modal>
          )}
        </BookContentWrapper>
      )}
    </>
  );
};
export default BookContent;
