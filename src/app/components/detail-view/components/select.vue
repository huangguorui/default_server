<template>
    <el-select
        :value="value"
        @change="handelChange"
    >
        <el-option
            v-for="(item, index) in dataSource"
            :key="index"
            :label="labelKeyIsFunc ? labelKey(item) : item[labelKey]"
            :value="valueKeyIsFunc ? valueKey(item) : item[valueKey]"/>
    </el-select>
</template>

<script>
    import {baseProps, changeOptionsC} from "./default";

    export default {
        name: "zns-detail-select",
        props: Object.assign({}, baseProps),
        data(){
            const {
                valueKey = 'id'
                , labelKey
            } = this.itemConfig;

            return {
                dataSource:[],
                valueKeyIsFunc: valueKey instanceof Function,
                labelKeyIsFunc: labelKey instanceof Function,
                valueKey: valueKey || 'id',
                labelKey: labelKey || 'name',
            }
        },
        mounted(){
            if(this.itemConfig.dataSource instanceof Function){
                this.itemConfig.dataSource().then(result=>{
                    this.dataSource = result;
                })
            } else {
                this.dataSource = this.itemConfig.dataSource;
            }
        },
        methods:{
            handelChange(value){
                this.itemConfig.change
                    ? this.itemConfig.change(value, changeOptionsC(this))
                    : this.$emit('input', value && value)
            }
        }
    }
</script>

<style scoped>

</style>
