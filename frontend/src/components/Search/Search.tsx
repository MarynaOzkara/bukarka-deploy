import { IBookItem } from "components/Book";
import useDebounce from "hooks/useDebounce";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  FormButton,
  Hints,
  Input,
  StyledForm,
  StyledLensIcon,
} from "./Search.styled";
import { SearchContext } from "./SearchContext";

const Search = () => {
  const { hints, loading, handleSearch, fetchHints } =
    useContext(SearchContext);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const hintsRef = useRef<HTMLUListElement>(null);

  const debouncedQuery = useDebounce(inputQuery, 500);

  const navigate = useNavigate();

  const goToSearchPage = useCallback((searchParams: Record<string, any>) => {
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/search?${queryString}`);
    setHighlightedIndex(-1);
    setShowHints(false);
  }, []);

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

  useEffect(() => {
    const handleClickOutsideHints = (event: MouseEvent) => {
      if (
        hintsRef.current &&
        !hintsRef.current.contains(event.target as Node)
      ) {
        setShowHints(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideHints);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideHints);
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
    setShowHints(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchParams = { author: inputQuery, title: inputQuery };
    handleSearch(searchParams);
    goToSearchPage(searchParams);
  };

  const handleHintClick = (hint: IBookItem) => {
    const searchParams = {
      author: hint.author?.toLowerCase().includes(inputQuery.toLowerCase())
        ? hint.author
        : "",
      title: hint.title?.toLowerCase().includes(inputQuery.toLowerCase())
        ? hint.title
        : "",
    };
    setInputQuery(searchParams.author || searchParams.title);
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
        value={inputQuery}
        onBlur={() => setInputQuery("")}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Знайти книгу"
      />
      {showHints && (
        <Hints ref={hintsRef}>
          {loading ? (
            <li>Loading...</li>
          ) : hints.length > 0 ? (
            hints.map((hint, index) => (
              <li
                className={`${index === highlightedIndex ? "highlighted" : ""}`}
                key={index}
                onClick={() => handleHintClick(hint)}
              >
                {(hint.author
                  ?.toLowerCase()
                  .includes(inputQuery.toLowerCase()) &&
                  hint.author) ||
                  (hint.title
                    ?.toLowerCase()
                    .includes(inputQuery.toLowerCase()) &&
                    hint.title)}
              </li>
            ))
          ) : (
            <li>No results</li>
          )}
        </Hints>
      )}
      <FormButton>Знайти</FormButton>
    </StyledForm>
  );
};

export default Search;
