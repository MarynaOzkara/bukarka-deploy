import React from "react";
import { FlexWrapper } from "styles/CommonStyled";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <FlexWrapper
      style={{
        margin: "2rem auto",
        maxWidth: "15rem",
        color: "var(--bukarka-dark-grey)",
        alignItems: "center",
      }}
    >
      <button
        className="material-symbols-outlined"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        arrow_back
      </button>

      <span>
        <small> Page </small> <b> {currentPage} </b> <small> of </small>
        <b> {totalPages} </b>
      </span>

      <button
        className="material-symbols-outlined"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        arrow_forward
      </button>
    </FlexWrapper>
  );
};

export default Pagination;
