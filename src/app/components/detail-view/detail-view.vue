<template>
    <div>
        <el-form :model="store.state" inline>
            <el-row v-for="(valueC, itemObjectKey, i) in store.itemObject">
                <h3 v-if="!valueC.hideTitle">{{valueC.title}}</h3>
                <el-col
                    v-for="(item, index) in itemsLayout(valueC.items, valueC)"
                    :span="item.layout.span"
                    :push="item.layout.push"
                    :pull="item.layout.pull"
                    :offset="item.layout.offset"
                    :key="i + index"
                >
                    <el-form-item
                        :prop="getProp((item.createState || valueC.createState), item.key)"
                        :label="item.title"
                        :required="items.required"
                        :rules="items.rules"
                        :key="i + index"
                    >
                        <slot
                            v-if="item.slotName"
                            :name="item.slotName"
                            :store="store"
                            :itemConfig="item"
                            :currentState="(item.currentState || valueC.currentState)"
                            :itemObjectKey="itemObjectKey"
                        />

                        <Input
                            v-else-if="item.type === 'input' || !item.type"
                            :store="store"
                            :itemConfig="item"
                            v-model="(item.currentState || valueC.currentState)[item.key]"
                            :itemObjectKey="itemObjectKey"
                            :currentState="(item.currentState || valueC.currentState)"
                            :key="i + index"
                        />

                        <Select
                            v-else-if="item.type === 'select'"
                            :store="store"
                            :itemConfig="item"
                            v-model="(item.currentState || valueC.currentState)[item.key]"
                            :itemObjectKey="itemObjectKey"
                            :currentState="(item.currentState || valueC.currentState)"
                            :key="i + index"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import * as Components from './components'
    const components = {
        'Input': Components.Input,
        "Select": Components.Select
    };
    const DEFAULT_COL_LAYOUT = {
      push:null,
      pull:null,
      span:8,
      offset:null
    };
    export default {
        name: "zns-detail-view",
        props:{
            store: Object,
            items: [Array, Object]
        },
        computed:{

        },
        data(){
            return {

            }
        },
        methods:{
          itemsLayout(items, obj){
            return items.map(item=>{
                  item.layout || Object.assign(item, {
                      layout: DEFAULT_COL_LAYOUT
                  });
                  return item;
              })
          },
          getProp(parentKey, key){
              let prop;
                if(parentKey){
                    prop =  `${parentKey}.${key}`
                } else{
                    prop = key;
                }
              return prop;
          }
        },
        components
    }
</script>

<style scoped>

</style>
