<template>
    <div
        class="column is-align-items-end cardColumn"
        style="background-color: bisque"
        v-if="globalChat"
    >
        <h1 class="title globalSection">Global chat</h1>
        <div>
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
    <div
        class="column is-align-items-end cardColumn"
        style="background-color: beige"
        v-else
    >
        <section class="globalSection">
            <h1 class="title globalTitle">Private Chat</h1>
            <button class="button is-danger" @click="turnGlobalChat">
                Go to Global Chat
            </button>
        </section>
        <div>
            <div class="p-1 holdCards">
                <template v-if="messages && messages.length > 0">
                    <div v-for="message in messages" :key="message.messageID">
                        <Message
                            :message="message"
                            v-if="message.userID == user?.username"
                            class="messageCard"
                        />
                        <Message :message="message" v-else />
                    </div>
                </template>
                <template v-else>
                    <h1 class="title">No messages with this person</h1>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Message from './Message.vue';
    import type { User as UserType, Message as MessageType } from '../types';
    import { computed } from 'vue';
    import { useGlobalsStore } from '../stores/globals';
    import { useAuthStore } from '../stores/auth';

    export default {
        name: 'GlobalChat',
        components: {
            Message,
        },
        props: {
            messages: {
                type: Array as () => MessageType[] | null,
                required: true,
            },
            user: {
                type: Object as () => UserType | null,
                required: true,
            },
        },
        setup() {
            const globalStore = useGlobalsStore();
            const authStore = useAuthStore();

            // Computed properties to access global state
            const globalChat = computed(() =>
                authStore.logged ? globalStore.globalChat : true,
            );

            function turnGlobalChat() {
                if (authStore.logged) {
                    globalStore.setGlobalChat(!globalStore.globalChat);
                }
            }

            return {
                globalChat,
                turnGlobalChat,
            };
        },
    };
</script>

<style scoped>
    .cardColumn {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
    }

    .globalSection {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: start;
        align-self: start;
        margin-bottom: 1rem;
    }

    .globalSection button {
        width: fit-content;
        justify-self: end;
    }

    .holdCards {
        width: 100%;
        display: grid;
        align-content: end;
        gap: 10px;
    }

    .messageCard {
        align-self: flex-end;
        justify-self: end;
    }

    .holdCards > * {
        width: 500px;
    }
</style>
