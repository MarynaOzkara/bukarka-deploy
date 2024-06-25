import React from "react";
import { PaginationWrapper } from "./Pagination.styled";
import { SliderArrowIcon } from "assets/icons";
import { Button } from "styles/CommonStyled";

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

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pageNumbers.push(
        <button
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    if (totalPages > 5) {
      pageNumbers.push(<span key="ellipsis">...</span>);
      pageNumbers.push(
        <button
          key={totalPages}
          className={totalPages === currentPage ? "active" : ""}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <PaginationWrapper>
      <button className="arrow" disabled={currentPage === 1}>
        <SliderArrowIcon
          stroke="var(--bukarka-dark-grey)"
          style={{ transform: "rotate(180deg)" }}
          onClick={handlePrevious}
        />
      </button>

      {renderPageNumbers()}

      <button className="arrow" disabled={currentPage === totalPages}>
        <SliderArrowIcon
          stroke="var(--bukarka-dark-grey)"
          onClick={handleNext}
        />
      </button>
    </PaginationWrapper>
  );
};

export default Pagination;
