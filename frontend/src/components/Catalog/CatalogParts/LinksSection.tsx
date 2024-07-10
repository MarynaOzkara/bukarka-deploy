import { hasData } from "utils/hasData";
import { StyledItem } from "../Catalog.styled";

interface IProps {
  subcategory: string;
  links: string[];
  closeModal: () => void;
}

const SubcategoriesSection: React.FC<IProps> = ({
  subcategory,
  links,
  closeModal,
}) => {
  const hasLinks = hasData(links);

  console.log(links);

  return (
    <ul>
      {hasLinks &&
        links.map((link: string, linkIndex: number) => (
          <li key={linkIndex}>
            <StyledItem
              to={`/catalog/${encodeURI(subcategory)}/${encodeURI(link)}`}
              onClick={closeModal}
            >
              {link}
            </StyledItem>
          </li>
        ))}
    </ul>
  );
};

export default SubcategoriesSection;
