import Router from 'vue-router';
import Api from './api'
import {
  Navbar as DefaultHeaderLayoutView
  , Sidebar as DefaultNavLayoutView
} from './layout/components'
import DefaultMainLayoutView from './layout'

import ActivePlugin from './active-store'
import * as components from './components'

class AppStore {
    /**
     * 构造函数
     */
    constructor(Vue, props){
        this.Vue = Vue;
        this.props = props;

        /*
        * 主视图集合
        * */
        this.viewsMap = new Map();

        /*
        * 页面视图集合
        * */
        this.pagesMap = new Map();

        /*
        * 系统常量
        * */
        this.constants = new Map();

        /*全局组件 开箱 即用
        * 全局组件规则 global-{自定义名称}-view
        * 系统默认占用 4个全局组件 [global-layout-view, global-header-view, global-nav-view, global-footer-view]
        * */
        this.globalComponents = new Map();

        /*所有系统API服务接口*/
        this.apiServices = new Map();


        /**
         * 全局状态 可用与 外部 有需要时条用，放入Vue中，以防止 状态更改后，页面不渲染
         * @type {Map<any, any>}
         */
        this.globalStateMap = new Map();

        /*
        * 插件
        * 可通过usePlugin方法进行 插件引入 getPlugin 进行外部获取
        * 注意 插件中 需定义 init方法 实例如下
        * init(appStore, options) => void
        * */
        this.pluginsMap = new Map();

        this.usePlugin('ActivePlugin', new ActivePlugin())
    }

    /**
     * 常量添加
     * @param {string} name 常量名称
     * @param {*} constant 常量
     */
    addConstant(name, constant){
        if(!this.hasConstant(name)){
            this.constants.set(name, constant)
        } else {
            console.warn(`constant ${name} existence`)
        }
        return this;
    }

    /**
     * 判断常量是否定义
     * @param {string} name
     * @returns {boolean} 判定结果
     */
    hasConstant(name){
        if(this.constants.has(name)){
            return true;
        }
        return false;
    }

    /**
     * 获取常量
     * @param {string} name 常量名称
     * @returns {any} 值
     */
    getConstant(name){
        if(this.hasConstant(name)){
            return this.constants.get(name)
        } else {
            console.warn(`constants ${name} not undefined`)
        }
    }

    /**
     * 注册插件
     * @param {string} name 注册名称
     * @param {object} plugin 注册的插件
     * @param {object} options 配置数据
     */
    usePlugin(name, plugin, options){
        if(!this.hasPlugin(name)){
            if(!plugin.init){
                plugin.init(this, options)
                this.pluginsMap.set(name, plugin)
            } else {
                console.warn(`plugin ${name} init is not function`)
            }
        } else {
            console.warn(`plugin ${name} existence`)
        }
        return this;
    }

    /**
     * 判断插件是否定义
     * @param {string} name
     * @returns {boolean} 判定结果
     */
    hasPlugin(name){
        if(this.pluginsMap.has(name)){
            return true;
        }
        return false;
    }

    /**
     * 获取插件
     * @param {string} name
     * @returns {any} 插件
     */
    getPlugin(name, ){
        if(this.hasPlugin(name)){
            return this.pluginsMap.get(name)
        } else {
            console.warn(`plugin ${name} existence`)
        }
    }

    /**
     * 添加全局状态
     * @param {string} name 状态名称
     * @param {object} props 状态值
     */
    addGlobalState(name, props){
        if(!this.hasGlobalState(name)){
            this.resetGlobalState(name, props)
        } else {
            console.warn(`global state ${name} existence`)
        }
        return this;
    }

    /**
     * 全局状态是否定义
     * @param {string} name 状态名称
     * @returns {boolean}
     */
    hasGlobalState(name){
        return this.globalStateMap.has(name)
    }

    /**
     * 获取全局状态
     * @param {string} name 状态名称
     */
    getGlobalState(name){
        if(this.hasGlobalState(name)){
            return this.globalStateMap.get(name)
        } else {
            throw new Error(`global state ${name} is not undefined`);
        }
    }

    /**
     * 重置 全局状态
     * @param {string} name 状态名称
     * @param {object} props 状态值
     */
    resetGlobalState(name, props){
        this.globalStateMap.set(name, props)
    }

    /**
     * 添加系统api服务
     * @param {string} name 名称
     * @param {object} service 服务
     */
    addService(name, service){
        this.apiServices.set(name, service);
        return this;
    }

    /**
     * 判断 api 服务是否定义
     * @param {string} name 名称
     * @return {boolean} true | false
     */
    hasService(name){
        return this.apiServices.has(name)
    }

    /**
     * 获取系统 api 服务
     * @param {string} name 名称
     * @return {object} 服务
     */
    getService(name){
        if(this.hasService(name)){
            return this.apiServices.get(name)({
                Api: AppStore.Api(this)
                , appStore: this
            });
        } else {
            throw new Error(`service ${name} is not undefined`)
        }
    }

