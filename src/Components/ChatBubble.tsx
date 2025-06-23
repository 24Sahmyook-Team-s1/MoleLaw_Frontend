import styled from "@emotion/styled";
import type { ReactNode } from "react";

const Wrapper = styled.div<{ isUser: boolean }>`
  width: fit-content;
  max-width: 50%;
  height: fit-content;
  background-color: white;
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};

  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 20px;
  font-family: Pretendard-regular;
`;

interface Props {
  children: ReactNode;
  isUser: boolean;
}

const ChatBubble: React.FC<Props> = ({ children, isUser }) => {
  return <Wrapper isUser={isUser}>{children}</Wrapper>;
};

export default ChatBubble;
