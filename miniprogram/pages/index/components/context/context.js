// pages/index/components/context/context.js
const computedBehavior = require('miniprogram-computed')


const formatDate = date => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`

Component({
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    contest: {
      type: Array,
      value: []
    },
    now: {
      type: Date,
      value: new Date().getTime()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  computed: {
    contest_future: data => data.contest
      .filter(contest => contest.startTime > data.now)
      .sort((a, b) => a.startTime - b.startTime)
      .map(contest => ({
        ...contest,
        start_day: formatDate(new Date(contest.startTime)),
        end_day: formatDate(new Date(contest.endTime))
      })),
    contest_present: data => data.contest
      .filter(contest => contest.startTime <= data.now && contest.endTime >= data.now)
      .sort((a, b) => a.endTime === b.endTime
        ? b.startTime - a.startTime
        : a.endTime - b.endTime
      ).map(contest => ({
        ...contest,
        start_day: formatDate(new Date(contest.startTime)),
        end_day: formatDate(new Date(contest.endTime))
      }))
    ,
    contest_past: data => data.contest
      .filter(contest => contest.endTime < data.now)
      .sort((a, b) => b.startTime - a.startTime)
      .map(contest => ({
        ...contest,
        start_day: formatDate(new Date(contest.startTime)),
        end_day: formatDate(new Date(contest.endTime))
      }))
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
