import { defineStore } from "pinia";

export const useGlobalsStore = defineStore("globals", {
  state: () => ({
    globalChat: true,
    userFocused: "",
  }),
  actions: {
    setGlobalChat(value: boolean) {
      this.globalChat = value;
    },
    setUserFocused(value: string) {
      this.userFocused = value;
    },
  },
  persist: true, // Adicione esta linha para persistir o estado
});
