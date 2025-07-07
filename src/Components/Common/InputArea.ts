import styled from "@emotion/styled";
import { Text } from "../../style/Colors";

export const InputArea = styled.div`
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

export const InputAreaText = styled.span`
  font-size: 10px;
  color: ${Text};
`;

export const InputAreaField = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: white;
  border: none;
  color: black;
  font-size: 16px;
`;