import { StyledPoster } from "./CategoryPoster.styled";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  filterParams?: string;
}
const CategoryPoster: React.FC<IProps> = ({ title, filterParams }) => {
  return (
    <StyledPoster>
      <Link to={`/catalog?${new URLSearchParams(filterParams).toString()}`}>
        <span>{title}</span>
      </Link>
    </StyledPoster>
  );
};

export default CategoryPoster;
