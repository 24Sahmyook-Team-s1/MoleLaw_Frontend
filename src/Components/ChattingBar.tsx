import styled from "@emotion/styled";
import { useRef, useEffect, useState } from "react";
import { Stroke, Text } from "../style/Colors";

const Wrapper = styled.div<{ chatTrue: number }>`
  width: 1000px;
  padding: 16px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid ${Stroke};
  box-shadow: 0px 3px 10px #0000002b,
    ${({ chatTrue }) => (chatTrue > 0 ? "0px -8px 5px #ffffffab" : null)};

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChatTextarea = styled.textarea`
  width: 100%;
  min-height: 48px;
  max-height: 200px;
  font-size: 16px;
  padding: 12px;
  border: none;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  line-height: 1.5;
  font-family: pretendard-regular;
  background-color: white;
  color:${Text};
`;

const Submit = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    height: 30px;
    width: auto;
  }
`;

interface Props {
  onSubmit: (message: string) => void;
  chatTrue: number;
}

const ChattingBar: React.FC<Props> = ({ onSubmit, chatTrue }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const el = textareaRef.current;

  const handleInput = () => {
    if (el) {
      el.style.height = "auto"; // 초기화
      el.style.height = `${el.scrollHeight}px`;
      if (el.offsetHeight >= 200) {
        el.style.overflowY = "scroll";
      } else {
        el.style.overflowY = "auto";
      } // 내용만큼 높이 설정
    }
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input.trim());
    setInput("");
    if (el) {
      el.style.height = "auto";
    }
  };

  useEffect(() => {
    handleInput(); // 초기 세팅
  });

  return (
    <Wrapper chatTrue={chatTrue}>
      <ChatTextarea
        ref={textareaRef}
        placeholder="함께 고민해보기 ..."
        onInput={handleInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.shiftKey && e.key === "Enter") {
            e.preventDefault(); // 줄바꿈 방지
            handleSubmit();
          }
        }}
      />
      <Submit onClick={handleSubmit}>
        <img src="/Upload button.svg" alt="전송" />
      </Submit>
    </Wrapper>
  );
};

export default ChattingBar;
