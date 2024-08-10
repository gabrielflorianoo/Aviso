<script setup lang="ts">
    import Navbar from './components/Navbar.vue';
</script>

<template>
    <Navbar/>
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
