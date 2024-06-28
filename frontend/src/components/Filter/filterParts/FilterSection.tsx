import { useState } from "react";
import { Input, TextCenter } from "styles/CommonStyled";
import { SubTitle } from "../Filter.styled";

interface IProps<T> {
  options: T[];
  placeholder?: string;
}

const FilterSection = <T extends { [key: string]: string[] }>({
  options,
  placeholder,
}: IProps<T>) => {
  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showAll ? options : options.slice(0, 6);

  const optionKey = Object.keys(options[0])[0];

  const handleToggleShow = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };
  return (
    <>
      {/* {visibleOptions.length > 0 &&
        visibleOptions.map((option, index) => (
          <p key={index}>
            <input
              type="checkbox"
              id={option[optionKey]}
              name={optionKey}
              value={option[optionKey]}
            />
            <label htmlFor={option[optionKey]}>{option[optionKey]}</label>
          </p>
        ))}

      {options.length > 6 && (
        <TextCenter className="more" onClick={handleToggleShow}>
          {showAll ? "Показати менше" : "Показати більше"}
        </TextCenter>
      )} */}
    </>
  );
};

export default FilterSection;
