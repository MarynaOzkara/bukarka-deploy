import { ChangeEvent } from "react";
import { Options } from "./Sort.styled";

interface ISortProps {
  onSortChange: (sortKey: string) => void;
}

const Sort: React.FC<ISortProps> = ({ onSortChange }) => {
  const options = [
    { key: "rating", label: "За рейтингом" },
    { key: "new", label: "За новизною" },
    { key: "titleAsc", label: "За назвою А-Я" },
    { key: "titleDesc", label: "За назвою Я-А" },
    { key: "priceUp", label: "Від найдешевших" },
    { key: "priceDown", label: "Від найдорожчих" },
    { key: "year", label: "За роком випуску" },
  ];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <Options name="sort" onChange={handleChange}>
      <optgroup>
        <option className="section" value="" selected disabled>
          Сортування:
        </option>
      </optgroup>

      {options.map((option, index) => (
        <optgroup>
          <option value={option.key} key={index}>
            {option.label}
          </option>
        </optgroup>
      ))}
    </Options>
  );
};

export default Sort;
