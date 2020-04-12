// miniprogram/pages/careerMaps/careerMaps.js

import store from '../../stores/index'
import { observer } from 'wechat-weapp-mobx/observer'

Page(observer({
  props:{
    store
  },
  /**
   * 页面的初始数据
   */
  data: {
    careerMaps: {},
    careerMapsStatus: 'pending',
    // careerMapsLoading:true
  },

  getCareerMaps(){
    this.setData({
      careerMapsStatus:'pending'
    })
    wx.showLoading({
      title: '加载中',
    })

    this.requestCareerMaps()
      .then(res => {
        // console.log(res.result) // 3
        // return Promise.reject()
        this.setData({
          careerMaps: res.result,
          careerMapsStatus: 'resolve',
          careerMapsLoading:false
        })
      })
      .catch(e=>{
        console.error(e)
        this.setData({
          careerMapsStatus:'reject'
        })
      })
      .finally(()=>{
        wx.hideLoading({
          complete: (res) => {},
        })
      })

  },

  onRetry(){
    this.getCareerMaps()
  },


  requestCareerMaps: async function () {
    return wx.cloud.callFunction({
      // 云函数名称
      name: 'getCareerMaps',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getCareerMaps()
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
      selected: 1
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
    // console.log('pullDown')
    // this.setData({
    //   careerMapsStatus:'pending'
    // })
    // this.onRequestCareerMaps()
    //   .then(res => {
    //     console.log(res.result) // 3
    //     this.setData({
    //       careerMaps: res.result,
    //       careerMapsStatus: 'resolve'
    //     })
    //     wx.showToast({
    //       title: '最新',
    //       icon: 'success',
    //       duration: 1000
    //     })
    //     //框架bug：iPad测试不加这一句不会收起，执行不到finally
    //     wx.stopPullDownRefresh()
    //   })
    //   .catch(e=>{
    //     console.error(e)
    //     this.setData({
    //       careerMapsStatus:'reject'
    //     })
    //   })
    //   .finally(()=>{
    //     wx.stopPullDownRefresh()
    //   })

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
    else{
      wx.pageScrollTo({
        complete: (res) => { },
        scrollTop: 0
      })

    }
  },

}))