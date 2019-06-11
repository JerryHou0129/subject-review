const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async(event, context) => {
  var name1 = event.uni_name
  var code1 = event.code


  var diff = 0
  var sat = 0
  var res = await (db.collection('users').where({
    is_comment: true,
    uni_name: name1,
    code: code1
  }).get())

  for (var i = 0; i < res.data.length; i++) {
    diff += res.data[i].difficulty
    sat += res.data[i].satisfaction
  }
  diff = Math.round(diff / res.data.length)
  sat = Math.round(sat / res.data.length)


  return {
    diff,
    sat
  }
}