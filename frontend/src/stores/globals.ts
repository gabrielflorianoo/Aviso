import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalsStore = defineStore('globals', () => {
    let globalChat = ref<Boolean>(true); // Variable that tracks if it is in global chat or not

    function setGlobalChat(value: boolean) {
        globalChat.value = value;
    }

    return {
        globalChat,
        setGlobalChat,
    };
});
