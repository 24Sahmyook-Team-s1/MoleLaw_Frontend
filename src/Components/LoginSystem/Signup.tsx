import styled from "@emotion/styled";
import { FaArrowLeft } from "react-icons/fa";
import { MainColor, Sub, Text } from "../../style/Colors";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/states";

const Panel = styled.div`
  width: 500px;
  height: 600px;
  display: grid;
  grid-template-rows: auto auto auto auto auto auto 1fr;

  padding: 50px;
  box-sizing: border-box;
  font-family: pretendard;
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

const SigninTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${Text};
  padding-bottom: 50px;
`;

const TermsOfUse = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  width: 300px;
  justify-content: space-between;
`;

const TermsText = styled.a`
  color:${Text};
  &:hover{
    color:${Sub}
  }
`

const TermsCheck = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid black;

  &:checked {
    background-color: ${MainColor};
    border: 1px solid black;
  }
`;
const SignupButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: ${MainColor};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
`;

const AnimatedArea = styled(Area)<{ show: boolean }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? "translateY(0)" : "translateY(-10px)")};
  transition: opacity 0.4s ease-in-out,
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  margin: 0;
`;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface props {
  handleSignin: () => void;
  terms: () => void;
}

const Signup: React.FC<props> = ({ handleSignin, terms }) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [termsCheck, setTermsCheck] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const [render1, setRender1] = useState(false);
  const [render2, setRender2] = useState(false);
  const [render3, setRender3] = useState(false);
  const [render4, setRender4] = useState(false);

  const { LocalSignUp } = useAuthStore();

  useEffect(() => {
    if (email) setRender1(true);
    else setRender1(false);
    if (nickname) setRender2(true);
    else setRender2(false);
    if (password) setRender3(true);
    else setRender3(false);
    if (passwordCheck) setRender4(true);
    else setRender4(false);
  }, [email, nickname, password, passwordCheck]);

  const HandleSignup = () => {
    if (email.length > 0 && !isValidEmail(email)) setEmailError(true);
    else setEmailError(false);
    if (password !== passwordCheck) setPasswordError(true);
    else setPasswordError(false);
    if (!termsCheck) setTermsError(true);
    else setTermsError(false);

    if (!emailError && !passwordError && !termsError)
      LocalSignUp(email, password, nickname);
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
        onClick={handleSignin}
      >
        <FaArrowLeft color="black" display="block" />
      </button>
      <SigninTitle>회원가입</SigninTitle>
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
        <AnimatedArea show={render1}>
          <Area>
            <InputArea>
              <InputAreaText>닉네임</InputAreaText>
              <InputAreaField
                type="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </InputArea>
          </Area>
        </AnimatedArea>
      )}
      {nickname && (
        <AnimatedArea show={render2}>
          <Area>
            <InputArea>
              <InputAreaText>비밀번호</InputAreaText>
              <InputAreaField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputArea>
          </Area>
        </AnimatedArea>
      )}
      {password && (
        <AnimatedArea show={render3}>
          <Area>
            <InputArea>
              <InputAreaText>비밀번호 확인</InputAreaText>
              <InputAreaField
                type="password"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
            </InputArea>
          </Area>
        </AnimatedArea>
      )}
      {passwordCheck && (
        <AnimatedArea show={render4}>
          <Area style={{ marginTop: "30px", boxSizing: "border-box" }}>
            <TermsOfUse>
              <TermsText onClick={terms}>이용 약관(개인정보 수집 및 이용) 동의</TermsText>
              <TermsCheck
                type="checkbox"
                checked={termsCheck}
                onChange={(e) => setTermsCheck(e.target.checked)}
              />
            </TermsOfUse>
            <SignupButton onClick={HandleSignup}>회원가입</SignupButton>
            {emailError && <Error>이메일을 확인해주십쇼</Error>}
            {passwordError && !emailError && (
              <Error>입력된 비밀번호가 틀립니다</Error>
            )}
            {termsError && !passwordError && !emailError && (
              <Error>이용 약관에 동의해주십쇼</Error>
            )}
          </Area>
        </AnimatedArea>
      )}
    </Panel>
  );
};

export default Signup;
