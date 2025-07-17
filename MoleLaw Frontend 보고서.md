#### 프로젝트 개요(요약)

 **"법을 사람이 모두 알기에 어려움이 있다면, 단순히 법을 찾고 적용 가능성을 확인하는 걸 도와줄 파트너가 있다면 사람들의 부담이 줄어들지 않을까?"** 라는 생각 아래 시작된 법률 API와 연계한 AI 기반 법률 조언 서비스로서.
 **"누구나 쉽게 법률 정보를 탐색하고 활용할 수 있는 사용자 친화적 플랫폼을 만드는 것"** 을 목표로 기획되었습니다.
#### 프론트엔드 담당자

김재욱 | Frontend Engineer
- Frontend Design
- Frontend Development
- Frontend Server Enginner
- 서비스 아키텍처 설계

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
#### 서비스 아키텍처 (이미지)

![[Pasted image 20250716140806.png]]
해당 이미지 상

- **Unauthorized UI**
- **Authorized UI (Service)**

를 구성하였습니다.
<br><br><br><br><br><br><br><br><br><br>
#### 프론트엔드 기술 스택

![Static Badge](https://img.shields.io/badge/@emotion-hotpink?style=for-the-badge)![Static Badge](https://img.shields.io/badge/CSS-ffffff?style=for-the-badge&logo=css&logoColor=663399)![Static Badge](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)![Static Badge](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)![Static Badge](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Static Badge](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)![Static Badge](https://img.shields.io/badge/Zustand-orange?style=for-the-badge)![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

**프레임워크**
- **React**
	사용자 인터페이스 구축을 위한 컴포넌트 기반 JavaScript 라이브러리입니다. 
	컴포넌트 기반 프로그래밍으로 재사용성, 유지보수성을 높였으며.
	기초적인 XSS 등에도 대비하였습니다.

**언어**
- **Typescript**
	정적 타입을 지원하는 JavaScript의 상위 집합으로, 
	코드의 안정성과 예측 가능성을 높였습니다.
	사전 정의된 타입을 체크하는 방식으로 보안 안정성 또한 높이기 위해 사용하였습니다.

**빌드**
- **Esbuild**
	초고속 JavaScript 번들러이자 트랜스파일러로, 
	TypeScript 및 JSX 파일을 빠르게 처리하기 위해 사용하였습니다. 
	빠른 개발 환경 구축 및 프로덕션 빌드 시간 단축을 위해 사용하였습니다.

**스타일링**
- **CSS**
- **@emotion**
	CSS-in-JS 방식의 스타일링 도구로, 컴포넌트 단위 스타일링을 가능하게 하며, 
	props를 기반으로 동적인 스타일링이 가능합니다.

**클라이언트**
- **Axios**
	비동기 HTTP 통신을 위한 Promise 기반 클라이언트입니다. 
	API 요청 및 응답 처리를 간결하게 구현할 수 있어 사용하였습니다.

**상태 관리** 
- **Zustand**
	경량 상태 관리 라이브러리입니다.
	글로벌 상태를 효율적으로 관리하고, React의 리렌더링 최소화를 통해 퍼포먼스를 최적화하였습니다.
	또한 같은 Flux Pattern 기반 상태 관리 라이브러리인 Redux 와 대비 상태 관리가 직관적이기에 Zustand를 채택하였습니다. 

**CI/CD**
- **Github Action (Self Hosted)**
	GitHub 저장소에 연동된 자동화 워크플로우 시스템으로, 커밋이나 PR 시 테스트 및 배포 자동화를 설정하였습니다. 
	자체 호스팅 러너를 활용하여 서버 환경에 맞는 유연한 작업 처리가 가능하게 하였습니다.

**서버**
- **AWS EC2**
- **Nginx**
- **Let's Encrypt + Certbot (HTTPS 인증)**
#### 디자인 개요

MoleLaw 는 법을 간단하게, 단순하게 알아보기 위해 시작한 서비스입니다. 
이에 따라 UI도 **Progressive Disclosure (점진적 공개)** 형식으로 구성을 하였습니다.
Root Page 에 표시되는 기능을 기본적이고 필수적인 기능으로 제한하여 유저의 집중도를 향상시키면서도 사이드바에 Icon의 형식으로 추가적 기능들을 표시함으로서 추가적 기능을 어렵게 여기저기 찾아다니지 않게 하였습니다.

또한 두가지 핵심 키 포인트를 만들고 그것을 중심으로 디자인 구성을 하였습니다.
- **동작은 간단하게**
- **반응은 확실하게**

**동작은 간단하게**
- React 의 특성 중 하나인 컴포넌트 기반 코딩을 활용하여 **SPA(Single Page Application)** 을 구현하여 유저의 **불필요한 대기시간을 최소화** 하였습니다.
	- Protected Route의 구현을 별도의 페이지가 아닌 '조건부 렌더링'을 통한 로그인 Panel 형태로 구현하여 **페이지 갯수 최소화**.
-  Progressive Disclosure 방식으로 '**당장 필요한 기능을 눈앞에, 추가적인 기능은 옆에**'라는 느낌으로 UI를 구현.
- Setting, Profile, Chatroom List, Fixed SideBar 등 표면에 표시된 추가기능 또한 숫자를 줄여 **UI 복잡도 저하.**

**반응은 확실하게**
- 모든 UI에 대하여 Click, Hover 등에 **반응하는 애니메이션을 지정**
- 애니메이션 속도를 빠르게 조절하여 확실한 Feedback과 **심적 안정효과 동시 겨냥.**

**디자인 예시**

![[Pasted image 20250716172808.png]]
*사이드바 hover 전*
![[Pasted image 20250716172844.png]]
*사이드바 hover 후*

위처럼 늘어나는 sidebar 를 통해 **Progressive Disclosure** 를 실현하였습니다.
<br><br><br><br><br><br><br><br>
#### 컴포넌트 구조

![[Pasted image 20250716153022.png]]
**텍스트 요약**
```txt
src/
├── Components/
│   ├── Feature/
│   │   ├── ChattingSystem/
│   │   ├── LoginSystem/
│   │   ├── SettingSystem/
│   │   └── ProfilePanel.tsx
│   ├── Layout/
│   └── UI/
├── data/
├── routes/
├── store/
│   ├── auth/
│   ├── chat/
│   ├── data/
│   ├── utils/
│   ├── constants.ts
│   ├── storeIndex.ts
│   └── types.ts
├── style/
│   ├── colors.ts
│   └── globalStyle.ts
└── Views/
    └── MainView.tsx

```

**컴포넌트 구조 개요**

본 프로젝트의 컴포넌트(폴더) 구조를 구성할때 아래와 같은 구조적 원칙을 적용하여 설계하였습니다.

- Layout, UI 등 **공통 컴포넌트의 완전 분리**
- **Feature Driven Architecture**
- **타 개발자가 봐도 직관적**이고 유지보수 가능한 코드 구조

이러한 기조 아래 저는 프로젝트를 진행 후 처음 의도와 아키텍처가 다르게 구성되었다 생각하여 대대적인 Refactoring 을 통해 아래와 같은 파일구조를 실현하였습니다.

- Root 폴더분류에 **SoC (Separation of Concerns)원칙을 적용**하여 유지보수 시 어렵지않은 파일접근
- Component 폴더 하위를 Feature, Layout, UI로 분리하여 **공통 컴포넌트의 분리**
- Feature폴더와 Store 폴더를 세분화하여 **Feature Driven Architecture 를 부분적으로 실현**
- colors.ts를 통한 **색상 시스템** 통일
- MainView.tsx View컴포넌트를 통한 **User의 컴포넌트 직접접근 배제**.

**화면 구조 예시**

```txt
MainView.tsx
├── Sidebar (고정, Expendable)
├── MainPanel
│   ├── Chats (인증 상태 && Selected Chatroom 존재시 Render)
│   └── LoginPanel (비인증 상태시 표기)
```
#### 상태 관리

본 프로젝트의 상태관리에는 **Zustand** 라이브러리가 사용되었습니다.
Zustand 사용을 통한 기대효과는 다음과 같습니다.

- API Call 과 Hook의 통합으로 **Feature Driven 실현**
- **직관적인 Global 상태 관리**
- **Flux Pattern**을 적용한 따른 단방향 흐름에 따른 역할 수행

![[Pasted image 20250716155403.png]]
[Flux Pattern 예시도]

상태관리는 **Global / Local** 단으로 분리하여 관리 하였습니다.
기준은 다음과 같이 설정하였습니다.

- 다수의 컴포넌트에서 상태가 공유되어야 하는가?
- **Parent - Child** 형식으로 이어지지 않은 컴포넌트가 상태를 공유해야 하는가?
- **API Call** 이 포함되는가?

위와 같은 기준으로 Backend 와 연동하여 API Call 이 필수적인 **authorization, CRUD, Fetch** 등의 Hook들과 Parent Child 형식으로 이어지지 않은 다수에 컴포넌트에서 활용되어야 하는 alert 에 해당하는 **Toast Popup** 을 별도 Store 로 분리하여 관리하였습니다.

**왜 Redux 대신 Zustand를 선택했는가**
Redux 와 Zustand 둘 다 Flux Pattern 에 기반한 상태 관리 라이브러리입니다.
Zustand는 Redux 대비 러닝 커브가 낮고 코드도 간결하여, 빠른 초기 개발과 유지보수 측면에서 이점을 제공하였기에 Zustand를 선택하였습니다.

또한, 컴포넌트구조에서 언급한 ' ***타 개발자가 봐도 직관적**이고 유지보수 가능한 코드 구조* '를 더욱 직접적으로 실현에 있어서 Zustand를 이용한 간결 코드가 도움이 된다 생각하였습니다.

**Zustand 코드 예시**

```typescript
export const useStoreName = create<StoreInterfacce>((set, get) => ({
	//Store Interface에 대한 초기화

	hook1: () => {
	//hook1 에 해당하는 코드
	},

	hook2: () => set({storeInterface에 존재하는 State}),

	//추가적인 hooks
}))
```
<br><br>
#### API 연동 및 데이터 처리

본 프로젝트의 API 연동 및 데이터 처리에는 **Axios** 가 사용되었습니다.
Axios를 사용한 이유는 아래와 같습니다.

- 코드의 **간결함**
- Reponse 에 대한 **자동 Json Parsing**
- **충실한 기본**기능

본 프로젝트에서 API 연동, 데이터 처리에 있어 높은 수준의 기능을 요구하지 않는다 생각하여, 기본기가 충실하고 Code Format 이 간결한 Axios 를 사용하였습니다.
데이터 처리의 경우 **보안상의 이유로 Backend 에서 모든 Data를 전담**하여 처리하였습니다.
로그인 시스템인 JWT또한 httponly 쿠키로 Backend 에서 관리하여 Front Level 에선 credential을 포함한 요청을 보내는 것 외에 큰 데이터 처리가 없었습니다.

**에러처리**
에러 처리의 경우 Backend 와 에러코드를 서로 맞추어 특정 에러코드에 대한 에러문구를 hook 을 호출한 컴포넌트에 Return 해주고 해당 Component 에서 Toast Popup 에 대한 hook 을 호출하여 에러를 설정해준 후 Toast Popup으로 어떤 Issue 가 있는지 표출하는 방식으로 진행하였습니다.

**Axios 코드 예시**

```typescript
const response = await axios.get(`API endpoint`, 
	{
		//필요한 Query 값
	},
	{
	    withCredentials: boolean, //쿠키등을 포함하는가에 대한 여부
    });
```

#### 서버 및 배포

서버는 **AWS EC2**, 배포에는 **Github Self-hosted Runner** 를 이용하였습니다.
아래와 같은 스크립트로 진행하였습니다.

```yaml
name: Deploy from Self-hosted Runner

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: self-hosted

    steps:
      - name: Checkout source #코드 내용 최신화
        uses: actions/checkout@v3
		
      - name: Clear git index cache #기존 git 내역 삭제
        run: |
          git rm --cached -r .
          
      - name: Install dependencies #의존성 설치
        run: npm ci

      - name: Build project #프로젝트 빌드
        run: npm run build

      - name: Copy dist to Nginx root #Nginx 경로로 이동하여 배포
        run: |
          sudo rm -rf 경로
          sudo cp -r 경로
```

Self hosted Runner 를 이용하여 모든 배포 시스템이 서버 내부에서 이루어지게 하였습니다.

**인증 및 갱신**
Backend 에서 구현한 로그인 시스템인 **OAuth2.0**을 사용하기 위해서는 **SSL(Https)인증이 필수**적이었습니다.
**let's encyrpt** 라는 비영리 기관의 인증서를 **certbot**을 이용하여 발급하였고 **만료 기간이 3개월**이기에 **자동 갱신 설정** 또한 해두었습니다.

#### 테스트 및 피드백

본 프로젝트는 1차 개발 완료 후 배포를 진행하여 주변인에 대하여 **베타 테스트**를 진행하였습니다.
본 목차에선 베타테스트 결과 중 Frontend 와 연관된 질문에 대해 요약하고자 합니다.

총 **8명**의 User 가 참여하였으며 Frontend 와 연관된 질문으로는
'*UI/UX(화면 구성, 버튼 위치, 이동 흐름 등)은 만족스러웠나요*?' 가 제시되었습니다.
- 매우 만족 2표
- 만족 4표
- 보통 1표
- 불만족 1표
로 **75%** 의 **긍정적 답변**을 받았습니다.

**부정적 답변**의 사유는 아래와 같았습니다.
- 채팅 송신에 있어 Shift + Enter가 아닌 Enter 단일이 편할 것 같음

실제로 초기 UX 에서 엔터는 **실수로 누를 확률이 존재한다 생각**하여 송신 기능은 **Shift + Enter 에 할당**하였으나. 해당 **피드백 이후** 송신 기능을 **Enter 단일로 변경**하여 피드백을 적용하였습니다.
<br><br>
**내부 테스트 사항**
- MVP 작동에 대한 수동 테스트
- Axios 비동기 요청에 대한 에러 세팅 시나리오 점검
- 외부 공격(XSS, SQL Injection)에 대한 대응 점검

#### 개선사항 및 회고

**개선 가능 사항**
- 전체적인 **테스트의 부족** -> 컴포넌트 단위 테스트에 대한 공부를 통한 **자동 테스트 기능 도입**.
- **버전 관리 용이성** 부족 -> **Docker 도입**을 통한 **Docker Image를 통한 버전 관리** 가능성 검토.
- 모바일 환경 **미대응** -> **@media 태그 도입**을 통한 모바일 대응

**이슈**
- UX에 관한 **고찰 부족** -> UX 설계시 팀원들과에 소통을 통한 **User입장을 더욱 강화**한 UX 설계
- 아키텍처 적용을 위한 **대대적인 Refactoring** -> 초기에 아키텍처를 단단히 잡아 **지속적인 적용 및 실시간 Refactor**
- State 관리의 **미숙함** -> **지속적인 공부**와 State 추적 Dev tool 을 이용한 **State 추적 및 설계**.
- 초기 서버 설정시 **배포에 어려움**을 겪은 점 -> 경험 이후 **강화된 서버 관련 지식**을 통한 추후 프로젝트 진행시 확실한 배포

**회고**
이번 프로젝트를 통해서 단순한 컴포넌트및 화면 구현을 넘어서, 서비스 아키텍처 구성과 State Flow 관리, UX 등을 고려한 **종합적 Frontend 개발 경험**을 쌓게 되었습니다.
Frontend 1인 개발을 통해 제가 모르는 점과 아는점을 객관화 하여 필요한 지식들에 대해 공부, 적용하였으며 **자신의 코드를 확실하게 아는것**에 중요성을 깨닫게 되었습니다.
Frontend 단일 개발자이자 책임자로서 **Backend 책임자와 협업**하여 API 엔드포인트와 Response에 대한 Crosscheck, Json Data Format 에 대한 설계를 하는것은 새로운 경험이었으며 **제 프론트엔드 데이터 처리 실력을 한층 올려준 경험**이 되었습니다.

###### 이번 프로젝트를 통해 성장한 부분들을 나열하면 아래와 같을 것 같습니다.
- Zustand를 이용한 Global 상태 관리 및 Flux Pattern 에 대한 이해
- Github Action 과 AWS EC2 배포를 통한 Dev-ops 경험
- CSS-IN-JS 를 이용한 조건부 스타일 랜더링에 대한 이해 및 활용
- 쿠키를 이용한 인증체계에 대한 이해
- Axios 를 이용한 API call(fetch)에 대한 이해와 활용
- 아키텍처 적용 경험을 통한 아키텍처와 클린코드의 중요성 파악