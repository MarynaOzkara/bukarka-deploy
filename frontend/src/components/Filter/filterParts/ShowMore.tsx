import { useState } from "react";
import { TextCenter } from "styles/CommonStyled";

interface IProps {
  options: string[];
  initialVisibleCount?: number;
  onChange: (value: string) => void;
  selected?: string[];
  optionName?: string;
}

const ShowMore: React.FC<IProps> = ({
  optionName,
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

  const handleCheckboxChange = (option: string) => {
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <>
      {options.slice(0, visibleCount).map((option, index) => (
        <p key={index}>
          <input
            type="checkbox"
            id={option}
            name={optionName}
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
        options.length > initialVisibleCount && (
          <TextCenter className="more" onClick={handleShowLess}>
            Показати менше
          </TextCenter>
        )
      )}
    </>
  );
};

export default ShowMore;
