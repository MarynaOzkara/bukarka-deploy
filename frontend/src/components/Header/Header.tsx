import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ButtonWrapper,
  CatalogButton,
  FormButton,
  Input,
  StyledForm,
  StyledHeader,
  StyledLensIcon,
  StyledLogo,
  Wrapper,
} from "./Header.styled";
import Catalog from "components/Catalog";
import Modal from "components/Modal";
import UserMenu from "components/UserMenu";
import { BurgerIcon, LensIcon } from "assets/icons";
import { StyledCommonWrapper } from "styles/CommonStyled";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleValueChange = () => {};

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
          <StyledForm>
            <StyledLensIcon />
            <Input
              type="text"
              value=""
              onChange={handleValueChange}
              placeholder="Знайти книгу"
            />
            <FormButton>Знайти</FormButton>
          </StyledForm>
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
