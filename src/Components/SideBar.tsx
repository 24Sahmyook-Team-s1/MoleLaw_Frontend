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
  grid-template-rows: auto 1fr auto;
  justify-items: start;

  transition: 0.8s ease-in-out;

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
  padding: 50px 30px 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;

  min-width: 0;
  overflow: hidden;
  width: 350px;

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

  transition: 0.5s ease-in-out 0.2s;
  &:hover {
    background-color: ${PointHighlight};
    transition: 0.5s ease-in-out;
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
  transition: opacity 0.5s ease;
  margin-bottom: 10px;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0%;
`;

const ChatList = styled.div<{show:boolean}>`
  width: 100%;
  height: fit-content;
  min-width: 0;
  padding: 5px;
  border-radius: 10px;
  box-sizing: border-box;

  color: white;
  font-size: 14px;
  font-family: Pretendard;
  opacity: ${({show}) => show ? "1" : "0"};
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  text-align: left;
  user-select: none;
  cursor: pointer;

  &:hover{
    background-color: ${PointHighlight};

  }
`

const SideBar: React.FC = () => {
  const WidthRef = useRef<HTMLDivElement>(null);
  const [hold, setHold] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [settingRenderer, setSettingRenderer] = useState(false);

  const [profileClick, setProfileClick] = useState(false);
  const {chatRooms, getChatRoomMessage} = useDataStore();

  const holdHandler = () => {
    if (!hold) {
      setHold(true);
    } else {
      setHold(false);
    }
  };

  const ChatRoomHandler = (ID:number) =>{
    getChatRoomMessage(ID);
  }

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
    if(!isExpanded) setProfileClick(false);
  },[isExpanded])

  const SettingHandler = () => {
    setSettingRenderer((prev) => !prev)
  }


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
      <Chats>
        <ChatTitle isExpanded={isExpanded}>채팅</ChatTitle>
          
          {Array.isArray(chatRooms) && chatRooms.map((room, index) => (
            <ChatList show={isExpanded} key={room.id || index} onClick={() => ChatRoomHandler(room.id)}>
              {room.title}
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
              transition: "opacity 0.5s ease, max-width 0.5s ease",
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
              transition: "opacity 0.5s ease, max-width 0.5s ease",
            }}
          >
            Setting
          </span>
        </Menu>
        <Menu style={{position: "relative"}}
        onClick={() => setProfileClick((prev) => !prev)}>
          <Icon src="/Profile.svg" />
          <span
            style={{
              opacity: isExpanded ? 1 : 0,
              maxWidth: isExpanded ? "500px" : "0px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "opacity 0.5s ease, max-width 0.5s ease",
            }}
          >
            Profile
          </span>
          {isExpanded && (<ProfilePanel show={profileClick}/>)}
        </Menu>
      </MenueList>
          <SettingPanel show={settingRenderer} showHandle={SettingHandler}/>
    </Wrapper>
  );
};

export default SideBar;
