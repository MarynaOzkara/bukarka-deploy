import { useMemo } from "react";
import ReactStars from "react-rating-stars-component";
import { StarsWrapper, StyledStarIcon } from "./BookRating.styled";

interface IRatingProps {
  rating: number | undefined;
  onChange?: (rating: number) => void;
  editable?: boolean;
}

const BookRating: React.FC<IRatingProps> = ({
  rating,
  onChange,
  editable = false,
}) => {
  const starsProps = useMemo(
    () => ({
      size: 20,
      count: 5,
      edit: editable,
      color: "#fffbff",
      activeColor: "#ffd700",
      emptyIcon: <StyledStarIcon $fillColor="var(--bukarka-white)" />,
      filledIcon: <StyledStarIcon $fillColor="var(--bukarka-yellow)" />,
      onChange: editable ? onChange : undefined,
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
