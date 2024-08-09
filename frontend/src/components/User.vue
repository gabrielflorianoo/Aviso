<template>
    <figure class="image is-48x48 is-flex is-align-items-center p-1">
        <img
            class="is-rounded"
            src="https://bulma.io/assets/images/placeholders/128x128.png"
        />
        <p class="has-text-weight-semibold pl-4">{{ user.username }}</p>
    </figure>
</template>

<script>
    export default {
        props: {
            user: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style scoped></style>
