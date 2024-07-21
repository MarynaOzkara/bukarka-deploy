import CategoryPoster from "../CategoryPoster/CategoryPoster";
import SimpleSlider from "../../Slider/SimpleSlider";
import { StyledCategorySlider } from "./CategorySlider.styled";
import React, { useEffect, useState } from "react";
import { instance } from "../../../utils/fetchInstance";
import Loader from "components/Loader";
import { breakpoints } from "constants/breakpoints";
import MobileCategoryPoster from "../CategoryPoster/MobileCategoryPoster";

interface IProps {
  _id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  rating: number;
}

const CategorySlider = () => {
  const [books, setBooks] = useState({
    newBooks: [],
    bestsellers: [],
    promotions: [],
  });

  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= parseInt(breakpoints.tablet)
  );

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= parseInt(breakpoints.tablet));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/api/books/type`);
        const data = await response.data;
        setBooks({
          newBooks: data.newBooks,
          bestsellers: data.bestsellers,
          promotions: data.promotions,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Помилка при виконанні запиту:");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <StyledCategorySlider>
        {isDesktop ? (
          <CategoryPoster title="НОВИНКИ" />
        ) : (
          <MobileCategoryPoster title="НОВИНКИ" />
        )}
        <SimpleSlider data={books.newBooks} />
      </StyledCategorySlider>
      <StyledCategorySlider>
        {isDesktop ? (
          <CategoryPoster title="БЕСТСЕЛЕРИ" />
        ) : (
          <MobileCategoryPoster title="БЕСТСЕЛЕРИ" />
        )}

        <SimpleSlider data={books.bestsellers} />
      </StyledCategorySlider>
      <StyledCategorySlider>
        {isDesktop ? (
          <CategoryPoster title="АКЦІЇ" />
        ) : (
          <MobileCategoryPoster title="АКЦІЇ" />
        )}

        <SimpleSlider data={books.promotions} />
      </StyledCategorySlider>
    </>
  );
};

export default CategorySlider;
