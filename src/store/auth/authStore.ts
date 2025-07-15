import axios, { AxiosError } from "axios";
import { API_BASE_URL, OAUTH2_URL } from "../constants";
import { create } from "zustand";
import type { AuthStore } from "../types";

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => set({ user }),

  //Auth Check
  checkAuthStatus: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        set({
          user: response.data.data,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
    return false;
  },

  
  refreshToken: async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/reissue`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        return true;
      }
      return false;
    } catch {
      set({ isAuthenticated: false });
      return false;
    }
  },

  LocalSignUp: async (email: string, password: string, nickname: string) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/signup`,
        {
          email: email,
          password: password,
          nickname: nickname,
        },
        {
          withCredentials: true,
        }
      );
      set({
        user: res.data,
        isLoading: false,
      });
      return "가입 성공";
    } catch (error) {
      set({ isLoading: false });
      const err = error as AxiosError;
      if(err.status === 400){
        return "이미 가입한 이메일입니다."
      } else if (err.status === 500){
        return "가입에 실패했습니다, 다시 시도해주세요"
      } else return "가입 실패";
    }
  },

  LocalLogin: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      
      // 로그인 성공 시 처리
      await get().checkAuthStatus();
      return "로그인 성공";
    } catch (error){
      set({ isLoading: false });
      const err = error as AxiosError;
      if(err?.status === 400){
          return "비밀번호가 틀립니다."
      }else if (err?.status === 502) {
          return "존재하지 않는 이메일 입니다."
      } else return "로그인 실패";
    }
  },

  //구글 로그인
  googleLogin: () => {
    set({ isLoading: true });

    window.location.href = `${OAUTH2_URL}/google`;
  },

  //카카오 로그인
  kakaoLogin: () => {
    set({ isLoading: true });

    window.location.href = `${OAUTH2_URL}/kakao`;
  },

  //로그아웃 => 세션 삭제 && JWT 토큰 무효화 요청
  logout: async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      set({ user: null, isAuthenticated: false });
      return true;
    } catch {
      return false;
    }
  },

  quit: async () => {
    try {
      await axios.delete(`${API_BASE_URL}/auth/me`, {
        withCredentials: true,
      });
      set({ user: null, isAuthenticated: false });
      return true;
    } catch {
      return false;
    }
  },

  changeNickname: async (newNickName: string) => {
    const success = "닉네임 변경에 성공하였습니다.";
    const fail = "닉네임 변경에 실패하였습니다.";
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/auth/nickname`,
        {
          newNickname: newNickName,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        get().checkAuthStatus();
        return success;
      }
      return fail;
    } catch {
      return fail;
    }
  },

  changePassword: async (newPassword: string) => {
    const fail = "비밀번호 변경에 실패하였습니다.";
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/auth/password`,
        {
          newPassword: newPassword,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        get().checkAuthStatus();
        return "비밀번호 변경에 성공하였습니다.";
      }
      return fail;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        return "소셜 계정은 비밀번호 변경이 불가합니다.";
      } else {
        return fail;
      }
    }
  },
}));

// GPT Jailbreak 검증용 패턴. 필요시 사용 (현재 Backend 에서 사용중)
// const bannedPatterns = [
//   /ignore\s+(all\s+)?previous\s+instructions/i,
//   /jailbreak/i,
//   /DAN/i,
//   /developer\s+mode/i,
//   /simulate\s+a\s+chatgpt\s+instance/i,
//   /UserQuery\s/i,
// ];

// function isMaliciousPrompt(prompt: string): boolean {
//   return bannedPatterns.some((pattern) => pattern.test(prompt));
// }
