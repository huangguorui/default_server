<template>
    <global-detail-view
        :store="store"
        :items="store.items"
    />
</template>

<script>
    import {DetailStore} from 'app-components'
    export default {
        name: "view",
        data(){
            return {
                store:new DetailStore({
                    items:[
                        {
                            key:'name',
                            type:'input',
                            title:'姓名'
                        }
                    ]
                })
            }
        }
    }
</script>

<style scoped>

</style>
