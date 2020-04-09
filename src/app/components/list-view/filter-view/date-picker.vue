<template>
    <el-col :span="rowConfig.span || 8">
        <el-form-item v-if="rowConfig.title" :label="rowConfig.title">
            <el-date-picker
                    class="data-picker"
                    :value="value"
                    :placeholder="rowConfig.tips || ''"
                    @change="handelChange"
                    clearable
            />
        </el-form-item>

        <el-date-picker
                v-else
                class="data-picker"
                :value="value"
                :placeholder="rowConfig.tips || ''"
                @change="handelChange"
                clearable
        />
    </el-col>
</template>

<script>
    export default {
        name: 'zns-filter-date-picker',
        props:['rowConfig', 'store', 'value'],
        data(){
            return {

            }
        },
        methods:{
            handelChange(value){
                console.log(value)
                // this.$emit('input', value && value.trimStart())
            }
        }
    };
</script>

<style scoped>
    .data-picker{
        width: 100%;
    }
</style>