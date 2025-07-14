import { create } from "zustand";
import type { DataStore } from "../types";
import { API_BASE_URL } from "../constants";
import axios from "axios";
import { useMessageStore } from "./messageStore";

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
