import styled from "@emotion/styled";
import Background from "../Components/Background";
import SideBar from "../Components/SideBar";
import ChattingBar from "../Components/ChattingSystem/ChattingBar";
import { useEffect, useRef } from "react";
import { Text } from "../style/Colors";
import ChatBubble from "../Components/ChattingSystem/ChatBubble";
import {
  useAuthStore,
  useDataStore,
  useMessageStore,
  useQuestionAPI,
} from "../store/states";
import ReactMarkDown, { type Components } from "react-markdown";
import InfoBubble from "../Components/ChattingSystem/InfoBubble";
import { keyframes } from "@emotion/react";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  color: ${Text};

  user-select: none;
  box-sizing: border-box;
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

const UserName = styled.span`
  background: linear-gradient(
    90deg,
    rgba(42, 123, 155, 1) 0%,
    rgba(87, 199, 133, 1) 50%,
    rgba(237, 221, 83, 1) 100%
  );
  background-clip: text;
  color: transparent;
  margin: 0;
  padding: 0;
`;

const dotFlashing = keyframes`
  0%   { content: "🔍 검색중"; }
  25%  { content: "🔍 검색중."; }
  50%  { content: "🔍 검색중.."; }
  75%  { content: "🔍 검색중..."; }
  100% { content: "🔍 검색중"; }
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

const MainView: React.FC = () => {
  const { getChatRoom, selectedChatRoomID } = useDataStore();
  const { messages, addMessage } = useMessageStore();
  const { askQuestion, loading, continueQuestion } = useQuestionAPI();
  const { user, refreshToken } = useAuthStore();
  const middleRef = useRef<HTMLDivElement>(null);

  const markdownComponents: Components = {
    a: ({ href, children, ...props }) => (
      <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      >{children}</a>
    )
  }

  useEffect(() => {
    getChatRoom();
  }, [getChatRoom]);

  useEffect(() => {
    if (middleRef.current) {
      middleRef.current.scrollTo({
        top: middleRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  },[messages])

  useEffect(() => {
    if (!user) return;

    refreshToken();

    const intervalID = setInterval(() => {
      refreshToken();
    }, 14*60*1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [user, refreshToken]);

  const handleAsk = async (msg: string) => {
    addMessage({ sender: "USER", content: msg });


    if (selectedChatRoomID) {
      await continueQuestion(msg);
    } else {
      await askQuestion(msg);
    }
    getChatRoom();
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
        <Middle ref={middleRef}>
          {messages?.length > 0 ? (
            messages.map((msg, idx) => {
              if (msg.sender === "USER" || msg.sender === "BOT") {
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.sender === "USER" ? "flex-end" : "flex-start",
                      padding: "8px 20px",
                      width: "100%",
                    }}
                  >
                    <ChatBubble isUser={msg.sender === "USER"}>
                      <ReactMarkDown components={markdownComponents}>{msg.content}</ReactMarkDown>
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
                      <ReactMarkDown components={markdownComponents}>{msg.content}</ReactMarkDown>
                    </InfoBubble>
                  </div>
                );
              }
            })
          ) : (
            <ScreenSaver>
              <img src="/PointCircle.svg" />
              <UserName>{user?.nickname}님</UserName>
              오늘의 고민은 무엇인가요?
            </ScreenSaver>
          )}
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                width: "100%",
                paddingBottom: "20px",
              }}
            >
              <LoadingText />
            </div>
          )}
        </Middle>
        <Bottom>
          <ChattingBar
            onSubmit={(msg) => handleAsk(msg)}
            chatTrue={messages?.length || 0}
          />
        </Bottom>
      </Wrapper>
    </Background>
  );
};

export default MainView;
