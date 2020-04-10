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
                console.log(this.store)
                console.log(this.currentState)
            }
        }
    }
</script>

<style scoped>

</style>
