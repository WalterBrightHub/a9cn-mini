// miniprogram/pages/index/index.js



Page({

  /**
   * 页面的初始数据
   */
  data: {
    contestStatus: 'pending',
    contest: [],
    now: new Date().getTime()
  },

  requestContest() {
    // let that = this
    wx.pro.request({
      url: 'https://a9cn.walterbright.cc/api/contest',
      method: 'GET',
    }).then(res => {
      const { data } = res
      // console.log(data.status)
      if (data.status === 200) {
        // console.log(data.contest)
        this.setData({
          contest: data.contest,
          contestStatus: 'resolve',
          now: new Date().getTime()
        })
      }
    }).catch(res => {
      that.setData({
        contestStatus: 'reject'
      })
    }).finally(()=>{
      wx.hideLoading()
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
    wx.pro.request({
      url: 'https://a9cn.walterbright.cc/api/contest',
      method: 'GET',
    }).then(res=>{
      const { data } = res
      // console.log(data.status)
      if (data.status === 200) {
        // console.log(data.contest)
        wx.showToast({
          title: '最新',
        })
        this.setData({
          contest: data.contest,
          now: new Date().getTime()
        })
      }
    }).catch(res=>{

      this.setData({
        contestStatus: 'reject'
      })
    }).finally(()=>{
      wx.stopPullDownRefresh()
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