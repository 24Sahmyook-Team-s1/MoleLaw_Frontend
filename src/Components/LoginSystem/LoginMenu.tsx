import styled from "@emotion/styled";
import { FcGoogle } from "react-icons/fc";
import { Sub } from "../../style/Colors";
import { useAuthStore } from "../../store/states";

const Panel = styled.div`
  width: 500px;
  height: 600px;

  display: grid;
  grid-template-rows: auto auto auto auto 1fr;

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

const Login = styled.div`
  margin-bottom: 5px;
`;

const Extra = styled.div`
  font-family: "pretendard";
  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  padding-bottom: 10px;
`;

const LoginButton = styled.button`
  background-color: transparent;
  height: auto;
  width: auto;
  padding: 0;
  box-sizing: border-box;
  img {
    vertical-align: middle;
    width: 300px;
    height: 40px;
    padding: 0;
    margin: 0;
  }
`;

const GoogleButton = styled.div`
  width: 300px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  padding: 0 13px;
  align-items: center;
  gap: 50px;
  font-size: 14px;
  font-family: "pretendard";
  border: 1px solid #dadada;
  border-radius: 5px;

  color: black;
  box-sizing: border-box;
`;

const LocalLogin = styled.div`
  width: 300px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Sub};
  border-radius: 5px;

  font-size: 14px;
  font-family: "pretendard";
  border: 1px solid grey;
  box-sizing: border-box;
  padding: 0;
`;

interface Props {
  onEmailClick: () => void;
}

const LoginMenu: React.FC<Props> = ({onEmailClick}) => {
    const {googleLogin , kakaoLogin} = useAuthStore();
  return (
    <Panel>
      <Logo>
        <img src="/PointCircle.svg" />
        <div style={{ lineHeight: "1", paddingTop: "12px" }}>MoleLaw</div>
        <div style={{ fontSize: "20px", paddingTop: "0px" }}>
          AI 기반 법률 조언 서비스
        </div>
      </Logo>
      <Login>
        <LoginButton onClick={onEmailClick}>
          <LocalLogin>이메일 로그인</LocalLogin>
        </LoginButton>
      </Login>
      <Login>
        <LoginButton onClick={kakaoLogin}>
          <img src="/KakaoLogin.png" />
        </LoginButton>
      </Login>
      <Login>
        <LoginButton
          style={{ backgroundColor: "#ffffff" }}
          onClick={googleLogin}
        >
          <GoogleButton>
            <FcGoogle size={24} />
            Google 계정으로 로그인
          </GoogleButton>
        </LoginButton>
      </Login>
      <Extra>
        본 사이트는 국가법령정보 공동활용(Law Open Data)을 기반으로 AI 기술을
        활용하여 다양한 법적 상황에 대한 가능성 있는 조언을 제공합니다. 제공되는
        내용은 참고용이며 실제 법적 판단이나 판결과는 다를 수 있습니다. 이에
        따라 본 사이트는 정보 이용에 따른 법적 책임을 지지 않습니다.
      </Extra>
    </Panel>
  );
};

export default LoginMenu;
