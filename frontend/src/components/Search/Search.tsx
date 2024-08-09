import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooks } from "components/Book";
import useDebounce from "hooks/useDebounce";
import { IBookItem } from "types/Books";
import { hasData } from "utils/hasData";
import { LensIcon } from "assets/icons";
import {
  FormButtonDesktop,
  FormButtonMobile,
  SearchInput,
  StyledForm,
  StyledHints,
  StyledLensIcon,
} from "./Search.styled";

interface IProps {
  placeholder?: string;
  hasButton?: boolean;
}

const Search: React.FC<IProps> = ({ placeholder, hasButton }) => {
  const { bookHints, fetchBooksHints } = useBooks();
  const [inputQuery, setInputQuery] = useState<string>("");
  const [showHints, setShowHints] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isHintSelected, setIsHintSelected] = useState<boolean>(false);
  const [isValid, setIsValid] = useState(true);

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
      fetchBooksHints({ keyword: debouncedQuery });

      setShowHints(true);
    } else {
      setShowHints(false);
    }
  }, [debouncedQuery, isHintSelected]);

  useEffect(() => {
    if (
      hintsRef.current &&
      highlightedIndex >= 0 &&
      highlightedIndex < bookHints.length
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
  }, [highlightedIndex, bookHints]);

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
    const inputValue = event.target.value;

    const pattern = new RegExp(
      "^(?!.*(.)\\1{2})[a-zA-Z\u0400-\u04FF\\s-]*(?:[0-9]{1,2})?[a-zA-Z\u0400-\u04FF\\s-]*$"
    );
    const isValidInput = pattern.test(inputValue);

    if (isValidInput || inputValue.length < inputQuery.length) {
      setInputQuery(inputValue);
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setIsHintSelected(false);
    setShowHints(!!inputValue);
  };

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
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
        setHighlightedIndex((index) => (index + 1) % bookHints.length);
        break;
      case "ArrowUp":
        setHighlightedIndex(
          (index) => (index - 1 + bookHints.length) % bookHints.length
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          event.preventDefault();
          handleHintClick(bookHints[highlightedIndex]);
        }
        break;
      case "Escape":
        setShowHints(false);
        break;
    }
  };

  const hasHints = hasData(bookHints);

  return (
    <StyledForm onSubmit={handleSubmit}>
      {hasButton && <StyledLensIcon />}
      <SearchInput
        type="text"
        maxLength={20}
        value={inputQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search books"
        className={!isValid ? "error" : ""}
      />
      {showHints && (
        <StyledHints ref={hintsRef} aria-label="Search suggestions">
          {hasHints ? (
            bookHints.map((hint: IBookItem, index: number) => (
              <li
                key={index}
                className={index === highlightedIndex ? "highlighted" : ""}
                onClick={() => handleHintClick(hint)}
              >
                {(hint.author
                  .toLowerCase()
                  .includes(inputQuery.toLowerCase()) &&
                  hint.author) ||
                  (hint.title
                    .toLowerCase()
                    .includes(inputQuery.toLowerCase()) &&
                    hint.title)}
              </li>
            ))
          ) : (
            <li>No results</li>
          )}
        </StyledHints>
      )}
      {hasButton && (
        <>
          <FormButtonDesktop type="submit">Знайти</FormButtonDesktop>
          <FormButtonMobile
            type="submit"
            aria-label="Search button"
            onClick={handleSubmit}
          >
            <LensIcon />
          </FormButtonMobile>
        </>
      )}
    </StyledForm>
  );
};

export default Search;
