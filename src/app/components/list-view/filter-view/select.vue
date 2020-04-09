<template>
    <el-col :span="rowConfig.span || 8">
        <el-form-item v-if="rowConfig.title" :label="rowConfig.title">
            <el-select
                    :value="value"
                    @change="handelChange"
                    clearable
            >
                <el-option
                        v-for="item in dataSource"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"/>
            </el-select>
        </el-form-item>

        <el-select
                v-else
                :value="value"
                @change="handelChange"
                clearable
        >
            <el-option
                    v-for="item in dataSource"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
        </el-select>
    </el-col>
</template>

<script>
    export default {
        name: 'zns-filter-select',
        props:['rowConfig', 'store', 'value'],
        data(){
            return {

            }
        },
        computed:{
            dataSource(){
                return [
                    {
                        id:1,
                        name:'zzz'
                    },
                    {
                        id:2,
                        name: 'sss'
                    }
                ]
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
                    : this.$emit('input', value && value)
            }
        }
    };
</script>

<style scoped>

</style>