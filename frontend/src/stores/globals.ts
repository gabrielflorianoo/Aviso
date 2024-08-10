import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalsStore = defineStore('globals', () => {
    let globalChat = ref<Boolean>(true); // Variable that tracks if it is in global chat or not
    let userFocused = ref<string>(''); // User that you are chatting with

    function setGlobalChat(value: boolean) {
        globalChat.value = value;
    }

    function setUserFocused(value: string) {
        userFocused.value = value;
    }

    return {
        globalChat,
        userFocused,
        setGlobalChat,
        setUserFocused,
    };
});
