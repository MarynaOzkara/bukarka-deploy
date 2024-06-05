import { BurgerIcon } from "assets/icons";
import Catalog from "components/Catalog";
import Modal from "components/Modal";
import { Search } from "components/Search/Search";
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
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
            <CatalogButton onClick={toggleModal}>
              <BurgerIcon />
              Каталог
            </CatalogButton>
          </ButtonWrapper>
          <Search />
          <UserMenu />
        </Wrapper>
      </StyledHeader>
      {isModalOpen && (
        <Modal close={closeModal} showCloseButton={false} animation="slide">
          <Catalog />
        </Modal>
      )}
    </StyledCommonWrapper>
  );
};

export default Header;
