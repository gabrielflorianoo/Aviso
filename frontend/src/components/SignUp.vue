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

    // Get the error messages and icons on the form
    let availabilityRefs = ref([]);
    let checkMarks = ref([]);

    onMounted(() => {
        // Get elements after DOM is loaded
        availabilityRefs.value =
            document.getElementsByClassName('availability');
        checkMarks.value = document.getElementsByClassName('check-mark');

        // Apply zero opacity on each element
        Array.from(availabilityRefs.value).forEach((element) => {
            element.style.opacity = '0';
        });
    });

    // References for the form variables
    const userName = ref('');
    const userEmail = ref('');
    const userPass = ref('');
    const termsAccepted = ref(false);

    async function createNewUser() {
        try {
            // Make a post request for creating a new user
            const response = await axios.post(
                'http://localhost:3000/users/register',
                {
                    username: userName.value.trim(),
                    email: userEmail.value.trim(),
                    password: userPass.value,
                },
                { withCredentials: true },
            );

            // Load the home page
            window.location.href = '/';
        } catch (error) {
            // Creates a personalized error for the user
            if (error.response && error.response.status == 400) {
                availabilityRefs.value[2].style.display = 'block';
                availabilityRefs.value[2].style.opacity = '1';

                getInputFromRef(checkMarks, 2)[0].classList.add('is-danger');

                checkMarks.value[2].classList.remove('fa-check');
                checkMarks.value[2].classList.add('fa-exclamation-triangle');
            }

            // Creates a personalized error for the user
            if (error.response && error.response.status == 401) {
                availabilityRefs.value[2].style.display = 'block';
                availabilityRefs.value[2].style.opacity = '1';

                availabilityRefs.value[2].textContent = 'User already exists';
            }
            console.error('Error while creating user:', error);
        }
    }

    function cancel() {
        // Reset all values
        userName.value = '';
        userEmail.value = '';
        userPass.value = '';
        termsAccepted.value = false;
    }

    // Auxiliar function for getting the input by the icons
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
        display: none;
        transition: opacity 0.5s ease;
    }
</style>
