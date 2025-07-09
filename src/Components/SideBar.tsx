import styled from "@emotion/styled";
import { MainColor, Point, PointHighlight, Text } from "../style/Colors";
import { useEffect, useRef, useState } from "react";
import ProfilePanel from "./ProfilePanel";
import SettingPanel from "./SettingPanel";
import { useDataStore } from "../store/states";

const Wrapper = styled.div<{ hold: boolean }>`
  width: ${({ hold }) => (hold ? "400px" : "110px")};
  height: 100vh;
  background-color: ${MainColor};
  padding: 40px;
  padding-bottom: 20px;
  box-sizing: border-box;
  color: ${Text};
  user-select: none;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  justify-items: start;

  transition: 0.5s ease-in-out;

  ${({ hold }) =>
    !hold &&
    `
        &:hover {
            width: 400px;
        }
    `}
`;

const MenuLock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  margin: 0;
`;

const Chats = styled.div`
  padding: 20px 30px 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;

  min-width: 0;
  overflow: auto;
  width: 350px;

  /* 스크롤바 wrapper 역할 */
  position: relative;
  transition: background-color 0.5s ease-in-out, opacity 0.5s ease-in-out;
  
  /* Chrome, Safari, Edge 기반 브라우저 전용 */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${PointHighlight};
    border-radius: 20px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: ${Point};
  }
`;

const MenueList = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 200px;
  align-items: center;
  justify-items: left;
  gap: 10px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: left;
  white-space: nowrap;
  color: ${Point};
  font-family: "Chiron Sung HK";
  font-size: 24px;
  font-weight: bold;
  gap: 20px;
  padding: 10px;
  margin-left: -10px;
  border-radius: 30px;

  transition: 0.2s ease-in-out 0.1s;
  &:hover {
    background-color: ${PointHighlight};
    transition: 0.2s ease-in-out;
  }
`;

const ChatTitle = styled.div<{ isExpanded: boolean }>`
  display: flex;
  height: 20px;
  font-size: 16px;
  align-items: center;
  justify-content: flex-start;
  color: white;
  font-family: "Chiron Sung HK";
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};

  margin-top: 50px;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0%;
`;

const ChatList = styled.div<{ show: boolean }>`
  width: 100%;
  height: fit-content;
  min-width: 0;
  padding: 5px;
  border-radius: 10px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr auto;

  color: white;
  font-size: 14px;
  font-family: Pretendard;
  opacity: ${({ show }) => (show ? "1" : "0")};
  gap: 10px;

  text-align: left;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: ${PointHighlight};
  }
`;
const Chat = styled.div`
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Del = styled.div`
  width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DelButton = styled.button`
  width: 15px;
  height: 10px;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  color: white;

  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SideBar: React.FC = () => {
  const WidthRef = useRef<HTMLDivElement>(null);
  const [hold, setHold] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [settingRenderer, setSettingRenderer] = useState(false);

  const [hoverRoomID, setHoveredRoomID] = useState<number | null>(null);

  const [profileClick, setProfileClick] = useState(false);
  const { chatRooms, getChatRoomMessage, deleteChatroom } = useDataStore();

  const holdHandler = () => {
    if (!hold) {
      setHold(true);
    } else {
      setHold(false);
    }
  };

  const ChatRoomHandler = (ID: number) => {
    getChatRoomMessage(ID);
  };

  const ChatRoomDeleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (hoverRoomID != null) {
      deleteChatroom(hoverRoomID);
      window.location.reload();
    } else {
      return false;
    }
  };

  useEffect(() => {
    const el = WidthRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setIsExpanded(width >= 300);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) setProfileClick(false);
  }, [isExpanded]);

  const SettingHandler = () => {
    setSettingRenderer((prev) => !prev);
  };

  return (
    <Wrapper ref={WidthRef} hold={hold}>
      <MenuLock>
        <button
          onClick={holdHandler}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
          }}
        >
          <Icon src="/MenuHold.svg" alt="Toggle Sidebar" />
        </button>
      </MenuLock>
      <ChatTitle isExpanded={isExpanded}>채팅</ChatTitle>
      <Chats>
        {Array.isArray(chatRooms) &&
          chatRooms.map((room, index) => (
            <ChatList
              show={isExpanded}
              key={room.id || index}
              onClick={() => ChatRoomHandler(room.id)}
              onMouseEnter={() => setHoveredRoomID(room.id)}
              onMouseLeave={() => setHoveredRoomID(null)}
            >
              <Chat>{room.title}</Chat>
              <Del>
                {hoverRoomID === room.id ? (
                  <DelButton onClick={(e) => ChatRoomDeleteHandler(e)}>
                    X
                  </DelButton>
                ) : (
                  ""
                )}
              </Del>
            </ChatList>
          ))}
      </Chats>
      <MenueList>
        <Menu onClick={() => window.open("https://www.law.go.kr/")}>
          <Icon src="/Book.svg" />
          <span
            style={{
              opacity: isExpanded ? 1 : 0,
              maxWidth: isExpanded ? "500px" : "0px",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            대한민국 법전
          </span>
        </Menu>
        <Menu onClick={SettingHandler}>
          <Icon src="/Setting.svg" />
          <span
            style={{
              opacity: isExpanded ? 1 : 0,
              maxWidth: isExpanded ? "500px" : "0px",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            Setting
          </span>
        </Menu>
        <Menu
          style={{ position: "relative" }}
          onClick={() => setProfileClick((prev) => !prev)}
        >
          <Icon src="/Profile.svg" />
          <span
            style={{
              opacity: isExpanded ? 1 : 0,
              maxWidth: isExpanded ? "500px" : "0px",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            Profile
          </span>
          {isExpanded && <ProfilePanel show={profileClick} />}
        </Menu>
      </MenueList>
      <SettingPanel show={settingRenderer} showHandle={SettingHandler} />
    </Wrapper>
  );
};

export default SideBar;
