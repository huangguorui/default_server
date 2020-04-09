<template>
    <el-button>{{title}}</el-button>
</template>

<script>
    export default {
        name: "test-button",
        props:['title', 'store', 'props', 'slot'],
        data(){
            console.log(this.slot)
            return {

            }
        }
    }
</script>

<style scoped>

</style>
