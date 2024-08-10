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

    let globalStore = useGlobalsStore();

    let messageRef = ref<string>('');
    let messageTo = computed(() => globalStore.userFocused);
    console.log(messageTo.value);

    async function createPost() {
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

        window.location.href = '/';
    }

    function cancel() {
        messageRef.value = '';

        window.location.href = '/';
    }
</script>

<style scoped></style>
