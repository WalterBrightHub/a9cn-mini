// pages/careerMaps/components/context/context.js

const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    careerMaps:{
      type:Object,
      value:{careerMaps:{}}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  computed:{
    themes:(data)=>{
      // console.log('compoment')
      // console.log(data)
      return Object.keys(data.careerMaps)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
