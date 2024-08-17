import { useEffect, useMemo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { StarsWrapper, StyledStarIcon } from "./BookRating.styled";
import theme from "styles/theme";

const { colors } = theme;
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
      emptyIcon: <StyledStarIcon $fillColor={colors.background.primary} />,
      filledIcon: <StyledStarIcon $fillColor={colors.accent.yellow} />,
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
