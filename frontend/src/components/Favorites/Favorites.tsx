import { BookCard } from "components";
import { IBooksData } from "components/Book";

import { Label } from "pages/CommonPages.styled";
import { FlexWrapper, Wrapper } from "styles/CommonStyled";

const Favorites: React.FC<IBooksData> = ({ data }) => {
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
        {data.length ? (
          data.map((item) => <BookCard key={item._id} {...item} />)
        ) : (
          <div>No favorite books</div>
        )}
      </FlexWrapper>
    </Wrapper>
  );
};

export default Favorites;
