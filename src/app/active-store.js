// 导入公共弹窗

import { Message } from 'element-ui'

export const t = {
  success: '操作成功',
  error: '操作失败',
  delSuccessText: '删除成功',
  delErrorText: '删除失败',
  time: 6000 // 6秒
}

class ActiveStore {
  /**
     * 构造函数
     * @param {object} props props
     * @constructor
     */
  constructor(props = {}) {
    this.props = props
  }

  /**
     * appStore载入
     * @param {object} appStore 系统应用
     * @param {object} options 配置参数
     */
  init(appStore, options = {}) {
    this.appStore = appStore
    Object.assign(this.props, options)
  }

  /**
     * 成功
     * @param {object} options 配置信息
     */
  success(options = {}) {
    Message(Object.assign({}, {
      message: t.success,
      type: 'success',
      duration: t.time
    }, options))
  }

  /**
     * 失败
     * @param {object} options 配置信息
     */
  error(options) {
    Message(Object.assign({}, {
      message: t.error,
      type: 'error',
      duration: t.time
    }, options))
  }
}

export default ActiveStore

