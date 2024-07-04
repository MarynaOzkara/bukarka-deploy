import { useEffect, useMemo, useState } from "react";
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
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleRatingChange = useMemo(
    () => (newRating: number) => {
      setCurrentRating(newRating);
      if (onChange) {
        onChange(newRating);
      }
    },
    []
  );

  const starsProps = useMemo(
    () => ({
      size: 20,
      count: 5,
      edit: editable,
      color: "#fffbff",
      activeColor: "#ffd700",
      emptyIcon: <StyledStarIcon $fillColor="var(--bukarka-white)" />,
      filledIcon: <StyledStarIcon $fillColor="var(--bukarka-yellow)" />,
      onChange: editable ? handleRatingChange : undefined,
    }),
    [editable, handleRatingChange]
  );

  return (
    <StarsWrapper>
      <ReactStars {...starsProps} value={currentRating} />
    </StarsWrapper>
  );
};

export default BookRating;
