import { useEffect, useState } from "react";
import CategoryPoster from "../CategoryPoster";
import SimpleSlider from "../Slider/SimpleSlider";
import Loader from "components/Loader";
import { instance } from "utils/fetchInstance";
import { StyledCategorySlider } from "./CategorySlider.styled";

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
        <CategoryPoster title={"НОВИНКИ"} />
        <SimpleSlider data={books.newBooks} />
      </StyledCategorySlider>
      <StyledCategorySlider>
        <CategoryPoster title={"БЕСТСЕЛЕРИ"} />
        <SimpleSlider data={books.bestsellers} />
      </StyledCategorySlider>
      <StyledCategorySlider>
        <CategoryPoster title={"АКЦІЇ"} />
        <SimpleSlider data={books.promotions} />
      </StyledCategorySlider>
    </>
  );
};

export default CategorySlider;
