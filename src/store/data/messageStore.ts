import { create } from "zustand";
import type { MessageData } from "../types";

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