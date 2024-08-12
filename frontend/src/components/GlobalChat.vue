<template>
    <div
        class="column is-align-items-end cardColumn"
        style="background-color: bisque"
        v-if="globalChat"
    >
        <h1 class="title globalSection">Global chat</h1>
        <section class="cardList">
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
        </section>
    </div>
    <div
        class="column is-align-items-end cardColumn"
        style="background-color: beige"
        v-else
    >
        <section class="globalSection">
            <h1 class="title globalTitle">Chatting with {{ userFocused }}</h1>
            <button class="button is-danger" @click="turnGlobalChat">
                Go to Global Chat
            </button>
        </section>
        <div class="messagesSection">
            <section v-if="messages && messages.length > 0">
                <div v-for="message in messages" class="p-1 holdCards">
                    <Message
                        v-if="message?.userID == user?.username"
                        :key="message.messageID"
                        :message="message"
                        :username="user?.username"
                        class="messageCard"
                    />
                    <Message
                        v-else
                        :key="message.messageID + '-else'"
                        :message="message"
                    />
                </div>
            </section>
            <section class="noMessages" v-else>
                <h1 class="title">No messages with this person</h1>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import Message from './Message.vue';
    import type { User as UserType, Message as MessageType } from '../types';
    import { computed } from 'vue';
    import { useGlobalsStore } from '../stores/globals';
    import { useAuthStore } from '../stores/auth';

    // Variables to export to get values on Home.vue
    export default {
        name: 'GlobalChat',
        components: {
            Message,
        },
        props: {
            // messages list, may be empty
            messages: {
                type: Array as () => MessageType[] | null,
                required: true,
            },
            // users list, may be empty
            user: {
                type: Object as () => UserType | null,
                required: true,
            },
        },
        setup() {
            // Global variables
            const globalStore = useGlobalsStore();
            const authStore = useAuthStore();

            // Refresh variable everytime it is changed
            const globalChat = computed(() =>
                authStore.logged ? globalStore.globalChat : true,
            );

            const userFocused = computed(() => globalStore.userFocused);

            // Exported function for changing to global chat
            function turnGlobalChat() {
                if (authStore.logged) {
                    globalStore.setGlobalChat(!globalStore.globalChat);
                }
            }

            return {
                globalChat,
                userFocused,
                turnGlobalChat,
            };
        },
    };
</script>

<style scoped>
    .cardColumn {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 0fr 1fr;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
        padding: 0;
    }

    .globalSection {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: start;
        align-self: start;
        margin-bottom: 1rem;
        padding: 1rem;
    }

    .globalSection button {
        width: fit-content;
        justify-self: end;
    }

    .cardList {
        overflow-y: auto;
        height: 100%;
    }

    .holdCards {
        width: 100%;
        display: grid;
        align-content: end;
        gap: 10px;
    }

    .messageCard {
        width: 100%;
        align-self: flex-end;
        justify-self: end;
    }

    .messagesSection {
        display: grid;
        height: 100%;
        align-content: end;
    }

    .holdCards > * {
        width: 500px;
    }

    .noMessages {
        display: grid;
        height: 100%;
        padding: 5%;
        justify-content: center;
    }
</style>
