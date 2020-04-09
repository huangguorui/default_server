<template>
    <el-col :span="rowConfig.span || 8">
        <el-form-item v-if="rowConfig.title" :label="rowConfig.title">
            <el-input
                    :value="value"
                    @input="handelChange"
                    clearable
            />
        </el-form-item>

        <el-input
                v-else
                :value="value"
                @input="handelChange"
                clearable
        />
    </el-col>
</template>

<script>
    export default {
        name: 'zns-filter-input',
        props:['rowConfig', 'store', 'value'],
        data(){
            return {

            }
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
    };
</script>

<style scoped>

</style>