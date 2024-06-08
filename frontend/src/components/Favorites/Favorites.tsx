import { BookCard } from "components";
import { IBookItem, IBooksData } from "components/Book";

import { Label } from "pages/CommonPages.styled";
import { FlexWrapper, Wrapper } from "styles/CommonStyled";

interface IFavProps {
  books: IBookItem[];
  limit?: number;
  page?: number;
}

const Favorites: React.FC<IFavProps> = ({ books, limit, page }) => {
  console.log(books);
  return (
    <Wrapper>
      <Label>Обране</Label>
      <FlexWrapper
        style={{
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {books.length ? (
          books.map((item: IBookItem) => <BookCard key={item._id} {...item} />)
        ) : (
          <div>No favorite books</div>
        )}
      </FlexWrapper>
    </Wrapper>
  );
};

export default Favorites;
