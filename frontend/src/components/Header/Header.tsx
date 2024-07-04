import { BurgerIcon } from "assets/icons";
import { Search } from "components";
import Catalog from "components/Catalog";
import Modal from "components/Modal";
import UserMenu from "components/UserMenu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { StyledCommonWrapper } from "styles/CommonStyled";
import {
  ButtonWrapper,
  CatalogButton,
  StyledHeader,
  StyledLogo,
  Wrapper,
} from "./Header.styled";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const showModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent("");
    setIsModalOpen(false);
  };

  return (
    <StyledCommonWrapper>
      <StyledHeader>
        <Wrapper>
          <Link to="/">
            <StyledLogo />
          </Link>
          <ButtonWrapper>
            <CatalogButton onClick={() => showModal("catalog")}>
              <BurgerIcon />
              <span>Каталог</span>
            </CatalogButton>
          </ButtonWrapper>
          <Search placeholder="Знайти книгу" hasButton />
          <UserMenu />
        </Wrapper>
      </StyledHeader>
      {isModalOpen && (
        <Modal close={closeModal} showCloseButton={false} animation="slide">
          {modalContent === "catalog" && <Catalog closeModal={closeModal} />}
        </Modal>
      )}
    </StyledCommonWrapper>
  );
};

export default Header;
