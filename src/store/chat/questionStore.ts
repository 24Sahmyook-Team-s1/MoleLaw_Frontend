import { create } from "zustand";
import type { Message, QuestionStore } from "../types";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../constants";
import { useDataStore } from "../Data/dataStore";
import { useMessageStore } from "../Data/messageStore";

export const useQuestionStore = create<QuestionStore>((set) => ({
  response: null,
  loading: false,
  error: null,

  askQuestion: async (content: string) => {
    set({ loading: true, error: null });
    // 프롬프트 Jailbreak 방지용 검증 코드
    // if (isMaliciousPrompt(content)) {
    //   useToastStore
    //     .getState()
    //     .showToast("부적절한 프롬프트가 감지되어 로그아웃 합니다.");
    //   setTimeout(async () => {
    //     await useAuthStore.getState().logout();
    //   }, 1500);
    //   set({ loading: false });
    //   return;
    // }
    try {
      const res = await axios.post<{ id: number; messages: Message[] }>(
        `${API_BASE_URL}/chat-rooms/first-message`,
        { content },
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log(res.data);
        const data = res.data;
        const messages = data.messages;
        useDataStore.getState().setSelectedRoomID(data.id);
        useMessageStore.getState().setMessages(messages);
        set({ loading: false });
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "질문 처리 중 오류 발생",
        loading: false,
      }); // ✅ 실패 시 null 반환
    }
  },

  continueQuestion: async (content: string) => {
    set({ loading: true, error: null });
    // if (isMaliciousPrompt(content)) {
    //   useToastStore
    //     .getState()
    //     .showToast("부적절한 프롬프트가 감지되어 로그아웃 합니다.");
    //   setTimeout(async () => {
    //     await useAuthStore.getState().logout();
    //   }, 1500);
    //   set({ loading: false });
    //   return;
    // }
    try {
      const selectedRoom = useDataStore.getState().selectedChatRoomID;
      const res = await axios.post<Message>(
        `${API_BASE_URL}/chat-rooms/${selectedRoom}/messages`,
        { content },
        { withCredentials: true }
      );
      if (res.status === 200) {
        useMessageStore.getState().addMessage(res.data);
        set({ loading: false });
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      set({
        error: error.response?.data?.message || "질문 처리 중 오류 발생",
        loading: false,
      });
    }
  },
}));