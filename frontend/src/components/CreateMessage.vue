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

        <div class="field">
            <h3>Have your username in the post?</h3>
            <div class="control">
                <label class="radio">
                    <input type="radio" name="question" />
                    Yes
                </label>
                <label class="radio pl-3">
                    <input type="radio" name="question" />
                    No
                </label>
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
    import { ref } from 'vue';

    let messageRef = ref('');
    let username = ref('');

    async function createPost() {
        await axios
            .post(
                'http://localhost:3000/tweets',
                {
                    message: messageRef.value,
                    userID: username.value,
                },
                { withCredentials: true }
            )
            .catch((err) => {
                console.log('Error while creating post: ', err);
            });
    }

    function cancel() {
        messageRef.value = '';
        username.value = '';
    }
</script>

<style scoped></style>
