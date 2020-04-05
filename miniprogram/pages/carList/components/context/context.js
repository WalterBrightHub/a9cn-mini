// pages/carList/components/context/context.js

// const groupBy=require('../../../../util/groupBy')
const _=require('../../../../lib/lodash/index')


const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    carList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectedCarClass:'D'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSwitchCarClass(event){
      let selectedCarClass=event.currentTarget.dataset.carClass
      // console.log(selectedCarClass)
      this.setData({selectedCarClass})
      wx.pageScrollTo({
        complete: (res) => {},
        scrollTop:0
      })
    },
  },
  computed:{
    // carsGroupByClass:data=>({
    //   D:data.carList.filter(value=>value.carClass==='D'),
    //   C:data.carList.filter(value=>value.carClass==='C'),
    //   B:data.carList.filter(value=>value.carClass==='B'),
    //   A:data.carList.filter(value=>value.carClass==='A'),
    //   S:data.carList.filter(value=>value.carClass==='S'),
    // })
    carsGroupByClass:data=>_.groupBy(data.carList,'carClass')
  }
})
