// miniprogram/pages/index/index.js

let myRequest=(option)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      ...option,
      success:res=>resolve(res),
      fail:res=>reject(res)
    })
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    contestStatus: 'pending',
    contest: [],
    now:new Date().getTime()
  },

  requestContest() {
    let that = this
    wx.request({
      url: 'https://a9cn.walterbright.cc/api/contest',
      complete: (res) => {
        wx.hideLoading({
          complete: (res) => { },
        })
      },
      fail: (res) => {
        that.setData({
          contestStatus: 'reject'
        })
      },
      method: 'GET',
      responseType: '',
      success: (result) => {

        const { data } = result
        // console.log(data.status)
        if (data.status === 200) {
          // console.log(data.contest)
          that.setData({
            contest: data.contest,
            contestStatus: 'resolve',
            now:new Date().getTime()
          })
        }
      },
    })
  },

  onRetry() {
    wx.showLoading({
      title: '加载中',
    })
    this.requestContest()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.requestContest()

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
    let that=this
    wx.request({
      url: 'https://a9cn.walterbright.cc/api/contest',
      complete: (res) => {
        wx.stopPullDownRefresh({
          complete: (res) => {},
        })
      },
      fail: (res) => {
        that.setData({
          contestStatus: 'reject'
        })
      },
      method: 'GET',
      responseType: '',
      success: (result) => {

        const { data } = result
        // console.log(data.status)
        if (data.status === 200) {
          // console.log(data.contest)
          wx.showToast({
            title: '最新',
          })
          that.setData({
            contest: data.contest,
            now:new Date().getTime()
          })
        }
      },
    })
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
})