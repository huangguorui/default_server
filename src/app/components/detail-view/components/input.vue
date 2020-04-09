<template>
    <el-input
        :value="value"
        @input="handelChange"
        clearable
    />
</template>

<script>
    export default {
        name: "zns-detail-input",
        props:{
            store: Object,
            value: [String, Number, Array, Object, Boolean],
            itemConfig: Object,
        },
        methods:{

            handelChange(value){
                let option = {
                    rowConfig: this.rowConfig,
                    store: this.store,
                    value: this.value
                };
                this.rowConfig.change
                    ? this.rowConfig.change(value, this, option)
                    : this.$emit('input', value && value.trimStart())
            }
        }
    }
</script>

<style scoped>

</style>
