// pages/carList/components/context/components/carCard/carCard.js

const computedBehavior = require('miniprogram-computed')
Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    darkMode:{
      type:Boolean,
      value:false
    },
    carData: {
      type: Object,
      value: {
        acceleration: 55.03,
        carClass: "D",
        epicPart: 0,
        fullName: "Mitsubishi Lancer Evolutin",
        handling: 53.79,
        isKeyCar: 0,
        nickName: "三菱",
        nitro: 68.19,
        nitroDuration: 10.75,
        partCost: 140000,
        rank: 1381,
        rarePart: 1,
        stageCost: 466200,
        star: 3,
        star_1: 5,
        star_2: 12,
        star_3: 30,
        star_4: 0,
        star_5: 0,
        star_6: 0,
        topSpeed: 270.1,
        totalCost: 606200,
        uncommonPart: 5
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  computed:{
    starArray:data=>{
      let {star,star_1,star_2,star_3,star_4,star_5,star_6}=data.carData
      return [star_1,star_2,star_3,star_4,star_5,star_6].slice(0,star)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
})
