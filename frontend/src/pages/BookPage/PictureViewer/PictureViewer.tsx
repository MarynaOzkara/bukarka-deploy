import { SliderArrowIcon } from "assets/icons";
import { images } from "assets/images";
import { IBookItem } from "types/Books";
import { StyledBookImage, StyledFlexWrapper } from "./PictureViewer.styled";

interface IPictureProps {
  book?: IBookItem;
}

const PictureViewer: React.FC<IPictureProps> = ({ book }) => {
  return (
    <StyledFlexWrapper>
      {!!book && (
        <>
          <SliderArrowIcon
            style={{ transform: "rotate(180deg)", cursor: "pointer" }}
          />
          <StyledBookImage id={book._id}>
            <img
              src={book.image || images.imagePlaceholder}
              alt={`${book.author} ${book.title} `}
              title={`${book.author} ${book.title} `}
            />
          </StyledBookImage>
          <SliderArrowIcon style={{ cursor: "pointer" }} />
        </>
      )}
    </StyledFlexWrapper>
  );
};

export default PictureViewer;
