import { ChangeEvent } from "react";
import { Options } from "./Sort.styled";

interface ISortProps {
  onSortChange: (sortKey: string, order: string) => void;
}

const Sort: React.FC<ISortProps> = ({ onSortChange }) => {
  const options = [
    { label: "За рейтингом", sortBy: "rating", order: "desc" },
    { label: "За назвою А-Я", sortBy: "title", order: "asc" },
    {
      label: "За назвою Я-А",
      sortBy: "title",
      order: "desc",
    },
    { label: "Від найдешевших", sortBy: "price", order: "asc" },
    {
      label: "Від найдорожчих",
      sortBy: "price",
      order: "desc",
    },
    { label: "За роком випуску", sortBy: "year", order: "asc" },
  ];

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
    <Options name="sort" onChange={handleChange}>
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
