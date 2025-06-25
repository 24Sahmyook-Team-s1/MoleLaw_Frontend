import { create } from 'zustand';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
