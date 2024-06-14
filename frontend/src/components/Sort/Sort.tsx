import { Options } from "./Sort.styled";

const Sort = () => {
  const options = [
    { key: "rating", label: "За рейтингом" },
    { key: "new", label: "За новизною" },
    { key: "titleAsc", label: "За назвою А-Я" },
    { key: "titleDesc", label: "За назвою Я-А" },
    { key: "priceUp", label: "Від найдешевших" },
    { key: "priceDown", label: "Від найдорожчих" },
    { key: "year", label: "За роком випуску" },
  ];

  return (
    <form>
      <Options name="sort">
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
    </form>
  );
};

export default Sort;
