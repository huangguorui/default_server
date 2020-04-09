<template>
  <div>
    <global-list-view
      :store="store"
      :columns="store.columns"
      :filter="store.filter"
      :data="store.data"
      :actions="store.actions"
      :rowActions="store.rowActions"
    >

        <template #actions-test="slot">
            <TestButton :slot="slot"/>
        </template>

    </global-list-view>
  </div>
</template>

<script>
  import {data, columns, filter} from "./config";
  import {ListStore} from 'app-components';
  import TestButton from './test-button'
  const components = {
      TestButton:TestButton
  }

  export default {
        name: "index",
        components,
        data(){
           return {
             store:new ListStore({
               appStore:this.appStore,
               data,
               columns,
               filter,
               actions:[{
                   title:'天机',
                   slotName: 'actions-test',
                   click(){
                       alert()
                   }
               }],
               rowActions:[{
                 title:'修改',
                 click:this.edit.bind(this)
               }]
             })
           }
        },
        methods:{
          edit(rowData, props){
            console.log(this)
            console.log(rowData)
            console.log(props)
          }
        }
    }
</script>

<style scoped>

</style>
