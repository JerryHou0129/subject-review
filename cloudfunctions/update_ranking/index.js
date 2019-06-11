const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  db.collection('ranking').doc(this.data.uni_name + this.data.subject.code).get({
    success: function (res) {
      console.log("update")
      const _ = db.command
      db.collection("ranking").doc(this.data.uni_name + this.data.subject.code).update({
        data: {
          difficulty: _.inc(this.data.flag_star),
          satisfaction: _.inc(this.data.flag_emoji),
        }
      })
    },
    fail: function (res) {
      console.log("adddddd")
      db.collection('ranking').add({
        _id: this.data.uni_name + this.data.subject.code,
        data: {
          difficulty: this.data.flag_star,
          satisfaction: this.data.flag_emoji
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log("gaomaoxian")
          console.log(res)
        },
        fail: console.log("rinima"),
        complete: console.log("compele")
      })
    }
  })
}