<template>
    <global-detail-view
        v-if="store.ready"
        :store="store"
        :items="store.items"
    />
</template>

<script>
    import {DetailStore} from 'app-components'
    import {items, itemsArr} from "./config";

    export default {
        name: "view",
        data(){
            return {
                store:new DetailStore({
                    items: itemsArr
                })
            }
        }
    }
</script>

<style scoped>

</style>
