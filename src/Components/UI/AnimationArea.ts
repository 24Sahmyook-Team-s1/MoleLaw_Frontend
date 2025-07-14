import styled from '@emotion/styled';


export const LtoRSlideAnimationArea= styled.div<{ show: boolean }>`
  transform: ${({ show }) => (show ? "translateX(0px)" : "translateX(-300px)")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
`;

export const TtoDFadeAnimationArea = styled.div<{ show: boolean }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? "translateY(0)" : "translateY(-10px)")};
  transition: opacity 0.2s ease-in-out,
  transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;