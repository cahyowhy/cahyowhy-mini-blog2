<template>
    <div>
        <navbar/>
        <nuxt/>
    </div>
</template>

<script>
    import navbar from '~/components/navbar.vue';
    export default{
        components: {
            'navbar': navbar
        }
    }
</script>