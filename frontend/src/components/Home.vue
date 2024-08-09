<template>
    <section class="is-full-desktop">
        <div class="columns p-2">
            <div class="column is-2" style="background-color: aqua">
                <div v-for="userTag in users" :key="userTag.username">
                    <User
                        :user="userTag"
                        v-if="user?.username != userTag.username"
                    />
                </div>
            </div>
            <div
                class="column is-flex is-align-items-end cardColumn"
                style="background-color: bisque"
            >
                <div
                    class="p-1 holdCards"
                    v-for="message in messages"
                    :key="message.messageID"
                >
                    <Message
                        :message="message"
                        v-if="message.userID == user?.username"
                        class="messageCard"
                    />
                    <Message :message="message" v-else />
                </div>
            </div>
            <div class="column is-2" style="background-color: chartreuse">
                Settings
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import Message from './Message.vue';
    import User from './User.vue';
    import type { Message as MessageType, User as UserType } from '../types.ts';

    let messages = ref<MessageType[]>([]);
    let users = ref<UserType[]>([]);
    let user = ref<UserType | null>(null);

    onMounted(async () => {
        await getUserSession();
        await getPosts();
        await getUsers();
    });

    async function getUserSession() {
        try {
            const response = await axios.get(
                'http://localhost:3000/get-session-user',
                { withCredentials: true }
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
</script>

<style scoped>
    .columns {
        height: 100%;
    }
    .cardColumn {
        flex-direction: column;
        justify-content: end;
    }
    .holdCards {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr; /* Define uma única coluna */
    }
    .messageCard {
        justify-self: end;
    }
    .holdCards > * {
        width: 500px;
    }
</style>
