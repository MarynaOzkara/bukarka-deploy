import { Link } from "react-router-dom";
import { StyledLabel } from "./CategoryPoster.styled";

interface IProps {
  title: string;
}
const CategoryPoster: React.FC<IProps> = ({ title }) => {
  return (
    <StyledLabel>
      <Link to={`/catalog`}>
        <span>{title}</span>
      </Link>
    </StyledLabel>
  );
};

export default CategoryPoster;
