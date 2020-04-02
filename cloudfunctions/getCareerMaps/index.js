// 云函数入口文件
const cloud = require('wx-server-sdk')
const groupBy=require('./util/groupBy')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
exports.main = async (event, context) => {
  //云函数限制一次最多获取100条数据
  const res=await db.collection('careerMaps').get()
  return groupBy(res.data,'theme')
}