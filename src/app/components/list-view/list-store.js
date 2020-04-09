import events from 'events'
import _ from 'lodash'

const selectTypeRange = ['selection', 'index']

class ListStore extends events{
    /*列表配置*/
    columns = [];
    /*列表数据*/
    data = [];
    /*筛选条件列表*/
    filter = [];
    /*服务*/
    _service = null;
    /*搜索调用的方法*/
    searchName = 'search';
    /*筛选条件值*/
    filterValues = {};
    /*操作*/
    actions = [];
    /*每行操作*/
    rowActions = [];
    /*选择默认 selection, index*/
    selectType;
    /*选中列表*/
    selectionData = [];
    primaryKeyIndex = 1;
    /*主键*/
    primaryKey = 'id';
    /*分页*/
    pageParamInfo = {
      page:1,
        page_size:10,
    };
    pageInfo = {
        /*总条数*/
        total:0,
        pageSize: 10,
        /*总页数*/
        pageCount:0,
        /*当前所在分页*/
        currentPage:0,
        layout:'total, sizes, prev, pager, next, jumper',
        pageSizes:[10, 20, 40, 60, 80, 100]
    };
    /*排序*/
    orderInfo = {
        orderKey: '',
        orderType:''
    };

    ready = false;

    constructor(props) {
        super(props);
        this.props = props;
        this.data = props.data;

        this.appStore = props.appStore;
        this._service = props.service;

        this.__init();
    }

    rowPrimaryKeyValue(){
      return new Function('data', `try{
       return data.${this.primaryKey}; 
      } catch (e) {
        console.error(e)
        return;
      }`);
    }

    __init(){
        const {
            columns = []
            , filter = []
            , searchName
            , rowActions = []
            , actions = []
            , selectType
            , primaryKey
            , data
        } = this.props;

        if(primaryKey){
          this.primaryKey = primaryKey;
        }

        if(data){
          this.data = data;
        }

        this.actions = actions;
        this.rowActions = rowActions;

        if(searchName){
            this.searchName = searchName
        }

        if(selectType){
            this.selectType = selectType;
        }

        this.columns = columns.map(item => (
            Object.assign(item, {
                slotName: item.slotName || false
            })
        ));

        this.filter = filter.map(item=>({...item, type: item.type || 'input'}));

        const filterValues = {};
        for (let item of filter){
            filterValues[item.key] = item.value || ''
        }

        this.filterValues = filterValues;

        this.ready = true;

        // this.search();
    }

    get service(){
        if(_.isString(this._service)){
            return this.appStore.getService(this._service)
        }
        return this._service;
    }

    /**
     * 列表查询
     * @param {object} param query 参数
     * @return {Promise<void>}
     */
    async search(param = {}){
        param = Object.assign({}
            , this.filterValues
            , this.pageParamInfo
            , this.orderInfo
            , param
        );
        this.emit('list-search', param, this);

        console.log(param)

        const result = await this.service[this.searchName](param);
        if(result){
            this.data = result.list;

            const {count, page, all_page, page_size} = result.page_info;
            Object.assign(this.pageParamInfo, {
                page,
                page_size
            });

            Object.assign(this.pageInfo, {
                total:count,
                pageSize:page_size,
                pageCount:all_page,
                currentPage:page
            });
        }
    }

    get selectKeys(){
        return this.selectionData.map(item=>this.rowPrimaryKeyValue(item))
    }

    /**
     * 表格选择
     *
     */
    select(selection, row){
        this.selectionData = selection;
        if(this.selectType === 'index'){
            this.primaryKeyIndex = this.rowPrimaryKeyValue(row);
            console.log(this.primaryKeyIndex)
        }
        console.log(selection)
        console.log(row)
    }
}
export default ListStore;
