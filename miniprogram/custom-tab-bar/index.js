
import { observerComponment } from 'wechat-weapp-mobx/observer'

Component(observerComponment({
  props:{
    store:require('../stores/index').default
  },
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/images/fire.png",
        selectedIconPath: "/images/fire-selected.png",
        text: "活动"
      }
      , {
        pagePath: "/pages/careerMaps/careerMaps",
        iconPath: "/images/flag.png",
        selectedIconPath: "/images/flag-selected.png",
        text: "地图"
      }
      , {
        pagePath: "/pages/carList/carList",
        iconPath: "/images/car.png",
        selectedIconPath: "/images/car-selected.png",
        text: "车辆"
      }
      , {
        pagePath: "/pages/user/user",
        iconPath: "/images/user.png",
        selectedIconPath: "/images/user-selected.png",
        text: "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
}))