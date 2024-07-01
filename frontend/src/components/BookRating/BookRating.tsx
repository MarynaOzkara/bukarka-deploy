import { useMemo } from "react";
import ReactStars from "react-rating-stars-component";
import { StarsWrapper, StyledStarIcon } from "./BookRating.styled";

interface IRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
}

const BookRating: React.FC<IRatingProps> = ({ rating }) => {
  const starsProps = useMemo(
    () => ({
      size: 20,
      count: 5,
      edit: false,
      color: "#fffbff",
      activeColor: "#ffd700",
      emptyIcon: <StyledStarIcon $fillColor="var(--bukarka-white)" />,
      filledIcon: <StyledStarIcon $fillColor="var(--bukarka-yellow)" />,
    }),
    []
  );
  return (
    <StarsWrapper>
      <ReactStars {...starsProps} value={rating} />
    </StarsWrapper>
  );
};

export default BookRating;
