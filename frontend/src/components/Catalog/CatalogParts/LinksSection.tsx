import { hasData } from "utils/hasData";
import { StyledItem } from "../Catalog.styled";
import { useEffect } from "react";

interface IProps {
  category: string;
  subcategory: string;
  links: string[];
  closeModal: () => void;
}

const LinksSection: React.FC<IProps> = ({
  category,
  subcategory,
  links,
  closeModal,
}) => {
  const hasLinks = hasData(links);

  return (
    <ul>
      {hasLinks &&
        links.map((link: string, linkIndex: number) => (
          <li key={linkIndex}>
            <StyledItem
              to={`/catalog/${encodeURIComponent(
                category
              )}/${encodeURIComponent(subcategory)}/${encodeURIComponent(
                link
              )}`}
              onClick={closeModal}
            >
              {link}
            </StyledItem>
          </li>
        ))}
    </ul>
  );
};

export default LinksSection;
