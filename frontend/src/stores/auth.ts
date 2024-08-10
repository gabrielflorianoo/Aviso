import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    const logged = ref<boolean>(false);

    async function checkSession() {
        try {
            const response = await axios.get(
                'http://localhost:3000/session-status',
                { withCredentials: true },
            );
            logged.value = response.data.loggedIn;
        } catch (error) {
            console.error('Error while checking user session:', error);
        }
    }

    return {
        logged,
        checkSession,
    };
});
