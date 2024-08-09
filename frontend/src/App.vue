<script setup lang="ts">
    import axios from 'axios';
    import Navbar from './components/Navbar.vue';
    import { ref, onMounted } from 'vue';

    let logged = ref(false);

    onMounted(async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/session-status',
                { withCredentials: true }
            );

            logged.value = response.data.loggedIn;
        } catch (error) {
            console.error('Error while checking user session:', error);
        }
    });
</script>

<template>
    <Navbar :logged="logged" />
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
