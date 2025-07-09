import styled from "@emotion/styled";
import { MainColor, Sub } from "../../style/Colors";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../../store/states";
import { AnimatedSignArea } from "../Common/AnimationArea";
import { InputArea, InputAreaField, InputAreaText } from "../Common/InputArea";

const Panel = styled.div`
  width: 500px;
  height: 600px;
  display: grid;
  grid-template-rows: auto auto auto auto auto 1fr;

  padding: 50px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-family: "Chiron Sung HK";
  margin-bottom: 60px;
  img {
    width: 70px;
  }
`;

const Area = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  font-family: pretendard;
  margin-bottom: 5px;
`;

const LoginButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: ${MainColor};
  border: 1px solid ${Sub};
  margin-top: 5px;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: pretendard;
  font-size: 16px;

  &:active{
    transform: scale(0.95);
  }
`;

const SigninArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  transition: 0.2s ease-in-out;
`;

const SignUpText = styled.span`
  cursor: pointer;
  &:hover {
    color: ${Sub};
  }
`;

interface Props {
  onArrowClick: () => void;
  handleSignup: () => void;
}

const Signin: React.FC<Props> = ({ onArrowClick, handleSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRenderer, setPasswordRenderer] = useState(false);
  const [loginRenderer, setLoginRenderer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { LocalLogin } = useAuthStore();

  useEffect(() => {
    if (email) setPasswordRenderer(true);
    else setPasswordRenderer(false);
  }, [email]);

  useEffect(() => {
    if (password) setLoginRenderer(true);
    else setLoginRenderer(false);
  }, [password]);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Panel>
      <button
        style={{
          padding: "5px",
          margin: "0",
          backgroundColor: "transparent",
          width: "fit-content",
        }}
        onClick={() => {
          onArrowClick();
        }}
      >
        <FaArrowLeft color="black" display="block" />
      </button>
      <Logo>
        <img src="/PointCircle.svg" />
        <div style={{ lineHeight: "1", paddingTop: "12px" }}>MoleLaw</div>
        <div style={{ fontSize: "20px", paddingTop: "0px" }}>
          AI 기반 법률 조언 서비스
        </div>
      </Logo>
      <Area>
        <InputArea>
          <InputAreaText>이메일</InputAreaText>
          <InputAreaField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputArea>
      </Area>
      {email && (
        <AnimatedSignArea show={passwordRenderer}>
          <Area>
            <InputArea>
              <InputAreaText>비밀번호</InputAreaText>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  width: "100%",
                  gap: "5px",
                }}
              >
                <InputAreaField
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // 줄바꿈 방지
                      LocalLogin(email, password);
                    }
                  }}
                />
                <button
                  style={{
                    padding: "0",
                    margin: "0",
                    backgroundColor: "transparent",
                  }}
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <FaEye color="black" display="block" />
                  ) : (
                    <FaEyeSlash color="black" display="block" />
                  )}
                </button>
              </div>
            </InputArea>
          </Area>
        </AnimatedSignArea>
      )}
      {password && (
        <AnimatedSignArea show={loginRenderer}>
          <Area>
            <LoginButton onClick={() => LocalLogin(email, password)}>
              로그인
            </LoginButton>
          </Area>
        </AnimatedSignArea>
      )}
      <SigninArea style={{ fontFamily: "pretendard" }}>
        계정이 아직 없다면?
        <SignUpText
          onClick={() => {
            handleSignup();
          }}
        >
          회원가입
        </SignUpText>
      </SigninArea>
    </Panel>
  );
};

export default Signin;
