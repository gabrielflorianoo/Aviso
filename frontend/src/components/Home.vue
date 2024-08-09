<template>
    <section class="is-full-desktop">
        <div class="columns p-2">
            <div class="column is-2" style="background-color: aqua">Users</div>
            <div class="column" style="background-color: bisque">
                <div
                    class="p-1"
                    v-for="message in messages"
                    :key="message.messageID"
                >
                    <Message :message="message" />
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

    let messages = ref([]);

    onMounted(async () => {
        try {
            const response = await axios.get('http://localhost:3000/tweets');

            messages.value = response.data;
        } catch (error) {
            console.log('Error while loading messages: ', error);
        }
    });
</script>

<style scoped></style>
