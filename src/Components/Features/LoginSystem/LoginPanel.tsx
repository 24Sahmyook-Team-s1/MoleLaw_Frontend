import styled from "@emotion/styled";
import { Stroke, Text } from "../../../style/colors";
import LoginMenu from "./LoginMenu";
import { useEffect, useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import TermsOfUse from "./TermsOfUse";

const Wrapper = styled.div`
  position: absolute;
  background-color: #dfdfdfaf;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(10px);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
  color: ${Text};
`;

const Panel = styled.div`
    width: 500px;
  height: 600px;
  background-color: #ffffffb7;
  border: 1px solid ${Stroke};
  border-radius: 20px;
  box-shadow: 0px 10px 15px #00000055;

  overflow: hidden;
  
`

const SignUpArea = styled.div<{termhandle: boolean}>`
  display:grid;
  width:500px;
  height:1200px;
  grid-template-rows: 1fr 1fr;

  transform: ${({ termhandle }) => termhandle ? "translateY(-600px)" : "translateY(0px)"};
  transition: transform 0.5s ease-in-out;
`

const AnimatedArea = styled.div<{ loginhandle: boolean, signinhandle: boolean }>`
  transform: ${({ loginhandle, signinhandle }) => loginhandle ? "translateX(0)" : signinhandle ? "translateX(-1000px)" : "translateX(-500px)"};
  transition: transform 0.5s ease-in-out;

  display:flex;
  flex-direction: row;
  width: fit-content;
  height: 600px;
`;


const LoginPanel: React.FC = () => {
  const [emailClick, setEmailClick] = useState(false);
  const [loginMenuRenderer,setLoginMenuRenderer] = useState(true);
  const [signinRenderer, setSigninRenderer] = useState(false);
  const [termsRenderer, setTermsRenderer] = useState(false);

  const handleEmailClick = () => {
    setEmailClick((prev) => !prev);
  };

  const handleterms = () => {
    setTermsRenderer((prev) => !(prev))
  }

  const handleSignin = () => {
    setSigninRenderer((prev) => !prev);
  }

  useEffect (() => {
    if (!emailClick) {
        setLoginMenuRenderer(true);
    }
    else {
        setLoginMenuRenderer(false);
    }
  }, [emailClick])

  return (
    <Wrapper>
        <Panel>
            <AnimatedArea loginhandle={loginMenuRenderer} signinhandle={signinRenderer}>
                <LoginMenu onEmailClick={handleEmailClick} />
                <Signin onArrowClick={handleEmailClick} handleSignup={handleSignin}/>
                <SignUpArea termhandle={termsRenderer}>
                  <Signup handleSignin={handleSignin} terms={handleterms}/>
                  <TermsOfUse terms={handleterms} />
                </SignUpArea>
            </AnimatedArea>
        </Panel>
    </Wrapper>
  );
};

export default LoginPanel;
