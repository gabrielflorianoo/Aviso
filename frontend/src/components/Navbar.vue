<script setup>
    import axios from 'axios';
    import { useAuthStore } from '../stores/auth';

    const authStore = useAuthStore();

    async function logout() {
        try {
            const response = await axios.get(
                'http://localhost:3000/users/logout',
                { withCredentials: true },
            );

            // Redireciona para a página inicial
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
            <div class="navbar-end" v-if="!authStore.logged">
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
