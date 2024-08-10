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
            <GlobalChat
                :messages="messages"
                :globalChat="globalChat"
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

    let messages = ref<MessageType[]>([]);
    let users = ref<UserType[]>([]);
    let user = ref<UserType | null>(null);
    let globalChat = ref<Boolean>(true); // Variable that tracks if it is in global chat or not
    let userFocused = ref<string>('');

    onMounted(async () => {
        await getUserSession();
        await getPosts();
        await getUsers();
    });

    async function getUserSession() {
        try {
            const response = await axios.get(
                'http://localhost:3000/get-session-user',
                { withCredentials: true },
            );

            user.value = response.data;
        } catch (error: any) {
            console.log('Error while getting user: ', error.message);
        }
    }
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
        userFocused.value = username;
    }
</script>

<style scoped>
    .columns {
        height: 100%;
    }
</style>
