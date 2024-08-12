<script setup>
    import axios from 'axios';
    import { useAuthStore } from '../stores/auth';
    import { computed } from 'vue';

    // Global Variable
    const authStore = useAuthStore();

    // Changes the value of logged to the global value of logged
    let logged = computed(() => authStore.logged);

    // Function for logging out
    async function logout() {
        try {
            // Sends a get request for destroying the session
            const response = await axios.get(
                'http://localhost:3000/logout',
                { withCredentials: true },
            );  

            // Redirect to the home page
            window.location.href = '/';
        } catch (error) {
            console.log('Error while logging out', error);
        }
    }
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <img
                    class="img"
                    src="../assets/Logo-Transparent.PNG"
                    alt="Logo"
                />
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end" v-if="!logged">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary" href="signup">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light" href="login">
                            <strong>Log in</strong>
                        </a>
                    </div>
                </div>
            </div>
            <div class="navbar-end" v-else>
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary" href="createMessage">
                            <strong>Create a Tweet</strong>
                        </a>
                        <a class="button is-danger" @click="logout">
                            <strong>Logout</strong>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
    .img {
        min-height: 50px;
    }
</style>
