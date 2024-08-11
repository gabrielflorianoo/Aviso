<template>
    <form class="container is-fluid p-6">
        <div class="field">
            <label class="label">Write a post</label>
            <div class="control">
                <textarea
                    v-model="messageRef"
                    class="textarea"
                    placeholder="Textarea"
                ></textarea>
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" @click.prevent="createPost">
                    Submit
                </button>
            </div>
            <div class="control">
                <button class="button is-text" @click.prevent="cancel">
                    Cancel
                </button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { computed, ref } from 'vue';
    import { useGlobalsStore } from '../stores/globals';
    import { useAuthStore } from '../stores/auth';

    // Global variables
    let globalStore = useGlobalsStore();
    let authStore = useAuthStore();

    // References for the message field and for sending messages
    let messageRef = ref<string>('');
    let messageTo = computed(() => globalStore.userFocused);
    let sender = computed(() => authStore.loggedUser);

    // Function that changes the field privateMessages of a user 
    // or posts the message in the Global Messages
    async function createPost() {
        if (messageTo.value == '') {
            // create a new message on the global field
            await axios
                .post(
                    'http://localhost:3000/tweets',
                    {
                        message: messageRef.value,
                        toUser: messageTo.value,
                    },
                    { withCredentials: true },
                )
                .catch((err) => {
                    console.log('Error while creating post: ', err.message);
                });
        } else {
            // Updates the privateMessages field in a user
            await axios
                .put(
                    `http://localhost:3000/users/${messageTo.value}`,
                    {
                        sender: sender.value,
                        message: messageRef.value,
                        loggedUser: authStore.loggedUser?.username,
                    },
                    { withCredentials: true },
                )
                .catch((err) => {
                    console.log('Error while creating post: ', err.message);
                });
        }

        window.location.href = '/';
    }

    // Function for the button cancel
    function cancel() {
        messageRef.value = '';

        window.location.href = '/';
    }
</script>

<style scoped></style>
