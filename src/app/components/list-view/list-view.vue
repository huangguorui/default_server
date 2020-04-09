<template>
    <div>
        <header class="filter-header">
            <el-form label-width="80px">
                <el-row>
                    <el-col :span="20">
                        <el-row :gutter="10">
                            <template v-for="(item, index) in store.filter">
                                <FilterInput
                                        v-if="item.type === 'input'"
                                        :store="store"
                                        :rowConfig="item"
                                        v-model="store.filterValues[item.key]"
                                />
                                <FilterDataPiker
                                        v-else-if="item.type === 'data-picker'"
                                        :store="store"
                                        :rowConfig="item"
                                        v-model="store.filterValues[item.key]"
                                />
                                <FilterSelect
                                        v-else-if="item.type === 'select'"
                                        :store="store"
                                        :rowConfig="item"
                                        v-model="store.filterValues[item.key]"
                                />
                            </template>
                            <el-col :span="1">
                                <el-button
                                        @click="store.search()"
                                        type="primary"
                                        icon="el-icon-search"
                                        size="small"
                                >搜索</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="4" v-if="actions.length" class="filter-actions">

                        <Actions :store="store" :actions="actions">
                            <template
                                v-for="{slotName, title} in slotActions"
                                #[slotName]="scope"
                            >
                                <slot :name="slotName" :props="scope.props" :store="scope.store"/>
                            </template>
                        </Actions>
                    </el-col>
                </el-row>
            </el-form>
        </header>

        <el-table
                :data="data"
                @select="select"
                @sort-change="sortChange"
        >
            <el-table-column
                    v-if="store.selectType === 'selection'"
                    type="selection"
                    width="55"/>

            <el-radio-group
                    v-if="store.selectType === 'index'"
                    v-model="store.primaryKeyIndex"
            >
                <el-table-column
                        width="55">
                    <template slot-scope="scope">
                        <span @click="select([scope.row], scope.row)">
                            <el-radio :value="store.rowPrimaryKeyValue(scope.row)"/>
                        </span>
                    </template>
                </el-table-column>
            </el-radio-group>


            <template v-for="(item, index) in columns">
                <el-table-column
                        v-if="item.slotName !== false"
                        :prop="item.key"
                        :label="item.title"
                        :width="item.width"
                        :sortable="item.sortable"
                        :type="item.type"
                        :formatter="item.formatter"
                        :key="index">
                    <template slot-scope="scope">
                        <slot :name="item.slotName" :rowData="scope.row" :data="data"/>
                    </template>
                </el-table-column>
                <el-table-column
                        v-else
                        :prop="item.key"
                        :label="item.title"
                        :width="item.width"
                        :sortable="item.sortable"
                        :type="item.type"
                        :formatter="item.formatter"
                        :key="index"/>
            </template>

            <el-table-column :prop="store.primaryKey" label="操作">
              <template slot-scope="scope">
                  <RowActions :rowData="scope.row" :rowActions="rowActions" :store="store">
                      <template
                          v-for="{slotName} in slotRowActions"
                          #[slotName]="scope"
                      >
                          <slot :name="slotName" :props="scope.props" :rowData="scope.rowData" :store="scope.store"></slot>
                      </template>
                  </RowActions>
              </template>
            </el-table-column>
        </el-table>

        <footer class="footer">
            <Pagination :store="store" :pageInfo="store.pageInfo"/>
        </footer>
    </div>
</template>

<script>
    import * as FilterComponent from './filter-view';
    import * as ActionsComponent from './actions-view'
    import Pagination from './pagination'

    export default {
        name: 'zns-list-view',
        computed:{
          slotActions(){
              return this.actions.filter(item=>item.slotName)
          },
            slotRowActions(){
                return this.rowActions.filter(item=>item.slotName)
            }
        },
        props:{
          columns:{
            type:Array,
          },
          data:{
            type: Array
          },
          store:{
            type:Object
          },
          actions:{
            type:Array,
            default:()=>[]
          },
          rowActions:{
            type:Array,
            default:()=>[]
          }
        },
        data(props){
            console.log(props)
            return {
            }
        },
        methods:{
            select(selection, row){
                console.log(selection, row)
                this.store.select(selection, row)
            },
            sortChange( {column, prop, order}){
                Object.assign(this.store.orderInfo, {
                    orderKey:prop,
                    orderType:order
                });

                this.store.search();
            }
        },
        components:{
            'FilterInput': FilterComponent.FilterInput,
            'FilterDataPiker': FilterComponent.FilterDataPiker,
            'FilterSelect': FilterComponent.FilterSelect,
            'Actions': ActionsComponent.Actions,
            'RowActions': ActionsComponent.RowActions,
            'Pagination': Pagination,
        }
    };
</script>

<style scoped>
    .filter-header{
        margin: 10px 0;
    }
    .filter-actions,
    .footer{
        text-align: right;
    }
    .footer{
        margin-top: 20px;
    }
</style>
