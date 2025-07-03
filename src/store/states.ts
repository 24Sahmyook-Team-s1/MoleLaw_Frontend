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
  addMessage: (msg:Message) => void;
  addMessages: (msgs:Message[]) => void;
  setMessages: (msgs: Message[]) => void;
}

interface Chatroom{
  id: number,
  title: string,
  preview: string,
  createdAt: string,
}

interface DataStore {
  chatRooms: Chatroom[];
  getChatRoom: () => void;
  getChatRoomMessage: (ChatRoomID:number) => Promise<boolean | undefined>;

  selectedChatRoomID: number |null;
  setSelectedRoomID: (id:number) => void;
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

  addMessages: (msgs) => set((state) => ({
    messages: [...state.messages, ...msgs],
  })),
  setMessages: (msgs) => set({ messages: msgs }),
}))

export const useQuestionAPI = create<QuestionStore>((set) => ({
  response: null,
  loading: false,
  error: null,

  askQuestion: async (content: string) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post<{id: number; messages: Message[];}>(
        `${API_BASE_URL}/chat-rooms/first-message`,
        { content },
        { withCredentials: true }
      );
      if (res.status === 200){
        console.log(res.data);
        const data = res.data;
        const messages = data.messages;
        useMessageStore.getState().setMessages(messages);
        set({loading:false})
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
    set({ loading: true, error: null});

    try{
      const selectedRoom = useDataStore.getState().selectedChatRoomID;
      const res = await axios.post<Message>(
        `${API_BASE_URL}/chat-rooms/${selectedRoom}/messages`,
        { content },
        { withCredentials: true}
      );
      if (res.status === 200) {
        useMessageStore.getState().addMessage(res.data);
        set({loading: false});
      }
    } catch (err) {
      const error = err as AxiosError<{message?: string}>
      set({
        error: error.response?.data?.message || "질문 처리 중 오류 발생",
        loading: false,
      })
    }
  }
}));

export const useDataStore = create<DataStore>((set) => ({
  chatRooms: [],
  selectedChatRoomID: null,

  setSelectedRoomID: (id: number) => set({ selectedChatRoomID: id}),  
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
    } catch (error) {
      console.log(error);
      set({
        chatRooms: undefined,
      });
      return false;
    }
  },

  getChatRoomMessage: async (ChatRoomID: number) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/chat-rooms/${ChatRoomID}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const messages = res.data.messages === undefined ? res.data : res.data.messages
        useMessageStore.getState().setMessages(messages);
        set({selectedChatRoomID: ChatRoomID});
        console.log(res.data);
        return true;
      }
    } catch (error) {
      console.log(error);
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
  quit: () => Promise<void>;
}

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
    } catch (error) {
      console.error("인증 상태 확인 오류:", error);
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

      location.reload();
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.error("로그인 실패", error);
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
    } catch (error) {
      console.error("로그아웃 오류:", error);
      return false;
    }
  },

  quit: async () => {
    try{
      await axios.delete(
        `${API_BASE_URL}/auth/me`,
        {
          withCredentials: true,
        }
      );
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  }
}));
