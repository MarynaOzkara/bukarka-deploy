import { AvatarIcon, CartIcon, HeartIcon } from "assets/icons";
import {
  AuthButton,
  CartButton,
  FavoriteButton,
  IconWrapper,
  StyledUserMenu,
  UserMenuItem,
} from "./UserMenu.styled";
import { useState } from "react";
import Modal from "components/Modal";
import Login from "components/Auth/Login/Login";
import Cart from "components/Cart";
import { useNavigate } from "react-router-dom";

const UserMenu: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const navigate = useNavigate();

  const goToFavorites = () => {
    navigate("/favorites");
  };

  const showModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <StyledUserMenu>
        <UserMenuItem>
          <FavoriteButton onClick={goToFavorites}>
            <IconWrapper>
              <HeartIcon />
            </IconWrapper>
            Обране
          </FavoriteButton>
        </UserMenuItem>

        <UserMenuItem>
          <CartButton onClick={openCart}>
            <IconWrapper>
              <CartIcon />
            </IconWrapper>
            Кошик
          </CartButton>
        </UserMenuItem>

        <UserMenuItem>
          <AuthButton onClick={() => showModal("auth")}>
            <IconWrapper>
              <AvatarIcon />
            </IconWrapper>
            Вхід&nbsp;/&nbsp;Реєстрація
          </AuthButton>
        </UserMenuItem>
      </StyledUserMenu>
      {isModalOpen && (
        <Modal close={closeModal} showCloseButton={true}>
          {modalContent === "auth" && (
            <Login title="Вхід до акаунту" prompt="Реєстрація нового акаунту" />
          )}
        </Modal>
      )}

      {isCartOpen && (
        <Modal close={closeCart} showCloseButton={true}>
          <Cart closeCart={closeCart} />
        </Modal>
      )}
    </>
  );
};

export default UserMenu;
