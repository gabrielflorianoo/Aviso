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
                <div v-for="userTag in filteredUsers" :key="userTag.username">
                    <User
                        class="m-1 p-2"
                        :user="userTag"
                        @click="clickedUser(userTag.username)"
                    />
                </div>
            </div>
            <!-- @update:globalChat is the emit from the GlobalChat method -->
            <GlobalChat
                :messages="messages"
                :globalChat="globalChat"
                @toggleGlobalChat="turnGlobalChat"
                :user="authStore.loggedUser"
            />
            <div class="column is-2" style="background-color: chartreuse">
                Settings
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { computed, onMounted, ref } from 'vue';
    import GlobalChat from './GlobalChat.vue';
    import User from './User.vue';
    import type { Message as MessageType, User as UserType } from '../types.ts';
    import { useAuthStore } from '../stores/auth.ts';
    import { useGlobalsStore } from '../stores/globals.ts';

    const authStore = useAuthStore();
    const globalStore = useGlobalsStore();

    let messages = ref<MessageType[]>([]);
    let users = ref<UserType[]>([]);
    let user = ref<UserType | null>(null);
    let userFocused = computed(() => globalStore.userFocused);
    const filteredUsers = computed(() =>
        users.value.filter(
            (userTag) => authStore.loggedUser?.username !== userTag.username,
        ),
    );

    const globalChat = computed(() => globalStore.globalChat);

    onMounted(async () => {
        await authStore.checkSession();
        await authStore.getUserSession();
        await getPosts();
        await getUsers();
    });
    async function getPosts() {
        try {
            const response = await axios.get(
                'http://localhost:3000/tweets/globalMessages',
            );

            if (!globalChat.value) {
                messages.value = response.data.filter(
                    (elm: MessageType) =>
                        elm.userID == userFocused.value &&
                        elm.toUser == user.value?.username,
                );
            } else {
                messages.value = response.data;
            }
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

    async function clickedUser(username: string) {
        if (authStore.logged) {
            globalStore.setUserFocused(username);
            globalStore.setGlobalChat(false);

            await getPosts();
        }

        console.log(globalStore.userFocused);
    }
    function turnGlobalChat(turned: boolean) {
        if (authStore.logged) {
            globalStore.setGlobalChat(turned);
        }
    }
</script>

<style scoped>
    .columns {
        height: 100%;
    }
</style>
