import styled from "@emotion/styled";
import { useAuthStore } from "../store/states";
import { Stroke, Sub, Text } from "../style/Colors";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaRegSave } from "react-icons/fa";
import { AnimatedInputArea } from "./Common/AnimationArea";
import { TermsOfUseText } from "../Data/TermsofUse";
import { InputArea, InputAreaField, InputAreaText } from "./Common/InputArea";
import QuitPopup from "./QuitPopup";

const Panel = styled.div<{ show: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  z-index: 2;
  padding: 0;
  margin: 0;
`;

const Wrapper = styled.div<{ show: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 750px;
  height: 750px;
  box-sizing: border-box;
  padding: 70px 80px;
  border-radius: 10px;
  border: 1px solid ${Stroke};
  box-shadow: 0px 7px 10px #535353;
  box-sizing: border-box;

  background-color: #ffffff6e;
  backdrop-filter: blur(20px);

  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  z-index: 1000;

  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  pointer-events: ${({ show }) => (show ? "auto" : "none")};
  overflow-y: scroll;

  /* 스크롤 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const ChangeButton = styled.button`
  padding: 0;
  margin: 0;
  height: 25px;
  width: 60px;
  border-radius: 10px;
  background-color: #2c2c2c;
  color: white;

  font-size: 12px;
  font-family: pretendard;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingTitle = styled.div`
  text-align: left;
  font-size: 32px;
  font-family: "Chiron Sung HK";
  padding: 10px 0 20px 0;
  margin: 0;
  height: fit-content;
`;

const PersonalProfile = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: fit-content;
  gap: 50px;

  padding-bottom: 30px;
  box-sizing: border-box;
  border-bottom: 1px solid ${Stroke};
`;

const PersonalProfileText = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  text-align: left;

  font-family: "Chiron Sung HK";
  color: ${Text};
`;

const ProfileArea = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto;
  border-bottom: 1px solid ${Stroke};
`;

const AccountArea = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto;

  border-bottom: 1px solid ${Stroke};
`;

const OptionStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding-bottom: 15px;

  font-size: 18px;
  font-family: pretendard;
`;

const TermsOfUseArea = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const TermsOfUse = styled.div`
  width: 100%;
  height: 550px;

  overflow-y: scroll;
  overflow-x: hidden;

  box-sizing: border-box;
  padding-right: 10px;

  text-align: left;
  font-family: Pretendard;

  &::-webkit-scrollbar {
    width: 10px; /* Chrome, Safari */
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${Sub};
    border-radius: 20px;
  }
`;

const InputAreaDivider = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
  gap: 5px;
`;

interface Props {
  show: boolean;
  showHandle: () => void;
}

const SettingPanel: React.FC<Props> = ({ show, showHandle }) => {
  const { user, changeNickname, changePassword } = useAuthStore();

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [newNickname, setNewNickname] = useState("");

  const [nameClick, setNameClick] = useState(false);
  const [passwordClick, setPasswordClick] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [quitClick, setQuitClick] = useState(false);

  useEffect(() => {
    if(!show){
      setQuitClick(false);
    }
  },[show])

  return (
    <Panel onClick={showHandle} show={show}>
      <Wrapper show={show} onClick={(e) => e.stopPropagation()}>
        <PersonalProfile>
          <img src="/PointCircle.svg" />
          <PersonalProfileText>
            <div style={{ fontSize: "38px", fontWeight: "bold" }}>
              {user?.nickname}
            </div>
            <div style={{ fontSize: "24px" }}>{user?.email}</div>
          </PersonalProfileText>
        </PersonalProfile>
        <ProfileArea>
          <SettingTitle>Profile</SettingTitle>
          <OptionStyle>
            이름 변경
            <ChangeButton onClick={() => setNameClick((prev) => !prev)}>
              변경
            </ChangeButton>
          </OptionStyle>
          <AnimatedInputArea show={nameClick}>
            {nameClick && (
              <InputArea style={{justifySelf:"flex-end", marginBottom:"10px"}}>
                <InputAreaText>변경할 이름</InputAreaText>
                <InputAreaDivider>
                  <InputAreaField
                    value={newNickname}
                    onChange={(e) => setNewNickname(e.target.value)}
                  />
                  <button
                    style={{
                      backgroundColor: "transparent",
                      padding: "0",
                      margin: "0",
                    }}
                    onClick={async () => {
                      await changeNickname(newNickname);
                      setNewNickname("");
                      setNameClick(false);
                    }}
                  >
                    <FaRegSave color="black" />
                  </button>
                </InputAreaDivider>
              </InputArea>
            )}
          </AnimatedInputArea>
          <OptionStyle>
            프로필 사진 변경
            <ChangeButton> 변경 </ChangeButton>
          </OptionStyle>
        </ProfileArea>
        <AccountArea>
          <SettingTitle>Account</SettingTitle>
          <OptionStyle>
            비밀번호 변경
            <ChangeButton onClick={() => setPasswordClick((prev) => !prev)}>
              {" "}
              변경{" "}
            </ChangeButton>
          </OptionStyle>
          <AnimatedInputArea show={passwordClick}>
            {passwordClick && (
              <InputArea style={{justifySelf:"flex-end", marginBottom:"10px"}}>
                <InputAreaText>새로운 비밀번호</InputAreaText>
                <InputAreaDivider>
                  <InputAreaField
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    style={{
                      backgroundColor: "transparent",
                      padding: "0",
                      margin: "0",
                    }}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <FaEye color="black" display="block" />
                    ) : (
                      <FaEyeSlash color="black" display="block" />
                    )}
                  </button>
                </InputAreaDivider>
              </InputArea>
            )}
          </AnimatedInputArea>
          <AnimatedInputArea show={Boolean(password)}>
            {password && passwordClick && (
              <InputArea style={{justifySelf:"flex-end", marginBottom:"10px"}}>
                <InputAreaText>비밀번호 확인</InputAreaText>
                <InputAreaDivider>
                  <InputAreaField
                    type={showPassword ? "text" : "password"}
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                  />
                  <button
                    style={{
                      backgroundColor: "transparent",
                      padding: "0",
                      margin: "0",
                    }}
                    onClick={async () => {
                      if (password === passwordCheck) {
                        await changePassword(password);
                        setPassword("");
                        setPasswordCheck("");
                        setPasswordClick(false);
                      } else {
                        alert("패스워드가 일치하지 않습니다");
                      }
                    }}
                  >
                    <FaRegSave color="black" />
                  </button>
                </InputAreaDivider>
              </InputArea>
            )}
          </AnimatedInputArea>
          <OptionStyle>
            회원 탈퇴
            <ChangeButton
              style={{ backgroundColor: "Red", color: "white" }}
              onClick={() => setQuitClick((prev) => !prev)}
            >
              {" "}
              탈퇴{" "}
            </ChangeButton>
          </OptionStyle>
        </AccountArea>
        <TermsOfUseArea>
          <SettingTitle>Terms Of Use</SettingTitle>
          <TermsOfUse>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {TermsOfUseText}
            </ReactMarkdown>
          </TermsOfUse>
        </TermsOfUseArea>
      </Wrapper>
      <QuitPopup show={quitClick && show}/>
    </Panel>
  );
};

export default SettingPanel;


