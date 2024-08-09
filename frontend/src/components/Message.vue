<template>
    <div class="card">
        <div class="card-content">
            <div class="content">
                <strong>{{ message.userID }}</strong> said:
            </div>
            <hr class="is-divider"/>
            <div class="content p-2">
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
