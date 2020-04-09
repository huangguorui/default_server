<template>
    <el-col :span="rowConfig.span || 8">
        <el-form-item v-if="rowConfig.title" :label="rowConfig.title">
            <el-select
                    :value="value"
                    @change="handelChange"
                    clearable
            >
                <el-option
                        v-for="(item, index) in dataSource"
                        :key="index"
                        :label="labelKeyIsFunc ? labelKey(item) : item[labelKey]"
                        :value="valueKeyIsFunc ? valueKey(item) : item[valueKey]"/>
            </el-select>
        </el-form-item>

        <el-select
                v-else
                :value="value"
                @change="handelChange"
                clearable
        >
            <el-option
                v-for="(item, index) in dataSource"
                :key="index"
                :label="labelKeyIsFunc ? labelKey(item) : item[labelKey]"
                :value="valueKeyIsFunc ? valueKey(item) : item[valueKey]"/>
        </el-select>
    </el-col>
</template>

<script>
    export default {
        name: 'zns-filter-select',
        props:['rowConfig', 'store', 'value'],
        data(){
            const {
                valueKey = 'id'
                , labelKey
            } = this.rowConfig;

            return {
                dataSource:[],
                valueKeyIsFunc: valueKey instanceof Function,
                labelKeyIsFunc: labelKey instanceof Function,
                valueKey: valueKey || 'id',
                labelKey: labelKey || 'name',
            }
        },
        mounted(){
            if(this.rowConfig.dataSource instanceof Function){
                this.rowConfig.dataSource().then(result=>{
                    this.dataSource = result;
                })
            } else {
                this.dataSource = this.rowConfig.dataSource;
            }
        },
        computed:{

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
                    : this.$emit('input', value && value)
            }
        }
    };
</script>

<style scoped>

</style>
