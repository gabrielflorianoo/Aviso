<template>
    <form class="columns is-centered p-6" @submit.prevent="createNewUser">
        <div class="column is-6">
            <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                    <input
                        class="input"
                        v-model="userName"
                        type="text"
                        placeholder="Text input"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check check-mark"></i>
                    </span>
                </div>
                <p class="help availability is-danger">
                    This username is available
                </p>
            </div>

            <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left has-icons-right">
                    <input
                        class="input"
                        v-model="userEmail"
                        type="email"
                        placeholder="Email input"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check check-mark"></i>
                    </span>
                </div>
                <p class="help availability is-danger">This email is invalid</p>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left has-icons-right">
                    <input
                        class="input"
                        v-model="userPass"
                        type="password"
                        placeholder="Text input"
                    />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check check-mark"></i>
                    </span>
                </div>
                <p class="help availability is-danger">
                    This password is not available
                </p>
            </div>

            <div class="field">
                <div class="control">
                    <label class="checkbox">
                        <input type="checkbox" />
                        I agree to the <a href="#">terms and conditions</a>
                    </label>
                </div>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link">Submit</button>
                </div>
                <div class="control">
                    <button
                        class="button is-link is-light"
                        @click.prevent="cancel"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
    import axios from 'axios';
    import { ref, onMounted } from 'vue';

    // Cria referências reativas
    let availabilityRefs = ref([]);
    let checkMarks = ref([]);

    onMounted(() => {
        // Após o dom ser montado, capture os elementos
        availabilityRefs.value =
            document.getElementsByClassName('availability');
        checkMarks.value = document.getElementsByClassName('check-mark');

        // Itera sobre os elementos e aplica a opacidade
        Array.from(availabilityRefs.value).forEach((element) => {
            element.style.opacity = '0';
        });
    });

    // Referências reativas para os dados do formulário
    const userName = ref('');
    const userEmail = ref('');
    const userPass = ref('');
    const termsAccepted = ref(false);

    async function createNewUser() {
        try {
            const response = await axios.post(
                'http://localhost:3000/users/register',
                {
                    username: userName.value.trim(),
                    email: userEmail.value.trim(),
                    password: userPass.value,
                }
            );

            window.location.href = '/';
        } catch (error) {
            if (error.response && error.response.status == 400) {
                availabilityRefs.value[2].style.opacity = '1';

                getInputFromRef(checkMarks, 2)[0].classList.add(
                    'is-danger'
                );

                checkMarks.value[2].classList.remove('fa-check');
                checkMarks.value[2].classList.add('fa-exclamation-triangle');
            }
            console.error('Erro ao criar usuário:', error);
        }
    }

    function cancel() {
        userName.value = '';
        userEmail.value = '';
        userPass.value = '';
        termsAccepted.value = false;
    }

    function getInputFromRef(refNode, idx) {
        try {
            return refNode.value[idx].parentElement.parentNode.childNodes;
        } catch (error) {
            console.log(error);
        }
    }
</script>

<style scoped>
    .availability {
        transition: opacity 0.5s ease;
    }
    .fa-exclamation-triangle {
    }
</style>
