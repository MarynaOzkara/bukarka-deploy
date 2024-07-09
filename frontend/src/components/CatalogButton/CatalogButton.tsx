import { StyledBurgerIcon, StyledCatalogButton } from "./CatalogButton.styled";

interface CatalogButtonProps {
  onClick: () => void;
}

const CatalogButton: React.FC<CatalogButtonProps> = ({ onClick }) => {
  return (
    <StyledCatalogButton onClick={onClick}>
      <StyledBurgerIcon />
      <span>Каталог</span>
    </StyledCatalogButton>
  );
};

export default CatalogButton;
