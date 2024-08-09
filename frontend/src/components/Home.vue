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
                        v-if="user?.username != userTag.username"
                    />
                </div>
            </div>
            <div
                class="column is-align-items-end cardColumn"
                style="background-color: bisque"
            >
                <h1 class="title globalTitle">Global chat</h1>
                <div class="">
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
        display: grid; /* Torna o contêiner um flex container */
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        flex-direction: column; /* Organiza os itens em uma coluna */
        justify-content: flex-end; /* Alinha os itens no topo */
        height: 100%;
    }

    .globalTitle {
        align-self: start; /* Alinha o título no topo do contêiner */
        justify-self: center; /* Coloca o título no meio do container */
        margin-bottom: 1rem; /* Espaço abaixo do título */
    }

    .holdCards {
        width: 100%;
        display: grid;
        align-content: end; /* Move o conteúdo para o fundo do contêiner */
    }

    .messageCard {
        align-self: flex-end;
        justify-self: end;
    }

    .holdCards > * {
        width: 500px;
    }
</style>
