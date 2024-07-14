import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  StyledSlider,
  StyledPrevArrow,
  StyledNextArrow,
} from "./SimpleSlider.styled";
import Card from "../BookCard/BookCard";
import { useState } from "react";
import { SliderArrowIcon } from "../../../assets/icons";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import {
  selectBooksData,
  selectBooksError,
  selectBooksStatus,
} from "../../../redux/books/selectors";
import { useAppDispatch } from "../../../redux/hooks";
import Loader from "components/Loader";

interface IProps {
  _id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  rating: number;
}

interface IDataBooks {
  data: IProps[];
}

export function NextArrow(props: any) {
  const { className, style, onClick, isVisible } = props;
  return (
    <StyledNextArrow
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onClick}
    >
      <SliderArrowIcon />
    </StyledNextArrow>
  );
}

export function PrevArrow(props: any) {
  const { className, style, onClick, isVisible } = props;
  return (
    <StyledPrevArrow
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={onClick}
    >
      <SliderArrowIcon />
    </StyledPrevArrow>
  );
}

const SimpleSlider: React.FC<IDataBooks> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = data.length;
  const dispatch = useAppDispatch();
  const booksData = useSelector((state: IRootState) => selectBooksData(state));
  const status = useSelector((state: IRootState) => selectBooksStatus(state));
  const error = useSelector((state: IRootState) => selectBooksError(state));

  if (status === "loading") {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  let settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentSlide(newIndex),
    prevArrow: <PrevArrow isVisible={currentSlide > 0} />,
    nextArrow: <NextArrow isVisible={currentSlide < totalSlides - 5} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <StyledSlider {...settings}>
        {data.map((item, index) => (
          <Card
            _id={item._id}
            image={item.image}
            key={item._id}
            price={item.price}
            author={item.author}
            title={item.title}
            rating={item.rating}
            index={index}
          />
        ))}
      </StyledSlider>
    </div>
  );
};

export default SimpleSlider;
