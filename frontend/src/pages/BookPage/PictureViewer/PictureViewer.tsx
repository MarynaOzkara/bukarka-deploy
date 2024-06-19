import { IBookItem } from "types/Books";
import { StyledBookImage } from "../BookPage.styled";
import { images } from "assets/images";
import { FlexWrapper, Wrapper } from "styles/CommonStyled";
import { StyledFlexWrapper } from "./PictureViewer.styled";

interface IPictureProps {
  book?: IBookItem;
}

const PictureViewer: React.FC<IPictureProps> = ({ book }) => {
  return (
    <Wrapper>
      {!!book && (
        <StyledFlexWrapper>
          <span className="material-symbols-outlined">arrow_back_ios</span>
          <StyledBookImage id={book._id}>
            <img
              src={book.image || images.imagePlaceholder}
              alt={`${book.author} ${book.title} `}
            />
          </StyledBookImage>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </StyledFlexWrapper>
      )}
    </Wrapper>
  );
};

export default PictureViewer;
