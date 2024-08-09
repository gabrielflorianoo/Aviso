<script setup>
    import axios from 'axios';
    import { ref, onMounted } from 'vue';

    let logged = ref(false);

    onMounted(async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/session-status',
                { withCredentials: true }
            );

            logged.value = response.data.loggedIn;
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao verificar a sessão do usuário:', error);
        }
    });
</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="">
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
                        <a class="button is-primary" href="a">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light"> Log in </a>
                    </div>
                </div>
            </div>
            <div class="navbar-end" v-else>
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary">
                            <strong>Create a Tweet</strong>
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
