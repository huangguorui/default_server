import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './app/App'

import '@/icons' // icon
import VueRouter from 'vue-router';
import * as AppComponents from 'app-components'
import store from './store'
import permissionFunc from '@/permission' // permission control
import AppStore from './app/appStore'
import apiConfig from './api-config'
import SysApi from './api'
import LoginView from './views/login'
import ViewSetup from './views'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(VueRouter);

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
const appStore = new AppStore(Vue);
appStore.addConstant('API_CONF', apiConfig)
  .addService('sysService', SysApi)
  .addGlobalComponent('list', AppComponents.ListView)
  .addGlobalComponent('detail', AppComponents.DetailView)
  .defaultMainLayout()
  .defaultHeaderView()
  .defaultNavView()
  .defaultFooterView()
  .addPage({
    name:'login',
    path:'/login',
    component: LoginView,
  })
  .addGlobalState('mainLayout', { });

ViewSetup(appStore);
appStore.createRouter();

Vue.use((Vue) => {
  Vue.prototype.appStore = appStore;
});
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: appStore.router,
  store,
  render: h => h(App)
})
