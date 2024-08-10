<template>
    <section class="is-full-desktop">
        <div class="columns p-2">
            <div class="column is-2" style="background-color: aqua">
                <h1 class="subtitle has-text-weight-bold has-text-centered">
                    {{
                        user?.username
                            ? 'Other users'
                            : 'All users in our system'
                    }}
                </h1>
                <div v-for="userTag in users" :key="userTag.username">
                    <User
                        class="m-1 p-2"
                        :user="userTag"
                        @click="clickedUser"
                        v-if="user?.username != userTag.username"
                    />
                </div>
            </div>
            <!-- @update:globalChat is the emit from the GlobalChat method -->
            <GlobalChat
                :messages="messages"
                :globalChat="globalChat"
                @update:globalChat="turnGlobalChat"
                :user="user"
            />
            <div class="column is-2" style="background-color: chartreuse">
                Settings
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import GlobalChat from './GlobalChat.vue';
    import User from './User.vue';
    import type { Message as MessageType, User as UserType } from '../types.ts';
    import { useAuthStore } from '../stores/auth.ts';

    const authStore = useAuthStore();

    let messages = ref<MessageType[]>([]);
    let users = ref<UserType[]>([]);
    let user = ref<UserType | null>(null);
    let globalChat = ref<Boolean>(true); // Variable that tracks if it is in global chat or not
    let userFocused = ref<string>('');
    let logged = ref<Boolean>(false);

    onMounted(async () => {
        await authStore.checkSession();
        await getPosts();
        await getUsers();
    });

    async function getPosts() {
        try {
            const response = await axios.get('http://localhost:3000/tweets');

            messages.value = response.data;
        } catch (error) {
            console.log('Error while loading messages: ', error);
        }
    }
    async function getUsers() {
        try {
            const response = await axios.get('http://localhost:3000/users');

            users.value = response.data;
        } catch (error) {
            console.log('Error while loading messages: ', error);
        }
    }

    function clickedUser(username: string) {
        if (authStore.logged) {
            userFocused.value = username;
            globalChat.value = false;

            messages.value = [];
        }
    }
    function turnGlobalChat(turned: boolean) {
        if (authStore.logged) {
            globalChat.value = turned;
        }
    }
</script>

<style scoped>
    .columns {
        height: 100%;
    }
</style>
