import { IBookItem } from "components/Book";
import useDebounce from "hooks/useDebounce";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
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
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const { hints, loading, handleSearch, fetchHints } =
    useContext(SearchContext);
  const [query, setQuery] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const hintsRef = useRef<HTMLUListElement>(null);

  const debouncedQuery = useDebounce(query, 1500);

  const navigate = useNavigate();

  const goToCatalog = (query: string) => {
    setShowHints(false);
    navigate(`/catalog?query=${query}`);
    setHighlightedIndex(-1);
    setQuery("");
  };

  useEffect(() => {
    if (debouncedQuery) {
      fetchHints({ title: debouncedQuery, author: debouncedQuery });
      setShowHints(true);
    } else {
      setShowHints(false);
    }
  }, [debouncedQuery, fetchHints]);

  useEffect(() => {
    if (
      hintsRef.current &&
      highlightedIndex >= 0 &&
      highlightedIndex < hints.length
    ) {
      const activeItem = hintsRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex, hints]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    if (event.target.value) {
      fetchHints({
        title: event.target.value,
        author: event.target.value,
      });
    }
    setShowHints(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch({ title: query, author: query });
    goToCatalog(query);
  };

  const handleHintClick = (hint: IBookItem) => {
    setQuery(hint.title || hint.author);
    handleSearch({ title: hint.title, author: hint.author });
    goToCatalog(query);
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
        <Hints ref={hintsRef}>
          {loading ? (
            <li>Loading...</li>
          ) : (
            hints.map(
              (hint, index) =>
                hint && (
                  <li
                    className={`${
                      index === highlightedIndex ? "highlighted" : ""
                    }`}
                    key={index}
                    onClick={() => handleHintClick(hint)}
                  >
                    {(hint.author
                      ?.toLowerCase()
                      .includes(query.toLowerCase()) &&
                      hint.author) ||
                      (hint.title
                        ?.toLowerCase()
                        .includes(query.toLowerCase()) &&
                        hint.title)}
                  </li>
                )
            )
          )}
        </Hints>
      )}

      <FormButton>Знайти</FormButton>
    </StyledForm>
  );
};
