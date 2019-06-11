const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  my_openid = event.openid
  _name = event.uni_name
  _code = event.code

  var fav_subjects

  fav_subjects = await (db.collection('fav').where({
    _openid: my_openid,
    uni_name: _name,
    code: _code
  }).remove())

  return{
    fav_subjects
  }
}