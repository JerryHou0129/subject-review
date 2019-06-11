const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  var res
  res = await (db.collection('users').where({
    _openid: event.openid,
    'fav.code': event.code
  }).get())

  var isClick
  if (res.data.length != 0){
    isClick = true
  }
  else{
    isClick = false
  }
  return {
    isClick,
    res
  }
}