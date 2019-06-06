// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async(event, context) => {
  var subjects = event.subjects
  var uni_name = event.uni_name

  var total_difficulty = 0
  var total_satisfaction = 0
  var temp1 = subjects[Object.keys(subjects)[0]].code
  subjects[temp1]["difficulty"] = total_difficulty
  subjects[temp1]["satisfaction"] = total_satisfaction
  var i
  var k
  var length = Object.keys(subjects).length
  //console.log(this.data.subjects["COMP10001"]["difficulty"] = 3 stars)
  //this.data.subjects.push("hello")
  var res = {}
  console.log(subjects[Object.keys(subjects)[0]])
  var temp
  for (k = 0; k < length; k++) {
    temp = subjects[Object.keys(subjects)[k]].code
    res[temp] = await (db.collection('users').where({
      is_comment: true,
      wx.showToast({
        title: '数据加载中',
        icon: 'loading',
        duration: 3000
      });





    


    
      uni_name: uni_name,
      code: subjects[Object.keys(subjects)[k]].code
    }).get())
  }

  var diff = 0
  var sat = 0
  for (code in res) {
    for(n=0;n<res[code].data.length;n++){
      diff += res[code].data[n].difficulty
      sat += res[code].data[n].satisfaction
    }
    subjects[code]['difficulty'] = Math.round(diff / res[code].data.length)
    subjects[code]['satisfaction'] = Math.round(sat / res[code].data.length)
    diff = 0
    sat = 0
  }


  return {
    subjects,
    uni_name,
    res
  }
}
/*{
  success: res => {
    if (res.data.length != 0) {
      for (i = 0; i < res.data.length; i++) {
        total_difficulty += res.data[i].difficulty
        total_satisfaction += res.data[i].satisfaction
      }
      total_difficulty = Math.round(total_difficulty / res.data.length)
      total_satisfaction = Math.round(total_satisfaction / res.data.length)

      subjects[temp]["difficulty"] = total_difficulty
      subjects[temp]["satisfaction"] = total_satisfaction
      uni_name = "youryour"
      // to-do
      total_difficulty = 0
      total_satisfaction = 0
    }
  }
}*/