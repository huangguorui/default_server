<template>
    <el-button-group>
        <template v-for="(item, index) in rowActions">
            <el-button
                v-if="!item.slotName"
                :type="item.type || 'primary'"
                :icon="item.icon"
                :key="index"
                size="mini"
                @click="item.click(rowData, {index, store, appStore: store.appStore})"
            >
                {{item.title}}
            </el-button>
            <slot v-else :rowData="rowData" :name="item.slotName" :store="store" :props="item"/>
        </template>

    </el-button-group>
</template>

<script>
    export default {
        name: 'zns-row-action-view',
        props:{
            store:{
                type: Object,
                required: true,
            },
            rowActions:{
                type: Array,
                default:() => []
            },
            rowData:{
                type:Object
            }
        },
        data(){
            return {

            }
        }
    };
</script>

<style scoped>
    .action-button{
        margin-right: 5px;
    }
</style>
