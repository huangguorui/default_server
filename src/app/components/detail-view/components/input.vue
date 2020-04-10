<template>
    <el-input
        :value="value"
        @input="handelChange"
        clearable
    />
</template>

<script>
    import {baseProps, changeOptionsC} from './default'
    export default {
        name: "zns-detail-input",
        props: Object.assign({}, baseProps),
        methods:{
            handelChange(value){
                this.itemConfig.change
                    ? this.itemConfig.change(value, changeOptionsC(this))
                    : this.$emit('input', value && value.trimStart())
            }
        }
    }
</script>

<style scoped>

</style>
