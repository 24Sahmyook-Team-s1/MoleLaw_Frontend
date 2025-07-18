import styled from "@emotion/styled";
import { useAuthStore } from "../../../store/storeIndex"
import { Stroke, Sub, Text } from "../../../style/colors";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaRegSave } from "react-icons/fa";
import { LtoRSlideAnimationArea } from "../../UI/AnimationArea";
import { TermsOfUseText } from "../../../data/TermsofUse";
import CustomInput from "../../UI/InputArea";
import QuitPopup from "./QuitPopup";
import { useToastStore } from "../../../store/utils/toastStore";
import { css } from "@emotion/react";

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

  &:active{
  transform: scale(0.95);
  }
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

const InputAlignment = css`
  margin-bottom: 10px;
  justify-self: flex-end;
`

interface Props {
  show: boolean;
  showHandle: () => void;
}

const SettingPanel: React.FC<Props> = ({ show, showHandle }) => {
  const { user, changeNickname, changePassword } = useAuthStore();
  const { showToast } = useToastStore();

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [newNickname, setNewNickname] = useState("");

  const [nameClick, setNameClick] = useState(false);
  const [passwordClick, setPasswordClick] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [quitClick, setQuitClick] = useState(false);

  useEffect(() => {
    if (!show) {  
      setQuitClick(false);
    }
  }, [show]);

  const handleNewNickname = async () => {
    const msg = await changeNickname(newNickname);
    setNewNickname("");
    setNameClick(false);
    showToast(msg);
  };

  const handleNewPassword = async () => {
    if(password === passwordCheck){
      const msg = await changePassword(password);
      setPassword("");
      setPasswordCheck("");
      setPasswordClick(false);
      showToast(msg);
    } else{
      showToast("패스워드가 일치하지 않습니다.")
    }
  }

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
          <LtoRSlideAnimationArea show={nameClick}>
            {nameClick && (
            <CustomInput
              inputType={"text"}
              inputName={"새로운 닉네임"}
              Icon={FaRegSave}
              onChange={(e) => setNewNickname(e.target.value)}
              IconJob={() => handleNewNickname()}
              CustomStyle={InputAlignment}
            />
            )}
          </LtoRSlideAnimationArea>
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
          <LtoRSlideAnimationArea show={passwordClick}>
            {passwordClick && (
            <CustomInput
              inputType={showPassword ? "text" : "password"}
              inputName={"비밀번호"}
              Icon={ showPassword ? FaEye : FaEyeSlash}
              onChange={(e) => setPassword(e.target.value)}
              IconJob={() => setShowPassword((prev) => !prev)}
              CustomStyle={InputAlignment}
            />
            )}
          </LtoRSlideAnimationArea>
          <LtoRSlideAnimationArea show={Boolean(password)}>
            {password && passwordClick && (
            <CustomInput
              inputType={showPassword ? "text" : "password"}
              inputName={"비밀번호 확인"}
              Icon={ FaRegSave }
              onChange={(e) => setPasswordCheck(e.target.value)}
              IconJob={() => handleNewPassword()}
              CustomStyle={InputAlignment}
            />
            )}
          </LtoRSlideAnimationArea>
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
      <QuitPopup show={quitClick && show} />
    </Panel>
  );
};

export default SettingPanel;
