<template>
    <div class="card">
        <div class="card-content">
            <div class="content">
                <strong>{{ username ? 'You' : message.userID }}</strong> said:
            </div>
            <hr class="is-divider" />
            <div class="content p-2">
                {{ message.message }}
            </div>
        </div>
    </div>
</template>

<script>
    // Props needed by the template
    export default {
        props: {
            message: {
                type: Object,
                required: true,
            },
            username: {
                type: String,
                required: false,
            },
        },
    };
</script>
