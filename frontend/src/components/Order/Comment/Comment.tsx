import { useState } from "react";
import { SubTitle, Wrapper } from "../OrderCommonStyled";
import { Textarea } from "./Comment.styled";

interface CommentDataProps {
  setOrderComment: React.Dispatch<React.SetStateAction<string>>;
}

const Comment: React.FC<CommentDataProps> = ({ setOrderComment }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setOrderComment(inputValue);
  };

  return (
    <Wrapper>
      <SubTitle>Коментар до замовлення</SubTitle>
      <Textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Залиште свій коментар (опціонально)"
      />
    </Wrapper>
  );
};

export default Comment;
