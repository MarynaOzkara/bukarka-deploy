import { Subcategory } from "types/Books";
import { hasData } from "utils/hasData";
import { StyledItem } from "../Catalog.styled";

interface IProps {
  category: string;
  subcategory: string;
  links: string[];
}

const SeparateSubcategory: React.FC<IProps> = ({
  category,
  subcategory,
  links,
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
            >
              {link}
            </StyledItem>
          </li>
        ))}
    </ul>
  );
};
export default SeparateSubcategory;
