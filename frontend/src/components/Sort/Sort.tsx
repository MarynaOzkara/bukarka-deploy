import { ChangeEvent } from "react";
import { Options } from "./Sort.styled";
import { options } from "constants/sort";

interface ISortProps {
  onSortChange: (sortKey: string, order: string) => void;
}

const Sort: React.FC<ISortProps> = ({ onSortChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.label === selectedValue
    );

    if (selectedOption) {
      onSortChange(selectedOption.sortBy, selectedOption.order);
    }
  };

  return (
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
  );
};

export default Sort;
