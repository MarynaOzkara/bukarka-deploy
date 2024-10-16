import { Pagination, Sort } from "components";
import { useBooks } from "components/Book";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import Filter from "components/Filter";
import { PageLayout } from "components/Layout";
import Modal from "components/Modal";
import Subscribe from "components/Subscribe";
import { breakpoints } from "constants/breakpoints";
import { adjustAgeValue } from "constants/catalog";
import { BreadCrumbs, Label } from "pages/CommonPages.styled";
import { Link } from "react-router-dom";
import { ButtonGreyYellow } from "styles/CommonStyled";
import { hasData } from "utils/hasData";
import { StyledFlexWrapper } from "./CatalogPage.style";
import SectionContent from "./SectionContent";

const CatalogPage: React.FC = () => {
  const { category, subcategory, link } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const { books, fetchBooks } = useBooks();
  const [sortBy, setSortBy] = useState("");
  const [orderSort, setOrderSort] = useState("asc");
  const { currentPage, setCurrentPage, totalPages } = useBooks();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= parseInt(breakpoints.tablet)
  );

  const page = Number(searchParams.get("page")) || 1;
  const news = !!searchParams.get("new") || undefined;
  const bestsellers = !!searchParams.get("bestsellers") || undefined;
  const promotions = !!searchParams.get("promotions") || undefined;

  const ageReplaced =
    subcategory === "Книги за віком" ? adjustAgeValue(link ?? "") : "";
  const subcategoryReplaced = subcategory !== "Книги за віком" ? link : "";

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= parseInt(breakpoints.tablet));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }

    setSearchParams({
      keyword,
      page: page.toString(),
    });
  };

  const hasBooks = hasData(books);

  useEffect(() => {
    fetchBooks({
      category,
      subcategory: subcategoryReplaced,
      keyword,
      link,
      age: ageReplaced,
      new: news,
      bestsellers,
      promotions,
      page,
      sortBy,
      orderSort,
    });
  }, [searchParams, category, link, keyword, subcategory, sortBy, orderSort]);

  const [showSortButtons, setShowSortButtons] = useState(false);

  const toggleSort = () => {
    setShowSortButtons((prev) => !prev); // Toggle true/false
  };

  function updateURLWithQueryParams(params: any) {
    // Get current search parameters from the location object
    const currentParams = new URLSearchParams(location.search);

    // Loop through the provided params (from filter or sort) and update/add them to the URL
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== "") {
        currentParams.set(key, params[key]); // Add new or update existing param
      } else {
        currentParams.delete(key); // Optionally remove the parameter if value is empty or undefined
      }
    });

    // Update the URL with the new query parameters using useNavigate
    navigate(
      {
        pathname: location.pathname, // Keep the current path
        search: `?${currentParams.toString()}`, // Apply the updated query params
      },
      { replace: true }
    ); // Replace the current entry in the history stack to avoid adding a new entry
  }
  const handleSortChange = useCallback(
    (sortBy: string, orderSort: string) => {
      // Update the search params for sorting and keep any existing filters
      setSortBy(sortBy);
      setOrderSort(orderSort);

      const updatedParams = {
        ...Object.fromEntries(searchParams), // Keep the existing filter params
        sortBy, // Add sorting parameters
        orderSort,
        page: "1", // Reset to page 1 when sorting changes
      };

      updateURLWithQueryParams(updatedParams);

      // Update searchParams state
      setSearchParams(updatedParams);
    },

    [setSearchParams, searchParams, navigate]
  );

  const handleFilterChange = (filters: any) => {
    // Merge new filters with existing searchParams (including sorting) and update URL
    const updatedParams = {
      ...Object.fromEntries(searchParams), // Keep existing sorting and other params
      ...filters, // Apply new filters
      sortBy, // Retain the current sorting parameter
      orderSort, // Retain the current sorting order
      page: "1", // Reset to page 1 when filters change
    };

    // Update the URL with the new query parameters
    updateURLWithQueryParams(updatedParams);

    // Update searchParams state
    setSearchParams(updatedParams);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");

  const showModal = (content: string, isSize: boolean) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent("");
    setIsModalOpen(false);
  };

  const renderBreadcrumbs = () => {
    return (
      <BreadCrumbs>
        <Link to="/catalog">Каталог | </Link>
        {category && (
          <Link to={`/catalog/${encodeURI(category)}`}> {category} </Link>
        )}
      </BreadCrumbs>
    );
  };

  const renderLabels = () => {
    return <Label>{link || subcategory || category || "Усі книги"}</Label>;
  };

  return (
    <PageLayout books={books}>
      <>
        {renderBreadcrumbs()}
        {renderLabels()}
      </>

      {!isDesktop && (
        <div className="button-container">
          <ButtonGreyYellow onClick={() => showModal("filter", isDesktop)}>
            Фiльтр
          </ButtonGreyYellow>
          <ButtonGreyYellow onClick={toggleSort}>Сортування</ButtonGreyYellow>
        </div>
      )}

      {showSortButtons && (
        <Sort isDesktop={isDesktop} onSortChange={handleSortChange} />
      )}

      {!isDesktop && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <StyledFlexWrapper>
        {isDesktop && (
          <Filter isDesktop={isDesktop} onFilterChange={handleFilterChange} />
        )}

        {isDesktop && hasBooks && (
          <Sort isDesktop={isDesktop} onSortChange={handleSortChange} />
        )}

        {<Outlet context={{ books }} /> || <SectionContent data={books} />}
      </StyledFlexWrapper>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <Subscribe />

      {!isDesktop && isModalOpen && (
        <Modal close={closeModal} showCloseButton={true}>
          {modalContent === "filter" && (
            <Filter
              isDesktop={isDesktop}
              onClose={closeModal}
              onFilterChange={handleFilterChange}
            />
          )}
        </Modal>
      )}
    </PageLayout>
  );
};

export default CatalogPage;
