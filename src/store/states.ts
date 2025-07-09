//import { useToastStore } from "./toast";
import { create } from "zustand";
import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const OAUTH2_URL = import.meta.env.VITE_OAUTH2_BASE_URL;

interface Message {
  sender: "USER" | "BOT" | "INFO";
  content: string;
}

interface MessageData {
  messages: Message[];
  addMessage: (msg: Message) => void;
  addMessages: (msgs: Message[]) => void;
  setMessages: (msgs: Message[]) => void;
}

interface Chatroom {
  id: number;
  title: string;
  preview: string;
  createdAt: string;
}

interface DataStore {
  chatRooms: Chatroom[];
  getChatRoom: () => void;
  getChatRoomMessage: (ChatRoomID: number) => Promise<boolean | undefined>;
  deleteChatroom: (ChatRoomID: number) => Promise<boolean>;

  selectedChatRoomID: number | null;
  setSelectedRoomID: (id: number) => void;
}

interface QuestionStore {
  response: Message | null;
  loading: boolean;
  error: string | null;
  askQuestion: (content: string) => Promise<void>; // ✅ 응답 반환하도록 수정
  continueQuestion: (content: string) => Promise<void>;
}

export const useMessageStore = create<MessageData>((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  addMessages: (msgs) =>
    set((state) => ({
      messages: [...state.messages, ...msgs],
    })),
  setMessages: (msgs) => set({ messages: msgs }),
}));

export const useQuestionAPI = create<QuestionStore>((set) => ({
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

export const useDataStore = create<DataStore>((set, get) => ({
  chatRooms: [],
  selectedChatRoomID: null,

  setSelectedRoomID: (id: number) => set({ selectedChatRoomID: id }),
  //getChatRoom
  getChatRoom: async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/chat-rooms`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        set({
          chatRooms: res.data,
        });
        console.log(res.data);
        return true;
      }
    } catch {
      set({
        chatRooms: undefined,
      });
      return false;
    }
  },

  getChatRoomMessage: async (ChatRoomID: number) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/chat-rooms/${ChatRoomID}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        const messages =
          res.data.messages === undefined ? res.data : res.data.messages;
        useMessageStore.getState().setMessages(messages);
        set({ selectedChatRoomID: ChatRoomID });
        console.log(res.data);
        return true;
      }
    } catch {
      return false;
    }
  },

  deleteChatroom: async (ChatRoomID: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/chat-rooms/${ChatRoomID}`, {
        withCredentials: true,
      });
      get().getChatRoom();
      return true;
    } catch {
      return false;
    }
  },
}));

interface AuthStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  isLoading: boolean;
  error: AxiosError | null;
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => void;
  checkAuthStatus: () => Promise<boolean>;
  googleLogin: () => void;
  kakaoLogin: () => void;
  logout: () => Promise<boolean>;
  LocalLogin: (email: string, password: string) => Promise<void>;
  LocalSignUp: (
    email: string,
    password: string,
    nickname: string
  ) => Promise<void>;
  quit: () => Promise<boolean>;
  refreshToken: () => Promise<boolean>;
  changeNickname: (newNickName: string) => Promise<string>;
  changePassword: (newPassword: string) => Promise<string>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any) => set({ user }),

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
    } catch {
      set({ isLoading: false });
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
    } catch {
      set({ isLoading: false });
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
