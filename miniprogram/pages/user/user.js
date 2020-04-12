// miniprogram/pages/user/user.js

import store from '../../stores/index'
import { observer } from 'wechat-weapp-mobx/observer'


const appInstance = getApp()
const { globalData } = appInstance


Page(observer({
  props: {
    store
  },

  /**
   * 页面的初始数据
   */
  data: {

    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    wxmini_version: globalData.wxmini_version,
    qqGroup: '1041602955',
    darkModeChecked: store.darkMode,
  },

  onCopyQQGroup() {
    wx.setClipboardData({
      data: this.data.qqGroup,
    })
  },

  switchDarkModeChange(event) {
    let darkModeChecked = event.detail.value
    this.setData({ darkModeChecked })
    // console.log(darkModeChecked)

    store.darkMode = darkModeChecked
    
    wx.setStorage({
      data: darkModeChecked,
      key: 'darkMode',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}))