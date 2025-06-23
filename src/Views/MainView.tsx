import styled from "@emotion/styled";
import Background from "../Components/Background";
import SideBar from "../Components/SideBar";
import ChattingBar from "../Components/ChattingBar";
import { useState } from "react";
import { Text } from "../style/Colors";
import ChatBubble from "../Components/ChatBubble";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  padding: 20px 40px;
  padding-bottom: 0;
  box-sizing: border-box;
  gap: 10px;
    height: fit-content;
`;

const Logo = styled.div`
  display: flex;
  font-family: "Chiron Sung HK";
  font-size: 32px;
  font-weight: 600;
  align-items: center;
  color: ${Text};
`;

const Middle = styled.div`
  width: 940px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  align-items: flex-start;
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: 10px;

    /* 스크롤 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const ScreenSaver = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;

  font-family: "Chiron Sung HK";
  font-size: 32px;
  gap: 20px;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  height: fit-content;
`;

type Message = {
  role: "user" | "gpt";
  content: string;
};

const MainView: React.FC = () => {
  const [messages, setMessage] = useState<Message[]>([]);

  const addMessage = (msg: string) => {
    const newMessage: Message = {
      role: messages.length % 2 === 0 ? "user" : "gpt",
      content: msg,
    };
    setMessage((prev) => [...prev, newMessage]);
  };

  return (
    <Background>
      <SideBar />
      <Wrapper>
        <Top>
          <Logo>MoleLaw</Logo>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0",
            }}
            onClick={() => window.location.reload()}
          >
            <img src="/New Chat.svg"></img>
          </button>
        </Top>
        <Middle>
          {messages.length > 0 ? (
            messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  padding: "8px 20px", width:"100%",
                }}
              >
                <ChatBubble isUser={msg.role === "user"}>
                  {msg.content}
                </ChatBubble>
              </div>
            ))
          ) : (
            <ScreenSaver>
              <img src="/PointCircle.svg" />
              오늘의 고민은 무엇인가요?
            </ScreenSaver>
          )}
        </Middle>
        <Bottom>
          <ChattingBar onSubmit={addMessage} chatTrue={messages.length} />
        </Bottom>
      </Wrapper>
    </Background>
  );
};

export default MainView;
