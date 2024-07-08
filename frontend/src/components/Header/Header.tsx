import { Search } from "components";
import Catalog from "components/Catalog";
import Modal from "components/Modal";
import UserMenu from "components/UserMenu";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ButtonWrapper,
  CommonWrapper,
  DesktopLogo,
  LogoWrapper,
  MobileLogo,
  StyledHeader,
  UserMenuWrapper,
  Wrapper,
} from "./Header.styled";
import CatalogButton from "components/CatalogButton";

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
    <>
      <StyledHeader>
        <CommonWrapper>
          <Wrapper>
            <Link to="/">
              <LogoWrapper>
                <MobileLogo className="small-logo" />
                <DesktopLogo className="large-logo" />
              </LogoWrapper>
            </Link>
            <ButtonWrapper>
              <CatalogButton onClick={() => showModal("catalog")} />
            </ButtonWrapper>
            <Search placeholder="Знайти книгу" hasButton />
            <UserMenuWrapper>
              <UserMenu />
            </UserMenuWrapper>
          </Wrapper>
        </CommonWrapper>
      </StyledHeader>
      {isModalOpen && (
        <Modal close={closeModal} showCloseButton={false} animation="slide">
          {modalContent === "catalog" && <Catalog closeModal={closeModal} />}
        </Modal>
      )}
    </>
  );
};

export default Header;
