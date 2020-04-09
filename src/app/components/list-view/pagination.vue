<template>
    <div>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageInfo.currentPage"
                :page-sizes="pageInfo.pageSizes"
                :page-size="pageInfo.pageSize"
                :layout="pageInfo.layout"
                :total="pageInfo.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'zns-pagination',
        props:['store', 'pageInfo'],
        data(){
            return {

            }
        },
        methods:{
            handleSizeChange(pageSize){
                this.store.pageParamInfo.page_size = pageSize;
            },
            handleCurrentChange(page){
                if(page !== this.store.pageParamInfo.page){
                    this.store.pageParamInfo.page = page;
                    this.store.search();
                }
            }
        }
    };
</script>

<style scoped>

</style>