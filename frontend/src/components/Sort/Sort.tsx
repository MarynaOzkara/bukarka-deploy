import { options } from "constants/sort";
import { ChangeEvent } from "react";
import {
  ButtonContainer,
  ButtonGreyYellowStyled,
  Options,
} from "./Sort.styled";

interface ISortProps {
  onSortChange: (sortKey: string, order: string) => void;
  isDesktop?: boolean;
}

const Sort: React.FC<ISortProps> = ({ onSortChange, isDesktop }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.label === selectedValue
    );

    if (selectedOption) {
      onSortChange(selectedOption.sortBy, selectedOption.order);
    }
  };

  return isDesktop ? (
    <Options name="sort" onChange={handleChange} aria-labelledby="Сортування:">
      <optgroup>
        <option className="section">Сортування:</option>
        {options.map((option, index) => (
          <option value={option.label} key={index}>
            {option.label}
          </option>
        ))}
      </optgroup>
      {/*  Just to keep indent  */}
      <optgroup></optgroup>
    </Options>
  ) : (
    <ButtonContainer>
      <div className="sort-buttons">
        {options.map((option, index) => (
          <ButtonGreyYellowStyled
            key={index}
            className="sort-button"
            onClick={() => onSortChange(option.sortBy, option.order)}
          >
            {option.label}
          </ButtonGreyYellowStyled>
        ))}
      </div>
    </ButtonContainer>
  );
};

export default Sort;
