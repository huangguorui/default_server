<template>
    <div>
        <template
                v-if="actions"
                v-for="(item, index) in actions">
            <slot v-if="item.slotName" :name="item.slotName" :store="store" :props="item"/>
            <el-button v-else
                       :type="item.type || 'primary'"
                       :icon="item.icon"
                       :key="index"
                       @click="item.click(store, store.appStore)"
                       size="small"
                       class="action-button"
            >{{item.title}}</el-button>
        </template>
    </div>

</template>

<script>
    export default {
        name: 'zns-action-view',
        props:['store', 'actions'],
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
