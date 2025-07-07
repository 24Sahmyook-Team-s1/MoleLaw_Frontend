import styled from "@emotion/styled";
import { MainColor } from "../../style/Colors";
import ReactMarkDown from "react-markdown";
import { TermsOfUseText } from "../../Data/TermsofUse";

const Panel = styled.div`
  width: 500px;
  height: 600px;
  display: grid;
  grid-template-rows: 1fr auto 1fr;

  padding: 50px;
  box-sizing: border-box;
  font-family: pretendard;
`;

const Terms = styled.div`
  height: 350px;
  width: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 0 30px;

    /* 스크롤 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const Title = styled.div`
    padding: 0;
    margin: 0;
    `;

const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: ${MainColor};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

interface Props {
    terms: () => void;
}

const TermsOfUse: React.FC<Props> = ({terms}) => {
  return (
    <Panel>
      <Title><ReactMarkDown>## 이용 약관(개인정보 수집 및 이용)</ReactMarkDown></Title>
      <Terms>
        <ReactMarkDown>{TermsOfUseText}</ReactMarkDown>
      </Terms>
      <Check>
        <CheckButton onClick={terms}>확인</CheckButton>
      </Check>
    </Panel>
  );
};

export default TermsOfUse;
