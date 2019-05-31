// pages/comment/comment.js
const app = getApp()
const db = wx.cloud.database()
Page({
  onLoad(options){
    console.log(options)
    this.setData({ subject: JSON.parse(options.subject) });
    this.setData({ uni_name: options.uni_name });
  },
  /**
   * 页面的初始数据
   */
  data: {
    uni_name:null,
    subject:null,
    universities: ['UoM', 'Monash', 'RMIT', 'Deakin'],
    code: ['COMP10001', 'COMP10002', 'INFO20003', 'SWEN30006'],
    //todo
    name: ['Foundation of Computing', 'Foundation of Algorithm', 'Database System', 'Software Modelling Design'],
    uni_index: -1,
    subject_index: -1,
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
  bindSubjectPickerChange: function (e) {
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
    if(that.data.uni_index==-1||that.data.subject_index==-1||that.data.flag_emoji==0||that.data.flag_emoji==0){
      wx.showToast({
        title: '发布失败',
        icon: 'none',
        duration: 1000,
        mask: false,
      })
      return
    }
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 1500,
      mask: false,
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
        satisfication: this.data.flag_emoji,
        uni_name: this.data.universities[this.data.uni_index],
        subject_name: this.data.name[this.data.subject_index],
        code: this.data.code
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

    setTimeout(function(){
      wx.navigateBack({
        delta: 2
      })
    }, 1500)

  }
})