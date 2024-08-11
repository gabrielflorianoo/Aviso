<template>
    <section class="is-full-desktop">
        <div class="columns p-2">
            <div class="column is-2" style="background-color: aqua">
                <h1 class="subtitle has-text-weight-bold has-text-centered">
                    {{
                        authStore.loggedUser
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
            <!-- @toggleGlobalChat is the emit from the GlobalChat method -->
            <GlobalChat
                :messages="messages"
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
    import { computed, onMounted, ref, watch } from 'vue';
    import GlobalChat from './GlobalChat.vue';
    import User from './User.vue';
    import type { Message as MessageType, User as UserType } from '../types.ts';
    import { useAuthStore } from '../stores/auth.ts';
    import { useGlobalsStore } from '../stores/globals.ts';

    // Global variables
    const authStore = useAuthStore();
    const globalStore = useGlobalsStore();

    // References for the messages and the users
    let messages = ref<MessageType[]>([]);
    let users = ref<UserType[]>([]);

    // Update variable everytime it changes on the entire project
    let userFocused = computed(() => globalStore.userFocused);

    // Exclude the user that are logged in
    const filteredUsers = computed(() => {
        return users.value.filter(
            (elm: UserType) => elm.username != authStore.loggedUser?.username,
        );
    });

    // Update variable everytime it changes on the entire project or if user is logged
    const globalChat = computed(() =>
        authStore.logged ? globalStore.globalChat : true,
    );

    // Recalc messages everytime globalChat changes
    watch(globalChat, async () => {
        console.log('Global Changed');
        await getPosts();
    });

    // Functions that are called everytime the page is reloaded
    onMounted(async () => {
        await authStore.checkSession();
        await authStore.getUserSession();
        await getUsers();
        await getPosts();
    });

    // Fetch messages from the backend
    async function getPosts() {
        try {
            let response;
            let value;

            if (!globalChat.value) {
                response = await axios.get(
                    `http://localhost:3000/users/${userFocused.value}`,
                );

                if (response.data) {
                    // Get the messages sent to the loggedUser
                    let found = response.data.find(
                        (prvMess: any) =>
                            prvMess.name == authStore.loggedUser?.username,
                    );

                    
                    if (found && found.messages) {
                        value = found.messages;
                    } else {
                        value = [];
                    }

                    console.log(value);
                } else {
                    value = [];
                }
            } else {
                response = await axios.get(
                    'http://localhost:3000/tweets/globalMessages',
                );

                // Get globalMessages
                value = response.data;
            }

            messages.value = value || [];
        } catch (error) {
            console.log('Error while loading messages: ', error);
        }
    }

    // Fetch users from the backend
    async function getUsers() {
        try {
            const response = await axios.get('http://localhost:3000/users');

            users.value = response.data;
        } catch (error) {
            console.log('Error while loading messages: ', error);
        }
    }

    // Track everytime you click on an user in the users tab
    async function clickedUser(username: string) {
        if (authStore.logged) {
            globalStore.setUserFocused(username);
            globalStore.setGlobalChat(false);

            await getPosts();
        }
    }

    // Function for turning globalChat on/off
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
