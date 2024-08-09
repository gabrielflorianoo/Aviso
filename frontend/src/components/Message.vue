<template>
    <div class="card">
        <div class="card-content">
            <div class="content">
                <strong>{{ message.userID }}</strong> said:
            </div>
            <div class="content">
                {{ message.message }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: Object,
                required: true,
            },
        },
    };
</script>
