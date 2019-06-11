// pages/comment/comment.js
const app = getApp()
const db = wx.cloud.database()
Page({
  onLoad(options) {
    this.setData({
      subject: app.globalData.this_subject,
      uni_name: app.globalData.uni_name
    });
    console.log(this.data.subject);
    console.log(this.data.uni_name);
  },

  data: {
    title: '极客教育',
    barBg: '#f8f8f8', //#ff6600
    color: '#000000', //#ffffff

    uni_name: null,
    subject: null,

    maxLen: 200, // 最多放多少字
    info: "",
    nowLen: 0, //备注当前字数
    flag_star: 0,
    flag_emoji: 0,
  },

  bindUniPickerChange: function(e) {
    console.log('携带值', e.detail.value)
    this.setData({
      uni_index: e.detail.value
    })
  },
  bindSubjectPickerChange: function(e) {
    console.log('携带值', e.detail.value)
    this.setData({
      subject_index: e.detail.value
    })
  },
  bindTextAreaChange: function(e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.maxLen)
      return;
    that.setData({
      info: value,
      nowLen: len
    })
  },

  changeColor1: function() {
    var that = this;
    that.setData({
      flag_star: 1
    });
  },
  changeColor2: function() {
    var that = this;
    that.setData({
      flag_star: 2
    });
  },
  changeColor3: function() {
    var that = this;
    that.setData({
      flag_star: 3
    });
  },
  changeColor4: function() {
    var that = this;
    that.setData({
      flag_star: 4
    });
  },
  changeColor5: function() {
    var that = this;
    that.setData({
      flag_star: 5
    });
  },

  changeEmoji1: function() {
    var that = this;
    that.setData({
      flag_emoji: 1
    });
  },
  changeEmoji2: function() {
    var that = this;
    that.setData({
      flag_emoji: 2
    });
  },
  changeEmoji3: function() {
    var that = this;
    that.setData({
      flag_emoji: 3
    });
  },
  changeEmoji4: function() {
    var that = this;
    that.setData({
      flag_emoji: 4
    });
  },
  changeEmoji5: function() {
    var that = this;
    that.setData({
      flag_emoji: 5
    });
  },

  submit: function(event) {
    var that = this;
    if (that.data.flag_star == 0 || that.data.flag_emoji == 0) {
      wx.showToast({
        title: '发布失败',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
      return
    }
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 1500,
      mask: true,
      success: function() {
        that.setData({
          info: '',
          noteNowLen: 0,
          flag: 0
        })
      }
    })

    db.collection('users').add({
      data: {
        comment: this.data.info,
        difficulty: this.data.flag_star,
        satisfaction: this.data.flag_emoji,
        uni_name: this.data.uni_name,
        subject_name: this.data.subject.name,
        code: this.data.subject.code,
        is_comment: true
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          userId: res._id,
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })

    // db.collection('ranking').doc('todo-identifiant-aleatoire').get().then(res => {
    //   console.log("sadaaaaaaa")
    //   console.log(res.data)
    // })

  //db.collection('ranking').doc(this.data.uni_name + this.data.subject.code).get().catch(console.log("kkkkkk"))

    // 异步处理，不成功
    // db.collection('ranking').doc(this.data.uni_name + this.data.subject.code).get({
    //   success: function(res) {
    //     console.log("update")
    //     const _ = db.command
    //     db.collection("ranking").doc(this.data.uni_name + this.data.subject.code).update({
    //       data: {
    //         difficulty: _.inc(this.data.flag_star),
    //         satisfaction: _.inc(this.data.flag_emoji),
    //       }
    //     })
    //   },
    //   fail: function(res) {
    //     console.log("adddddd")
    //     db.collection('ranking').add({
    //       _id: this.data.uni_name + this.data.subject.code,
    //       data: {
    //         difficulty: this.data.flag_star,
    //         satisfaction: this.data.flag_emoji
    //       },
    //       success: function(res) {
    //         // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //         console.log("gaomaoxian")
    //         console.log(res)
    //       },
    //       fail:console.log("rinima"),
    //       complete:console.log("compele")
    //     })
    //   }
    // })

  //同步处理
    db.collection(this.data.uni_name).doc(this.data.subject.code).get().then(res => {
      console.log("update")
      const _ = db.command
      db.collection(this.data.uni_name).doc(this.data.subject.code).update({
        data: {
          difficulty: _.inc(this.data.flag_star),
          satisfaction: _.inc(this.data.flag_emoji),
          count: _.inc(1),
        }
      })
    }).catch(res => {
      db.collection(this.data.uni_name).add({
        data: {
          _id: this.data.subject.code,
          difficulty: this.data.flag_star,
          satisfaction: this.data.flag_emoji,
          count: 1
        },
      })
    })


    wx.cloud.callFunction({
      name: 'update_subject_detail',
      data: {
        subject: app.globalData.this_subject,
        uni_name: app.globalData.uni_name,
      },
      success: function(res) {
        app.globalData.subjects[app.globalData.this_subject.code]['difficulty'] = res.result.diff
        app.globalData.subjects[app.globalData.this_subject.code]['satisfaction'] = res.result.sat
        wx.setStorageSync(app.globalData.uni_name, app.globalData.subjects)
        console.log(app.globalData.subjects)
        wx.navigateBack({
          delta: 2
        })
      },
      fail: console.error
    })

  }
})