import { BurgerIcon } from "assets/icons";
import Catalog from "components/Catalog";
import Modal from "components/Modal";
import UserMenu from "components/UserMenu";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledCommonWrapper } from "styles/CommonStyled";
import {
  ButtonWrapper,
  CatalogButton,
  StyledHeader,
  StyledLogo,
  Wrapper,
} from "./Header.styled";
import { Search } from "components";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const navigate = useNavigate();

  const goToCatalog = useCallback(
    (searchParams: Record<string, any>) => {
      const queryString = new URLSearchParams(searchParams).toString();
      navigate(`/catalog?${queryString}`);
    },
    [navigate]
  );

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
            <CatalogButton>
              <BurgerIcon onClick={() => showModal("catalog")} />
              <span onClick={goToCatalog}>Каталог</span>
            </CatalogButton>
          </ButtonWrapper>
          <Search />
          <UserMenu />
        </Wrapper>
      </StyledHeader>
      {isModalOpen && (
        <Modal close={closeModal} showCloseButton={false} animation="slide">
          {modalContent === "catalog" && <Catalog />}
        </Modal>
      )}
    </StyledCommonWrapper>
  );
};

export default Header;
