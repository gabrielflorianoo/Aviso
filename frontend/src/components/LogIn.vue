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

    // References for the fields
    let availabilityRefs = ref([]);
    let checkMarks = ref([]);

    // Function that is called as soon as the DOM is loaded
    onMounted(() => {
        availabilityRefs.value =
            document.getElementsByClassName('availability');
        checkMarks.value = document.getElementsByClassName('check-mark');

        // Iterate over the fields and apply opacity
        Array.from(availabilityRefs.value).forEach((element) => {
            element.style.opacity = '0';
        });
    });

    // References for form data
    const userName = ref('');
    const userPass = ref('');
    const termsAccepted = ref(false);

    async function createNewUser() {
        try {
            // Make a POST request to create a new user
            const response = await axios.post(
                'http://localhost:3000/users/login',
                {
                    username: userName.value.trim(),
                    password: userPass.value,
                },
                { withCredentials: true }
            );

            // Redirect to the home page
            window.location.href = '/';
        } catch (error) {
            // Display custom error if the password is incorrect
            if (error.response && error.response.status == 400) {
                availabilityRefs.value[1].style.display = 'block';
                availabilityRefs.value[1].style.opacity = '1';

                getInputFromRef(checkMarks, 1)[0].classList.add('is-danger');

                checkMarks.value[1].classList.remove('fa-check');
                checkMarks.value[1].classList.add('fa-exclamation-triangle');
            }

            // Display custom error if the user already exists
            if (error.response && error.response.status == 401) {
                availabilityRefs.value[1].style.display = 'block';
                availabilityRefs.value[1].style.opacity = '1';

                availabilityRefs.value[1].textContent = 'User already exists';
            }
            console.error('Error while creating user:', error.message);
        }
    }

    function cancel() {
        // Reset all values
        userName.value = '';
        userPass.value = '';
        termsAccepted.value = false;
    }

    // Helper function to get input from icons
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
