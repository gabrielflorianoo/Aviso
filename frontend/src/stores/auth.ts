import { defineStore } from 'pinia';
import axios from 'axios';
import type { User as UserType } from '../types';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        logged: false as boolean,
        loggedUser: null as UserType | null,
    }),
    actions: {
        async checkSession() {
            try {
                const response = await axios.get(
                    'http://localhost:3000/session-status',
                    {
                        withCredentials: true,
                    },
                );
                this.logged = response.data.loggedIn;
            } catch (error) {
                console.error('Error while checking user session:', error);
            }
        },
        async getUserSession() {
            try {
                const response = await axios.get(
                    'http://localhost:3000/get-session-user',
                    { withCredentials: true },
                );
                this.loggedUser = response.data.loggedUser || null;
            } catch (error: any) {
                console.log('Error while getting user: ', error.message);
            }
        },
    },
    persist: true, // Adicione esta linha para persistir o estado
});
