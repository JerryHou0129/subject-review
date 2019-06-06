// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  var total_difficulty = 0
  var total_satisfaction = 0
  var i
  var res
  var diff = 0
  var sat = 0
  res = await (db.collection('users').where({
    is_comment: true,
    uni_name: event.uni_name,
    code: event.subject.code
  }).get())

  if (res.data.length != 0) {
    for (i = 0; i < res.data.length; i++) {
      total_difficulty += res.data[i].difficulty
      total_satisfaction += res.data[i].satisfaction
    }
    diff = Math.round(total_difficulty / res.data.length)
    sat = Math.round(total_satisfaction / res.data.length)
  }




  return {
    diff,
    sat
  }
}