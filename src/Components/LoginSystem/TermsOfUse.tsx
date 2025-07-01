import styled from "@emotion/styled";
import { MainColor } from "../../style/Colors";
import ReactMarkDown from "react-markdown";

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
`;

const TermsOfUseText = `
본 약관은 AI 기반 법률 조언 사이트 'Mole Law' (이하 "본 사이트")가 제공하는 서비스의 이용 조건 및 절차, 회원과 본 사이트의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.

---

### 제1조 (목적)  
본 약관은 본 사이트가 제공하는 AI 기반 법률 조언 서비스(이하 "서비스")를 이용함에 있어 본 사이트와 회원의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.

---

### 제2조 (정의)  
**"본 사이트"**라 함은 AI 기술을 활용하여 법률 조언 서비스를 제공하는 웹사이트를 의미합니다.  
**"회원"**이라 함은 본 사이트에 접속하여 본 약관에 따라 회원으로 가입하고 본 사이트가 제공하는 서비스를 이용하는 자를 말합니다.  
**"서비스"**라 함은 본 사이트가 구현한 AI 기술을 통해 법률 관련 정보를 제공하고, 다양한 법적 상황에 대한 가능성 있는 조언을 제시하는 행위를 의미합니다.

---

### 제3조 (경고 및 면책 조항)  
본 사이트는 국가법령정보 공동활용(Law Open Data)을 기반으로 AI 기술을 활용하여 다양한 법적 상황에 대한 가능성 있는 조언을 제공합니다.  
제공되는 내용은 참고용이며 실제 법적 판단이나 판결과는 다를 수 있습니다.  
본 사이트는 서비스 이용으로 인해 발생하는 어떠한 법적 책임도 지지 않습니다.  
회원은 본 사이트에서 제공하는 정보를 전적으로 본인의 책임 하에 활용해야 하며, 필요한 경우 반드시 전문가의 개별적인 법률 자문을 받아야 합니다.

---

### 제4조 (회원가입)  
회원이 되고자 하는 자는 본 약관에 동의하고 본 사이트가 정한 가입 양식에 따라 개인정보를 기입함으로써 회원가입을 신청합니다.  

본 사이트는 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.  
1. 가입 신청자가 본 약관에 의하여 이전에 회원 자격을 상실한 적이 있는 경우. 다만, 회원 자격 상실 후 3개월이 경과하고 본 사이트의 회원 재가입 승낙을 얻은 경우는 예외로 합니다.  
2. 등록 내용에 허위, 기재 누락, 오기가 있는 경우  
3. 기타 회원으로 등록하는 것이 본 사이트의 기술상 현저히 지장이 있다고 판단되는 경우

---

### 제5조 (개인정보 수집 및 이용 동의)  
본 사이트는 원활한 서비스 제공 및 회원 관리를 위해 다음과 같은 개인정보를 수집합니다.  
- **필수 수집 항목:** 이메일 주소, 닉네임, 비밀번호  

수집된 개인정보는 서비스 이용, 회원 식별, 비밀번호 및 아이디 찾기 등 회원의 원활한 서비스 이용을 위한 목적으로만 활용됩니다.  
회원의 개인정보 보유 기간은 회원 탈퇴 시까지이며, 탈퇴 즉시 수집된 개인정보는 지체 없이 파기됩니다.

---

### 제6조 (회원의 의무)  
회원은 본 약관의 규정, 관계 법령 및 본 사이트의 안내 사항을 준수해야 합니다.  
회원은 회원가입 시 기재한 사항에 변경이 있는 경우, 즉시 온라인으로 수정하거나 전자우편 등 방법으로 본 사이트에 그 변경사항을 알려야 합니다.  
회원은 아이디와 비밀번호에 대한 관리 책임을 가지며, 이를 제3자에게 이용하게 해서는 안 됩니다.  
아이디 및 비밀번호의 관리 소홀, 부정 사용으로 인해 발생하는 모든 결과에 대한 책임은 회원에게 있습니다.

---

### 제7조 (서비스의 변경 및 중단)  
본 사이트는 상당한 이유가 있는 경우 운영상 또는 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경하거나 중단할 수 있습니다.  
서비스 내용의 변경 또는 중단에 관한 사항은 본 사이트 내 공지사항을 통해 회원에게 고지합니다.

---

### 제8조 (약관의 개정)  
본 사이트는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.  
개정 시, 적용일자 및 개정 사유를 명시하여 현행 약관과 함께 본 사이트 초기화면에 적용일자 7일 전부터 적용일자 전일까지 공지합니다.  
단, 회원에게 불리하게 약관 내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다.

---

### 제9조 (분쟁 해결)  
본 약관에 명시되지 않은 사항은 대한민국 법령 및 일반 상관례에 따릅니다.  
서비스 이용과 관련하여 본 사이트와 회원 사이에 분쟁이 발생한 경우, 양 당사자 간의 합의에 의해 원만히 해결하도록 노력합니다.  
합의가 이루어지지 않는 경우, 민사소송법상의 관할 법원에 제소할 수 있습니다.

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
