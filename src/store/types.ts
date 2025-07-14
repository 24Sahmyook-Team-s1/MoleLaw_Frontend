import type { AxiosError } from "axios";

export interface Message {
  sender: "USER" | "BOT" | "INFO";
  content: string;
}

export interface MessageData {
  messages: Message[];
  addMessage: (msg: Message) => void;
  addMessages: (msgs: Message[]) => void;
  setMessages: (msgs: Message[]) => void;
}

export interface Chatroom {
  id: number;
  title: string;
  preview: string;
  createdAt: string;
}

export interface DataStore {
  chatRooms: Chatroom[];
  getChatRoom: () => void;
  getChatRoomMessage: (ChatRoomID: number) => Promise<boolean | undefined>;
  deleteChatroom: (ChatRoomID: number) => Promise<boolean>;

  selectedChatRoomID: number | null;
  setSelectedRoomID: (id: number) => void;
}

export interface QuestionStore {
  response: Message | null;
  loading: boolean;
  error: string | null;
  askQuestion: (content: string) => Promise<void>;
  continueQuestion: (content: string) => Promise<void>;
}

export interface AuthStore {
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