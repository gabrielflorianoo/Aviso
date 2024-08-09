<script setup lang="ts">
    import Navbar from './components/Navbar.vue';
    import { ref } from 'vue';
    import axios from 'axios';

    let messages = ref([]);
    axios
        .get('http://localhost:3000/tweets')
        .then((response) => {
            messages.value = response.data;
        })
        .catch((err) => {
            console.error(err);
        });
</script>

<template>
    <Navbar />
    <router-view class="router"></router-view>
</template>

<style>
    Navbar {
        height: 7vh;
    }
    .router {
        height: 93vh;
    }
</style>
