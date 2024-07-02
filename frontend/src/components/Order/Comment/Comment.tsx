import { useState } from "react";
import { SubTitle, Wrapper } from "../OrderCommonStyled";
import { Textarea } from "./Comment.styled";

interface CommentDataProps {
  setOrderComment: React.Dispatch<React.SetStateAction<string>>;
}

const Comment: React.FC<CommentDataProps> = ({ setOrderComment }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setInputValue(value);
    setOrderComment(value);
  };

  return (
    <Wrapper>
      <SubTitle>Коментар до замовлення</SubTitle>
      <Textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Залиште свій коментар (опціонально)"
        aria-label="Коментар до замовлення"
      />
    </Wrapper>
  );
};

export default Comment;
