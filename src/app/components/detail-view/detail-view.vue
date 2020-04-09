<template>
    <div>
        <el-form :model="store.data" inline>
                <el-col
                    v-for="(item, index) in _items"
                    :span="item.layout.span"
                    :push="item.layout.push"
                    :pull="item.layout.pull"
                    :offset="item.layout.offset"
                >
                    <el-form-item
                        :prop="item.key"
                        :label="item.title"
                        :required="items.required"
                        :rules="items.rules"
                    >
                        <slot
                            v-if="item.slotName"
                            :name="item.slotName"
                            :store="store"
                            :itemConfig="items"
                        />

                        <Input
                            v-else-if="item.type === 'input' || !item.type"
                            :store="store"
                            :itemConfig="item"
                            v-model="store.data.key"
                        />
                    </el-form-item>
                </el-col>
        </el-form>
    </div>
</template>

<script>
    import * as Components from './components'
    const components = {
        'Input': Components.Input
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
            items: Array
        },
        computed:{
            _items(){
                return this.items.map(item=>{
                    item.layout || Object.assign(item, {
                        layout: DEFAULT_COL_LAYOUT
                    })
                    return item;
                })
            }
        },
        data(){
            return {

            }
        },
        components
    }
</script>

<style scoped>

</style>
