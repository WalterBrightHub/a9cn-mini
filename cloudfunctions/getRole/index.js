// 云函数入口文件
const cloud = require('wx-server-sdk')

console.log(cloud.DYNAMIC_CURRENT_ENV)

cloud.init({
  // env: 'dev-okxhf'
  env:cloud.DYNAMIC_CURRENT_ENV
})

const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  
  const wxContext = cloud.getWXContext()

  const res= await db.collection('roles').where({
    openid:wxContext.OPENID
  })
  .field({
    root:true
  })
  .get()


  return {
    role:res.data,
    env:cloud.DYNAMIC_CURRENT_ENV
  }
}