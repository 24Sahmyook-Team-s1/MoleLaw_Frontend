import styled from "@emotion/styled";
import type { ReactNode } from "react";

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: white;

  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 20px;
  font-family: Pretendard-regular;
  text-align: left;
`;

interface Props {
  children: ReactNode;
}

const InfoBubble: React.FC<Props> = ({ children}) => {
  return <Wrapper>{children}</Wrapper>;
};

export default InfoBubble;
