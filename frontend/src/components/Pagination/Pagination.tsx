import React from "react";
import { PaginationWrapper } from "./Pagination.styled";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
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
    <PaginationWrapper>
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
    </PaginationWrapper>
  );
};

export default Pagination;
