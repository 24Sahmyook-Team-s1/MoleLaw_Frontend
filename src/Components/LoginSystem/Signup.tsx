import styled from "@emotion/styled";
import { FaArrowLeft } from "react-icons/fa";
import { Text } from "../../style/Colors";
import { useState } from "react";
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

interface props {
  handleSignin: () => void;
}

const Signup: React.FC<props> = ({ handleSignin }) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const { LocalSignUp } = useAuthStore();

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
        )
      }
      {nickname && (
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
        )
      }
      {password && (
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
        )
      }
      {passwordCheck && (
      <Area>
      <button onClick={() => LocalSignUp(email, password, nickname)}>회원가입</button>
      </Area> 
    )}
    </Panel>
  );
};

export default Signup;
