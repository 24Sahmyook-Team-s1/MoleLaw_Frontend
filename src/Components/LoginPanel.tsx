import styled from "@emotion/styled";
import { Stroke, Text } from "../style/Colors";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../store/states";


const Wrapper = styled.div`
    position:absolute;
    background-color: #dfdfdfaf;
    width: 100vw;
    height:100vh;
    backdrop-filter: blur(10px);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1000;
    color:${Text}
`

const Panel = styled.div`
    width: 500px;
    height: 600px;
    background-color: #ffffffb7;
    border: 1px solid ${Stroke};
    border-radius: 20px;
    box-shadow: 0px 10px 15px #00000055;

    display:grid;
    grid-template-rows: auto auto auto 1fr;

    padding: 50px;
    box-sizing: border-box;
`

const Logo = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    font-family: "Chiron Sung HK";
    margin-bottom: 60px;
    img{
        width: 70px;
    }
`

const Login = styled.div`
    gap:10px;
`

const Extra = styled.div`
    font-family: "pretendard";
    font-size: 12px;

    display:flex;
    justify-content: center;
    align-items: flex-end;

    padding-bottom: 10px;
`  

const LoginButton = styled.button`
    background-color: transparent;
    height: auto;
    width: auto;
    padding: 0;
    img{
        display:block;
        width: 300px;
    }
`

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

    color:black;
`
const LoginPanel:React.FC = () => {
    const {googleLogin , kakaoLogin} = useAuthStore();

    return(
        <Wrapper>
            <Panel>
                <Logo>
                    <img src="/PointCircle.svg"/>
                    <div style={{lineHeight:"1", paddingTop:"12px"}}>MoleLaw</div>
                    <div style={{fontSize:"20px", paddingTop:"0px"}}>AI 기반 법률 조언 서비스</div>
                </Logo>
                <Login> 
                    <LoginButton onClick={kakaoLogin}>
                        <img src="/KakaoLogin.png"/>
                    </LoginButton>
                </Login>
                <Login>
                    <LoginButton style={{backgroundColor:"#ffffff"}} onClick={googleLogin}>
                        <GoogleButton>
                            <FcGoogle size={24}/>
                            Google 계정으로 로그인
                        </GoogleButton>
                    </LoginButton>
                </Login>
                <Extra>
                    본 사이트는 국가법령정보 공동활용(Law Open Data)을 기반으로 AI 기술을 활용하여 다양한 법적 상황에 대한 가능성 있는 조언을 제공합니다.
제공되는 내용은 참고용이며 실제 법적 판단이나 판결과는 다를 수 있습니다. 이에 따라 본 사이트는 정보 이용에 따른 법적 책임을 지지 않습니다.
                </Extra>
            </Panel>
        </Wrapper>
    )
}

export default LoginPanel;