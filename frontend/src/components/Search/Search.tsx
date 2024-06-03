import { IBookItem } from "components/Book";
import useDebounce from "hooks/useDebounce";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FormButton,
  Hints,
  Input,
  StyledForm,
  StyledLensIcon,
} from "./Search.styled";
import { SearchContext } from "./SearchContext";

export const Search = () => {
  const { hints, handleSearch, fetchHints, filterHints } =
    useContext(SearchContext);
  const [query, setQuery] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const debouncedQuery = useDebounce(query, 300);

  // useEffect(() => {
  //   if (debouncedQuery) {
  //     fetchHints({ title: debouncedQuery, author: debouncedQuery });
  //     setShowHints(true);
  //   } else {
  //     setShowHints(false);
  //   }
  // }, [debouncedQuery, fetchHints]);

  useEffect(() => {
    if (debouncedQuery) {
      filterHints(debouncedQuery);
      setShowHints(true);
    } else {
      setShowHints(false);
    }
  }, [debouncedQuery, filterHints]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (event.target.value) {
      // fetchHints({
      //   title: event.target.value,
      //   author: event.target.value,
      // });
      filterHints(event.target.value);
    }
    setShowHints(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch({ title: query, author: query });
    setShowHints(false);
  };

  const handleHintClick = (hint: IBookItem) => {
    setQuery(hint.title || hint.author);
    handleSearch({ title: hint.title, author: hint.author });
    setShowHints(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex === hints.length - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex <= 0 ? hints.length - 1 : prevIndex - 1
      );
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault();
      handleHintClick(hints[highlightedIndex]);
    } else if (event.key === "Escape") {
      setShowHints(false);
    }
  };

  console.log(hints);

  useEffect(() => {
    console.log(showHints);
    if (!showHints) {
      setHighlightedIndex(-1);
    }
  }, [showHints]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLensIcon />
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Знайти книгу"
      />

      {showHints && hints.length > 0 && (
        <Hints>
          {hints.map(
            (hint, index) =>
              hint && (
                <li
                  className={`${
                    index === highlightedIndex ? "highlighted" : ""
                  }`}
                  key={index}
                  onClick={() => handleHintClick(hint)}
                >
                  {(hint.author.includes(query) && hint.author) ||
                    (hint.title.includes(query) && hint.title)}
                </li>
              )
          )}
        </Hints>
      )}

      <FormButton>Знайти</FormButton>
    </StyledForm>
  );
};
