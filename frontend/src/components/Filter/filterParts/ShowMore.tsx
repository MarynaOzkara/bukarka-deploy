import { useState } from "react";
import { TextCenter } from "styles/CommonStyled";

interface IProps {
  options: string[];
  initialVisibleCount?: number;
  selected?: string[];
  onChange: (value: string) => void;
}

const ShowMore: React.FC<IProps> = ({
  options,
  initialVisibleCount = 6,
  selected,
  onChange,
}) => {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const handleToggleShow = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 6, options.length));
  };

  const handleShowLess = () => {
    setVisibleCount(initialVisibleCount);
  };

  const handleCheckboxChange = (category: string) => {
    if (onChange) {
      onChange(category);
    }
  };

  return (
    <>
      {options.slice(0, visibleCount).map((option, index) => (
        <p key={index}>
          <input
            type="checkbox"
            id={option}
            name={option}
            value={option}
            checked={selected?.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          <label htmlFor={option}> {option} </label>
        </p>
      ))}
      {visibleCount < options.length ? (
        <TextCenter className="more" onClick={handleToggleShow}>
          Показати більше
        </TextCenter>
      ) : (
        <TextCenter className="more" onClick={handleShowLess}>
          Показати менше
        </TextCenter>
      )}
    </>
  );
};

export default ShowMore;
