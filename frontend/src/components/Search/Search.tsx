import { useBooks } from "components/Book";
import useDebounce from "hooks/useDebounce";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { IBookItem } from "types/Books";
import {
  FormButton,
  Hints,
  Input,
  StyledForm,
  StyledLensIcon,
} from "./Search.styled";

const Search: React.FC = () => {
  const { hints, fetchHints } = useBooks();
  const [inputQuery, setInputQuery] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isHintSelected, setIsHintSelected] = useState<boolean>(false);

  const hintsRef = useRef<HTMLUListElement>(null);

  const debouncedQuery = useDebounce(inputQuery, 500);

  const navigate = useNavigate();

  const goToSearchPage = useCallback(
    (searchParams: Record<string, any>) => {
      const queryString = new URLSearchParams(searchParams).toString();
      navigate(`/search?${queryString}`);
      setHighlightedIndex(-1);
      setShowHints(false);
    },
    [navigate]
  );

  useEffect(() => {
    if (debouncedQuery && !isHintSelected) {
      fetchHints(debouncedQuery);
      setShowHints(true);
    } else {
      setShowHints(false);
    }
  }, [debouncedQuery, fetchHints, isHintSelected]);

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
      setHighlightedIndex(-1);
    };

    document.addEventListener("mousedown", handleClickOutsideHints);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideHints);
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
    setIsHintSelected(false);
    setShowHints(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goToSearchPage({ keyword: inputQuery, page: "1" });
  };

  const handleHintClick = (hint: IBookItem) => {
    if (hint) {
      const author = hint.author
        ?.toLowerCase()
        .includes(inputQuery.toLowerCase())
        ? hint.author
        : "";
      const title = hint.title?.toLowerCase().includes(inputQuery.toLowerCase())
        ? hint.title
        : "";

      setInputQuery(author || title);
      setIsHintSelected(true);
      goToSearchPage({ keyword: author || title, page: "1" });
    }
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
          {!!hints && !!hints.length ? (
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
