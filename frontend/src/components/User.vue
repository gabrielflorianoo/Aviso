<template>
    <a href="" class="p-1">
        <figure class="image is-48x48 is-flex is-align-items-center">
            <img
                class="is-rounded"
                src="https://bulma.io/assets/images/placeholders/128x128.png"
            />
            <p class="has-text-weight-semibold pl-4 has-text-black">
                {{ user.username }}
            </p>
        </figure>
    </a>
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

<style scoped>
    a {
        display: block; /* Faz com que o link ocupe toda a largura disponível */
        transition: background-color 0.5s; /* Especifica a propriedade para a transição */
        text-decoration: none; /* Remove o sublinhado padrão do link */
    }

    a:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>
