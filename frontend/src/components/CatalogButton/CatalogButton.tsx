import { BurgerIcon } from "assets/icons";
import { StyledCatalogButton } from "./CatalogButton.styled";

interface CatalogButtonProps {
  onClick: () => void;
}

const CatalogButton: React.FC<CatalogButtonProps> = ({ onClick }) => {
  return (
    <StyledCatalogButton onClick={onClick}>
      <BurgerIcon />
      <span>Каталог</span>
    </StyledCatalogButton>
  );
};

export default CatalogButton;
