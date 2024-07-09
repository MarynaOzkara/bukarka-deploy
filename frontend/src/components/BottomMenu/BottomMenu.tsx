import { useState } from "react";
import CatalogButton from "components/CatalogButton";
import Modal from "components/Modal";
import Catalog from "components/Catalog";
import UserMenu from "components/UserMenu";
import {
  ButtonWrapper,
  CommonWrapper,
  StyledBottomMenu,
  UserMenuWrapper,
} from "./BottomMenu.styled";

const BottomMenu: React.FC = () => {
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
      <StyledBottomMenu>
        <CommonWrapper>
          <ButtonWrapper>
            <CatalogButton onClick={() => showModal("catalog")} />
            <span>Каталог</span>
          </ButtonWrapper>

          <UserMenuWrapper>
            <UserMenu />
          </UserMenuWrapper>
        </CommonWrapper>
      </StyledBottomMenu>
      {isModalOpen && (
        <Modal close={closeModal} showCloseButton={false} animation="slide">
          {modalContent === "catalog" && <Catalog closeModal={closeModal} />}
        </Modal>
      )}
    </>
  );
};

export default BottomMenu;