    /**
     * 获取全局组件
     * @param {string} name 组件名 [* => 所有全局组件]
     */
    getGlobalComponent(name = '*'){
        if(name === '*'){
            return [...this.globalComponents.values()]
        }
        if(this.globalComponents.has(name)){
            return this.globalComponents.get(name);
        } else {
            throw new Error(`${name} is not set component`)
        }
    }

    /**
     * 添加全局组件
     * @param {string} name 组件名称
     * @param {object} component 组件
     * @returns {void}
     */
    addGlobalComponent(name, component){
        const globalName = `global-${name}-view`;

        this.globalComponents.set(name, component);
        this.Vue.component(globalName, component);
        return this;
    }

    /**
     * 布局视图
     * @param {object} viewLayout 布局
     */
    defaultMainLayout(viewLayout = DefaultMainLayoutView){
        this.addGlobalComponent('layout', viewLayout);
        return this;
    }

    /**
     * 所有的路由视图
     * @returns {array} 视图集合
     */
    get routerViews(){
        const routerLayout = [{
            name: 'main-layout-view',
            path: '/',
            component: this.getGlobalComponent('layout'),
            children: this._getView(this.viewsMap)
        }];

        return routerLayout.concat(this._getView(this.pagesMap))
    }

    /**
     * 获取views
     * @param {Map} viewsMap 视图Map
     * @param {array} views 视图集合
     * @param {number} zIndex 最大层级 默认最大 3
     * @private
     */
    _getView(viewsMap, views = [], zIndex = 1){
        if(zIndex === 3) return views;

        for(let item of viewsMap.values()) {
            const view = item;
            if (item.children) {
                view.children = [];
                this._getView(item.children, view.children, zIndex + 1)
            }
            views.push(view)
        }
        return views;
    }

    /**
     * 设置 header
     * @param {object} headerView 头部
     */
    defaultHeaderView(headerView = DefaultHeaderLayoutView){
        this.addGlobalComponent('header', headerView)
        return this;
    }

    /**
     * 设置 导航
     * @param {object} navView 头部
     */
    defaultNavView(navView = DefaultNavLayoutView){
        this.addGlobalComponent('nav', navView)
        return this;
    }

    /**
     * 设置 尾部
     * @param {object} footerView 头部
     */
    defaultFooterView(footerView){
        this.addGlobalComponent('footer', footerView)
        return this;
    }

    /**
     * 添加视图
     * @param {object} viewProps 视图信息 {name, view, options}
     */
    addView(viewProps){
       this._addViewAll(viewProps, 'viewsMap')
        return this;
    }

    /**
     * 添加视图
     * @param {object} viewProps 视图信息 {name, view, options}
     */
    addPage(viewProps){
       this._addViewAll(viewProps, 'pagesMap')
        return this;
    }


    /**
     * 添加 所有 视图页面
     * @param {object} viewProps 视图
     * @param {string} viewType 视图类型 [viewsMap, pagesMap]
     * @private
     */
    _addViewAll(viewProps, viewType){
        return this._resetViewAll(viewProps, viewType)
    }


    /**
     * 重置 view 和 pageView
     * @param {object} newViewProps 新视图信息
     * @param {map} viewType 视图类型 [viewsMap, pagesMap]
     * @private
     */
    _resetViewAll(newViewProps, viewType){
        this._viewAllTypeValidate(viewType)
            .set(newViewProps.name, newViewProps)
    }

    /**
     * 重置主视图
     * @param {object} viewProps 视图
     * @returns {AppStore}
     */
    resetView(viewProps){
        this._resetViewAll(viewProps, 'viewsMap');
        return this;
    }

    /**
     * 重置页面
     * @param {object} viewProps 视图
     * @returns {AppStore}
     */
    resetPage(viewProps){
        this._resetViewAll(viewProps, 'pagesMap');
        return this;
    }

    /**
     * 视图类型验证
     * @param {string} viewType [viewsMap, pagesMap]
     * @returns {*}
     * @private
     */
    _viewAllTypeValidate(viewType){
        let rang = ['viewsMap', 'pagesMap'];
        if(rang.includes(viewType)) {
            return this[viewType]
        } else {
            throw new TypeError(`this.${viewType} is not undefined`);
        }
    }

    /**
     * 获取主视图
     * @param {string} name 视图名称
     * @returns {object} 视图
     */
    getView(name){
        if(!this.viewsMap.has(name)){
            throw Error(`${name} view is not undefined`)
        }
        return this.viewsMap.get(name)
    }

    /**
     * 获取页面
     * @param {string} name 视图名称
     * @returns {object} 视图
     */
    getPage(name){
        if(!this.pagesMap.has(name)){
            throw Error(`${name} pages is not undefined`)
        }
        return this.pagesMap.get(name)
    }

    /**
     * 路由监听
     * @return {function} callback
     */
    routerBeforeEach(callback){
        return this.router.beforeEach(callback)
    }

    /**
     * 创建路由
     * @param {function} startFunc
     */
    async createRouter(startFunc){
        if(startFunc){
            await startFunc(this)
        }

        console.log(this.routerViews)
        this.router = new Router({
            routes: this.routerViews
        });
    }
}
AppStore.Api = Api;
AppStore.components = components;

export default AppStore;
