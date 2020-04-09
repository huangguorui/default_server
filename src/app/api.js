import axios from 'axios'
import {
  Message
} from 'element-ui'

export default function Api(appStore) {
  console.log(appStore.getConstant('API_CONF'))

  const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了

    //   baseURL: 'http://api.huanggr.cn/adminapi/',
    baseURL: appStore.getConstant('API_CONF').url,
    // baseURL: 'http://www.system.huanggr.cn',

    timeout: 5000

  })
  service.interceptors.request.use(
    config => {
      // config.headers['X-Token'] = 'adasdasdasdasdasdas'

      return config
    },
    error => {
      // console.log(error);
      return Promise.reject()
    }
  )

  service.interceptors.response.use(
    response => {
      if (response.status === 200) {
        // console.log('response.data.data', response.data.msg)
        //  Message.success(response.data.msg);
        // if (response.data.msg == '操作失败!'){
        //     Message.error(response.data.msg);

        //    }
        // if (response.data.code == 1) {
        //     //成功
        //     Message.success(response.data.msg);

        // }
        if (response.data.code == 0) {
          // 失败
          Message.error(response.data.msg)
        }
        if (response.data.code == 301) {
          // 失败
          /* Message.error(response.data.msg);
                    localStorage.removeItem('ms_username');
                    appStore.router.push('/login');*/
        }
        // //操作失败就需要提示一下了
        // if (response.data.msg == '操作失败!') {
        //     Message.error(response.data.msg);

        // }

        return response.data.data
      } else {
        Promise.reject()
      }
    },
    error => {
      Message.error('操作失败')
      console.log(error)
      Message.error(response.data.msg)

      return Promise.reject()
    }
  )
  return service
}
