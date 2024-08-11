import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { User as UserType } from '../types';

export const useAuthStore = defineStore('auth', () => {
    const logged = ref<boolean>(false);
    const loggedUser = ref<UserType | null>(null);

    async function checkSession() {
        try {
            const response = await axios.get(
                'http://localhost:3000/session-status',
                {
                    withCredentials: true,
                },
            );
            logged.value = response.data.loggedIn;
        } catch (error) {
            console.error('Error while checking user session:', error);
        }
    }
    async function getUserSession() {
        try {
            const response = await axios.get(
                'http://localhost:3000/get-session-user',
                { withCredentials: true },
            );
            loggedUser.value = response.data;
        } catch (error: any) {
            console.log('Error while getting user: ', error.message);
        }
    }

    return {
        logged,
        loggedUser,
        checkSession,
        getUserSession,
    };
});
