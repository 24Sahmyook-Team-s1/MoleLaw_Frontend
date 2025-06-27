import { create } from 'zustand';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const OAUTH2_URL = import.meta.env.VITE_OAUTH2_BASE_URL;

// AI API Function
interface ResponseData {
    answer: string;
    info: string;
}

interface QuestionStore {
  response: ResponseData | null;
  loading: boolean;
  error: string | null;
  askQuestion: (query: string) => Promise<ResponseData | null>; // ✅ 응답 반환하도록 수정
}

export const useQuestionAPI = create<QuestionStore>((set) => ({
  response: null,
  loading: false,
  error: null,

  askQuestion: async (query: string) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post<ResponseData>(
        `${API_BASE_URL}/answer`,
        { query },
        { withCredentials: true }
      );

      console.log(res.data);

      const data = res.data;
      set({ response: data, loading: false });
      return data; // ✅ 응답 반환
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || '질문 처리 중 오류 발생',
        loading: false,
      });
      return null; // ✅ 실패 시 null 반환
    }
  },
}));

interface AuthStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null,
  isLoading: boolean,
  error: AxiosError | null,
  isAuthenticated: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => void;
  checkAuthStatus: () => Promise<boolean>;
  googleLogin: () => void;
  kakaoLogin: () => void;
  logout: () => Promise<boolean>;


}

export const useAuthStore = create<AuthStore>((set) => ({

  user:null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => set({ user }),

  //Auth Check
  checkAuthStatus: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/me`, {
        withCredentials: true,
      })
      if (response.status === 200){
        set ({
          user: response.data,
          isAuthenticated: true,
        })
        return true
      }
    } catch (error) {
      console.error("인증 상태 확인 오류:", error)
      set({
        user: null,
        isAuthenticated: false,
      })
  }
  return false
  },

  //구글 로그인
  googleLogin: () => {
    set({ isLoading: true })

    window.location.href = `${OAUTH2_URL}/google`
  },

  //카카오 로그인
  kakaoLogin: () => {
    set({ isLoading: true })

    window.location.href = `${OAUTH2_URL}/kakao`
  },

  //로그아웃 => 세션 삭제 && JWT 토큰 무효화 요청
  logout: async() => {
    try{
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,{},
        {
          withCredentials: true,
        },
      )
      set({user:null, isAuthenticated:false})
      return true;
    } catch (error){
      console.error ("로그아웃 오류:", error)
      return false
    }
  },
}))