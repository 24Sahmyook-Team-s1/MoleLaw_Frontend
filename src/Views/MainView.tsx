import styled from "@emotion/styled";
import Background from "../Components/Background";
import SideBar from "../Components/SideBar";
import ChattingBar from "../Components/ChattingBar";
import { useState } from "react";
import { Text } from "../style/Colors";
import ChatBubble from "../Components/ChatBubble";
import { useQuestionAPI } from "../store/states";
import ReactMarkDown from "react-markdown";
import InfoBubble from "../Components/InfoBubble";
import { keyframes } from "@emotion/react";

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

const dotFlashing = keyframes`
  0%   { content: "검색중"; }
  25%  { content: "검색중."; }
  50%  { content: "검색중.."; }
  75%  { content: "검색중..."; }
  100% { content: "검색중"; }
`;

const LoadingText = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  position: relative;

  &::after {
    content: "검색중";
    animation: ${dotFlashing} 1.5s infinite steps(4);
    white-space: pre;
  }
`;

type Message = {
  role: "user" | "gpt";
  content: string;
  type: "dialogue" | "info";
};

const MainView: React.FC = () => {
  const [messages, setMessage] = useState<Message[]>([]);

  const addMessage = (
    msg: string,
    role: "user" | "gpt",
    type: "dialogue" | "info"
  ) => {
    const newMessage: Message = {
      role,
      content: msg,
      type,
    };
    setMessage((prev) => [...prev, newMessage]);
  };

  const { askQuestion, loading } = useQuestionAPI();

  const handleAsk = async (msg: string) => {
    addMessage(msg, "user", "dialogue");
    const res = await askQuestion(msg);
    if (res) {
      console.log(res.answer);
      addMessage(res.answer, "gpt", "dialogue");
      addMessage(res.info, "gpt", "info");
    }
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
            messages.map((msg, idx) => {
              if (msg.type === "dialogue") {
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.role === "user" ? "flex-end" : "flex-start",
                      padding: "8px 20px",
                      width: "100%",
                    }}
                  >
                    <ChatBubble isUser={msg.role === "user"}>
                      <ReactMarkDown>{msg.content}</ReactMarkDown>
                    </ChatBubble>
                  </div>
                );
              } else {
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "8px 20px",
                      width: "100%",
                    }}
                  >
                    <InfoBubble>
                      <ReactMarkDown>{msg.content}</ReactMarkDown>
                    </InfoBubble>
                  </div>
                );
              }
            })
          ) : (
            <ScreenSaver>
              <img src="/PointCircle.svg" />
              오늘의 고민은 무엇인가요?
            </ScreenSaver>
          )}
          {loading && (
            <div
            style={{
              display:"flex",
              justifyContent:"left",
              width: "100%",
              paddingBottom: "20px",
            }}
            ><LoadingText/></div>
          )}
        </Middle>
        <Bottom>
          <ChattingBar
            onSubmit={(msg) => {
              handleAsk(msg);
            }}
            chatTrue={messages.length}
          />
        </Bottom>
      </Wrapper>
    </Background>
  );
};

export default MainView;
