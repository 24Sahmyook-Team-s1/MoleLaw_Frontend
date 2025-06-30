import styled from "@emotion/styled";
import { MainColor, Sub, Text } from "../../style/Colors";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../../store/states";

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

const InputArea = styled.div`
  width: 300px;
  height: 45px;
  background-color: White;
  border: 1px solid gray;
  border-radius: 10px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2px 12px;
  box-sizing: border-box;
  flex-direction: column;
`;

const InputAreaText = styled.span`
  font-size: 10px;
  color: ${Text};
`;

const InputAreaField = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: white;
  border: none;
  color: black;
  font-size: 16px;
`;

const AnimatedArea = styled(Area)<{ show: boolean }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? "translateY(0)" : "translateY(-10px)")};
  transition: opacity 0.4s ease-in-out,
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const LoginButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: ${MainColor};
  border: 1px solid ${Sub};
  margin-top: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: pretendard;
  font-size: 16px;
`;

const SigninArea = styled.div`
    display: flex;
    flex-direction: column;

    transition: 0.4s ease-in-out;
`

const SignUpText = styled.span`
cursor: pointer;
  &:hover{
    color: ${Sub};
  }
`

interface Props {
  onArrowClick  : () => void;
  handleSignup : () => void;
}

const Signin: React.FC<Props> = ({onArrowClick, handleSignup}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRenderer, setPasswordRenderer] = useState(false);
  const [loginRenderer, setLoginRenderer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {LocalLogin} = useAuthStore();

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
          width: "fit-content"
        }}
        onClick={onArrowClick}
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
        <AnimatedArea show={passwordRenderer}>
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
        </AnimatedArea>
      )}
      {password && (
        <AnimatedArea show={loginRenderer}>
          <Area>
            <LoginButton onClick={() => LocalLogin(email, password)}>로그인</LoginButton>
          </Area>
        </AnimatedArea>
      )}
      <SigninArea>
        계정이 아직 없다면?
      <SignUpText onClick={handleSignup}>회원가입</SignUpText>
      </SigninArea>
    </Panel>
  );
};

export default Signin;
