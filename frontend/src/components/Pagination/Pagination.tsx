import React from "react";
import { SliderArrowIcon } from "assets/icons";
import theme from "styles/theme";
import { PaginationWrapper } from "./Pagination.styled";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const { colors } = theme;

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
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
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

    if (endPage < totalPages) {
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
          stroke={colors.text.secondary}
          style={{ transform: "rotate(180deg)" }}
          onClick={handlePrevious}
        />
      </button>

      {renderPageNumbers()}

      <button className="arrow" disabled={currentPage === totalPages}>
        <SliderArrowIcon stroke={colors.text.secondary} onClick={handleNext} />
      </button>
    </PaginationWrapper>
  );
};

export default Pagination;
