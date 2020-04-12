//app.js

import './lib/promise-polyfill/index'
import { promisifyAll } from './lib/wx-promise-pro/index'

import config from './config/index'

//store

import store from './stores/index'

//iOS基础库上的Promise不支持finally，用pollyfill修复，
//https://www.cnblogs.com/ljybill/p/10097852.html

global.Promise && (Promise=global.Promise)

//API Promise化，https://github.com/youngjuning/wx-promise-pro

promisifyAll()



App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'dev-okxhf',
        env:config.cloud_env,
        traceUser: true,
      })
    }

    this.globalData = {
      wxmini_version:config.wxmini_version
    }

    wx.pro.getStorage({
      key: 'darkMode',
    }).then(res=>{
      console.log(res)
      store.darkMode=res.data
    }).catch(res=>{
      console.log(res)
      wx.pro.setStorage({
        data: false,
        key: 'darkMode',
      })
      store.darkMode=false
    })

  }
})
