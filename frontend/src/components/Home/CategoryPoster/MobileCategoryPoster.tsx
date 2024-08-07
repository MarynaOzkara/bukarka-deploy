import { Link } from "react-router-dom";
import { StyledLabel } from "./CategoryPoster.styled";

interface IProps {
  title: string;
  filterParams?: string;
}
const CategoryPoster: React.FC<IProps> = ({ title, filterParams }) => {
  return (
    <StyledLabel>
      <Link to={`/catalog?${new URLSearchParams(filterParams).toString()}`}>
        <span>{title}</span>
      </Link>
    </StyledLabel>
  );
};

export default CategoryPoster;
