import { hasData } from "utils/hasData";
import { StyledItem } from "../Catalog.styled";

interface IProps {
  category: string;
  subcategory: string;
  links: string[];
  closeParentModal: () => void;
  closeModal?: () => void;
}

const LinksSection: React.FC<IProps> = ({
  category,
  subcategory,
  links,
  closeParentModal,
  closeModal,
}) => {
  const hasLinks = hasData(links);

  return (
    <ul>
      {hasLinks &&
        links.map((link: string, linkIndex: number) => (
          <li key={linkIndex}>
            <StyledItem
              onClick={closeParentModal}
              to={`/catalog/${encodeURIComponent(
                category
              )}/${encodeURIComponent(subcategory)}/${encodeURIComponent(
                link
              )}`}
            >
              {link}
            </StyledItem>
          </li>
        ))}
    </ul>
  );
};

export default LinksSection;
