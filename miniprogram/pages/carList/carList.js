// miniprogram/pages/carList/carList.js

import store from '../../stores/index'
import { observer } from 'wechat-weapp-mobx/observer'

Page(observer({
  props: {
    store
  },

  /**
   * 页面的初始数据
   */
  data: {
    carListStatus: 'pending',
    carList: []
  },

  requestCarList: async function () {
    return wx.cloud.callFunction({
      // 云函数名称
      name: 'getCarList',
    })
  },

  setCarList() {
    this.setData({
      carListStatus: 'pending',
    })

    wx.showLoading({
      title: '加载中',
    })

    this.requestCarList()
      .then(res => {
        // console.log(res.result.data)
        // return Promise.reject()
        this.setData({
          carList: res.result.data,
          carListStatus: 'resolve'
        })
      }).catch(e => {
        console.log(e)
        this.setData({
          carListStatus: 'reject'
        })
      }).finally(() => {
        wx.hideLoading({
          complete: (res) => { },
        })
      })
  },

  onRetry() {
    this.setCarList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCarList()
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
        selected: 2
      })
    }
  },

  firstTapTab: false,
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.firstTapTab = true
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

  },
  onTabItemTap(item) {
    // tab 点击时执行
    if (this.firstTapTab) {
      this.firstTapTab = false
    }
    else {
      wx.pageScrollTo({
        complete: (res) => { },
        scrollTop: 0
      })

    }
  },
}))