import { useBooks } from "components/Book";
import useDebounce from "hooks/useDebounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBookItem } from "types/Books";
import {
  FormButton,
  Hints,
  SearchInput,
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
      navigate(`/search?${new URLSearchParams(searchParams).toString()}`);
      setShowHints(false);
      setHighlightedIndex(-1);
    },
    [navigate]
  );

  useEffect(() => {
    if (debouncedQuery && !isHintSelected) {
      fetchHints({ keyword: debouncedQuery });
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
      if (!hintsRef.current?.contains(event.target as Node)) {
        setShowHints(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideHints);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideHints);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
    setIsHintSelected(false);
    setShowHints(!!event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputQuery.trim()) {
      goToSearchPage({ keyword: inputQuery.trim(), page: "1" });
    }
  };

  const handleHintClick = (hint: IBookItem) => {
    const searchKey = hint.author
      ?.toLowerCase()
      .includes(inputQuery.toLowerCase())
      ? hint.author
      : hint.title;
    setInputQuery(searchKey);
    setIsHintSelected(true);
    goToSearchPage({ keyword: searchKey, page: "1" });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        setHighlightedIndex((index) => (index + 1) % hints.length);
        break;
      case "ArrowUp":
        setHighlightedIndex(
          (index) => (index - 1 + hints.length) % hints.length
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          event.preventDefault();
          handleHintClick(hints[highlightedIndex]);
        }
        break;
      case "Escape":
        setShowHints(false);
        break;
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLensIcon />
      <SearchInput
        type="text"
        value={inputQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={() => setInputQuery("")}
        placeholder="Знайти книгу"
        aria-label="Search books"
      />
      {showHints && (
        <Hints ref={hintsRef} aria-label="Search suggestions">
          {hints.length > 0 ? (
            hints.map((hint, index) => (
              <li
                key={index}
                className={index === highlightedIndex ? "highlighted" : ""}
                onClick={() => handleHintClick(hint)}
              >
                {hint.author || hint.title}
              </li>
            ))
          ) : (
            <li>No results</li>
          )}
        </Hints>
      )}
      <FormButton type="submit">Знайти</FormButton>
    </StyledForm>
  );
};

export default Search;
