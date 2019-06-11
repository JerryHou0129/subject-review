const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async(event, context) => {
  var favs
  var id = event.openid
  favs = await (db.collection('fav').where({
    _openid: id,
  }).get())

  return {
    favs,
  }
}